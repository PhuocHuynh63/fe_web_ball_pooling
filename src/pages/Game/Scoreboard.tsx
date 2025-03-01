"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { Clock, RotateCcw, Pause, Play, SkipForward, Flag, AlertTriangle, Trophy, Home } from "lucide-react"

const BilliardScoreboard: React.FC = () => {
  const [scores, setScores] = useState([0, 0])
  const [scoreHistory, setScoreHistory] = useState<number[][]>([[], []])
  const [currentPlayer, setCurrentPlayer] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const [selectedBalls, setSelectedBalls] = useState<number[]>([])
  const [isGameEnd, setIsGameEnd] = useState(false)
  const [timer, setTimer] = useState(60) // Default to 60 seconds
  const [winner, setWinner] = useState<number | null>(null)

  const navigate = useNavigate()

  const players = [
    { username: "Player 1", avatar: "/images/user/owner.jpg" },
    { username: "Player 2", avatar: "/images/user/user-01.jpg" },
  ]

  // Ball colors with gradients for striped balls
  const ballColors = [
    "bg-yellow-500", // Ball 1
    "bg-blue-600", // Ball 2
    "bg-red-600", // Ball 3
    "bg-purple-600", // Ball 4
    "bg-orange-500", // Ball 5
    "bg-green-600", // Ball 6
    "bg-red-900", // Ball 7
    "bg-black", // Ball 8
    "bg-gradient-to-r from-white via-yellow-500 to-white", // Ball 9 (striped)
    "bg-gradient-to-r from-white via-blue-600 to-white", // Ball 10 (striped)
    "bg-gradient-to-r from-white via-red-600 to-white", // Ball 11 (striped)
    "bg-gradient-to-r from-white via-purple-600 to-white", // Ball 12 (striped)
    "bg-gradient-to-r from-white via-orange-500 to-white", // Ball 13 (striped)
    "bg-gradient-to-r from-white via-green-600 to-white", // Ball 14 (striped)
    "bg-gradient-to-r from-white via-red-900 to-white", // Ball 15 (striped)
  ]

  useEffect(() => {
    // Retrieve settings data from localStorage
    const settingsData = JSON.parse(localStorage.getItem("settingsData") || "{}")
    if (settingsData.timePerTurn) {
      setTimer(settingsData.timePerTurn)
    }
  }, [])

  useEffect(() => {
    if (selectedBalls.length === 15) {
      handleGameEnd()
    }
  }, [selectedBalls])

  useEffect(() => {
    let timerInterval: NodeJS.Timeout
    if (!isPaused && !isGameEnd) {
      timerInterval = setInterval(() => {
        setTimer((prev) => {
          if (prev > 0) {
            return prev - 1
          } else {
            handleEndTurn()
            return 60 // Reset timer to 60 seconds (or the value from settings)
          }
        })
      }, 1000)
    }
    return () => clearInterval(timerInterval)
  }, [isPaused, isGameEnd])

  const handleUndo = () => {
    if (scoreHistory[currentPlayer].length > 0) {
      const lastScore = scoreHistory[currentPlayer].pop() || 0
      setScores((prevScores) => {
        const newScores = [...prevScores]
        newScores[currentPlayer] = lastScore
        return newScores
      })
      setScoreHistory((prevHistory) => {
        const newHistory = [...prevHistory]
        newHistory[currentPlayer] = [...scoreHistory[currentPlayer]]
        return newHistory
      })
      setSelectedBalls((prevSelectedBalls) => {
        const newSelectedBalls = [...prevSelectedBalls]
        newSelectedBalls.pop()
        return newSelectedBalls
      })
    }
  }

  const handleFoul = () => {
    // Add points to the opponent
    const opponent = currentPlayer === 0 ? 1 : 0
    setScoreHistory((prevHistory) => {
      const newHistory = [...prevHistory]
      newHistory[opponent] = [...scoreHistory[opponent], scores[opponent]]
      return newHistory
    })
    setScores((prevScores) => {
      const newScores = [...prevScores]
      newScores[opponent] += 1 // Add 1 point for a foul
      return newScores
    })
    handleEndTurn()
  }

  const handlePause = () => {
    setIsPaused(!isPaused)
  }

  const handleEndTurn = () => {
    setCurrentPlayer((prevPlayer) => (prevPlayer === 0 ? 1 : 0))
    const settingsData = JSON.parse(localStorage.getItem("settingsData") || "{}")
    setTimer(settingsData.timePerTurn || 60) // Reset timer to the value from settings
  }

  const handleBallClick = (num: number) => {
    // Prevent selecting ball 8 until all other balls are selected
    if (num === 8 && selectedBalls.length < 14) {
      return
    }

    if (!selectedBalls.includes(num)) {
      setScoreHistory((prevHistory) => {
        const newHistory = [...prevHistory]
        newHistory[currentPlayer] = [...scoreHistory[currentPlayer], scores[currentPlayer]]
        return newHistory
      })
      setScores((prevScores) => {
        const newScores = [...prevScores]
        newScores[currentPlayer] += num
        return newScores
      })
      setSelectedBalls((prevSelectedBalls) => [...prevSelectedBalls, num])
    }
  }

  const handleGameEnd = () => {
    setIsGameEnd(true)
    if (scores[0] > scores[1]) {
      setWinner(0)
    } else if (scores[1] > scores[0]) {
      setWinner(1)
    } else {
      setWinner(null) // It's a tie
    }
  }

  const handleNewGame = () => {
    setScores([0, 0])
    setScoreHistory([[], []])
    setSelectedBalls([])
    setIsGameEnd(false)
    setWinner(null)
    const settingsData = JSON.parse(localStorage.getItem("settingsData") || "{}")
    setTimer(settingsData.timePerTurn || 60)
  }

  const handleQuit = () => {
    navigate("/")
  }

  // Calculate time display
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`
  }

  // Calculate warning class for timer
  const getTimerClass = () => {
    if (timer <= 10) return "text-red-500"
    if (timer <= 20) return "text-yellow-500"
    return "text-white"
  }

  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-gradient-to-b from-gray-900 to-gray-800 p-4">
      <div className="relative w-full max-w-4xl bg-gray-800 border-4 border-gray-700 rounded-2xl p-8 pt-20 pb-6 shadow-2xl">
        {/* Header with title */}
        <div className="absolute top-0 left-0 right-0 bg-gray-900 rounded-t-xl p-2 text-center">
          <h1 className="text-2xl font-bold text-white">Billiard Scoreboard</h1>
        </div>

        {/* Player Info Boxes */}
        <div className="flex justify-between mb-6">
          <div
            className={`flex items-center space-x-3 p-3 rounded-xl transition-all duration-300 ${
              currentPlayer === 0 ? "bg-gradient-to-r from-blue-900 to-blue-700 shadow-lg scale-105" : "bg-gray-700"
            }`}
          >
            <div className="relative w-14 h-14 rounded-full overflow-hidden border-2 border-gray-600">
              <img
                src={players[0].avatar || "/placeholder.svg"}
                alt="Player 1"
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <p className="text-white font-bold">{players[0].username}</p>
              <p className="text-3xl font-bold text-white">{scores[0]}</p>
            </div>
            {currentPlayer === 0 && (
              <div className="absolute -top-2 -right-2 bg-blue-500 rounded-full p-1">
                <Clock className="w-4 h-4 text-white" />
              </div>
            )}
          </div>

          <div className="flex flex-col items-center justify-center">
            <div className="text-white text-xl font-bold">VS</div>
          </div>

          <div
            className={`flex items-center space-x-3 p-3 rounded-xl transition-all duration-300 ${
              currentPlayer === 1 ? "bg-gradient-to-r from-red-900 to-red-700 shadow-lg scale-105" : "bg-gray-700"
            }`}
          >
            <div>
              <p className="text-white font-bold text-right">{players[1].username}</p>
              <p className="text-3xl font-bold text-white text-right">{scores[1]}</p>
            </div>
            <div className="relative w-14 h-14 rounded-full overflow-hidden border-2 border-gray-600">
              <img
                src={players[1].avatar || "/placeholder.svg"}
                alt="Player 2"
                className="w-full h-full object-cover"
              />
            </div>
            {currentPlayer === 1 && (
              <div className="absolute -top-2 -left-2 bg-red-500 rounded-full p-1">
                <Clock className="w-4 h-4 text-white" />
              </div>
            )}
          </div>
        </div>

        {/* Timer */}
        <div className="flex justify-center mb-6">
          <div className={`text-4xl font-bold px-6 py-3 bg-gray-900 rounded-xl ${getTimerClass()}`}>
            {formatTime(timer)}
          </div>
        </div>

        {/* Control Buttons */}
        <div className="flex justify-between items-center mb-6">
          <button
            className="flex items-center gap-2 bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition-colors"
            onClick={handleUndo}
          >
            <RotateCcw className="w-5 h-5" />
            <span>Undo</span>
          </button>

          <button
            className="flex items-center gap-2 bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition-colors"
            onClick={handlePause}
          >
            {isPaused ? (
              <>
                <Play className="w-5 h-5" />
                <span>Resume</span>
              </>
            ) : (
              <>
                <Pause className="w-5 h-5" />
                <span>Pause</span>
              </>
            )}
          </button>

          <button
            className="flex items-center gap-2 bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition-colors"
            onClick={handleEndTurn}
          >
            <SkipForward className="w-5 h-5" />
            <span>End Turn</span>
          </button>

          <button
            className="flex items-center gap-2 bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition-colors"
            onClick={handleFoul}
          >
            <AlertTriangle className="w-5 h-5" />
            <span>Foul</span>
          </button>
        </div>

        {/* Billiard Balls */}
        <div className="bg-gray-700 p-4 rounded-xl mb-6">
          <h2 className="text-white text-lg font-bold mb-3">Select Pocketed Balls</h2>
          <div className="grid grid-cols-5 sm:grid-cols-8 gap-3 justify-center">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15].map((num, index) => (
              <button
                key={num}
                className={`
                  w-12 h-12 text-lg flex items-center justify-center rounded-full 
                  border-2 border-gray-600 shadow-md transform transition-all duration-200
                  ${ballColors[index]} 
                  ${selectedBalls.includes(num) ? "opacity-40 scale-90" : "hover:scale-105"} 
                  ${num === 8 && selectedBalls.length < 14 ? "cursor-not-allowed opacity-30" : ""}
                  ${num <= 7 ? "text-white" : num === 8 ? "text-white" : "text-black"}
                `}
                onClick={() => handleBallClick(num)}
                disabled={selectedBalls.includes(num) || (num === 8 && selectedBalls.length < 14)}
              >
                {num}
              </button>
            ))}
          </div>
        </div>

        {/* End Game Button */}
        <div className="flex justify-center">
          <button
            className="flex items-center gap-2 bg-red-700 hover:bg-red-600 text-white px-6 py-3 rounded-lg transition-colors"
            onClick={handleGameEnd}
          >
            <Flag className="w-5 h-5" />
            <span>End Game</span>
          </button>
        </div>
      </div>

      {/* Pause Modal */}
      {isPaused && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50">
          <div className="bg-gray-800 p-8 rounded-xl shadow-2xl text-center border-2 border-gray-700 max-w-md w-full">
            <h2 className="text-3xl font-bold mb-6 text-white">Game Paused</h2>
            <p className="text-gray-300 mb-8">The game timer has been paused. Click resume to continue playing.</p>
            <div className="flex justify-center gap-4">
              <button
                className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-6 py-3 rounded-lg transition-colors"
                onClick={handlePause}
              >
                <Play className="w-5 h-5" />
                <span>Resume Game</span>
              </button>
              <button
                className="flex items-center gap-2 bg-red-700 hover:bg-red-600 text-white px-6 py-3 rounded-lg transition-colors"
                onClick={handleGameEnd}
              >
                <Flag className="w-5 h-5" />
                <span>End Game</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Game End Modal */}
      {isGameEnd && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50">
          <div className="bg-gray-800 p-8 rounded-xl shadow-2xl text-center border-2 border-gray-700 max-w-md w-full">
            <div className="mb-4">
              <Trophy className="w-16 h-16 text-yellow-400 mx-auto" />
            </div>
            <h2 className="text-3xl font-bold mb-2 text-white">
              {winner !== null ? `${players[winner].username} Wins!` : "It's a Tie!"}
            </h2>
            <p className="text-2xl font-bold mb-6 text-white">
              {scores[0]} - {scores[1]}
            </p>
            <div className="flex justify-center gap-4">
              <button
                className="flex items-center gap-2 bg-green-600 hover:bg-green-500 text-white px-6 py-3 rounded-lg transition-colors"
                onClick={handleNewGame}
              >
                <RotateCcw className="w-5 h-5" />
                <span>New Game</span>
              </button>
              <button
                className="flex items-center gap-2 bg-gray-700 hover:bg-gray-600 text-white px-6 py-3 rounded-lg transition-colors"
                onClick={handleQuit}
              >
                <Home className="w-5 h-5" />
                <span>Home</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default BilliardScoreboard

