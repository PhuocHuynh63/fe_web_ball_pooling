"use client";

import type React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Clock, RotateCcw, Pause, Play, SkipForward, Flag, AlertTriangle, Trophy, Home } from "lucide-react";
import PlayerInfoBoxes from "../../components/Game/BilliardScoreboard/Player_Info_Boxes";
import ControlButtons from "../../components/Game/BilliardScoreboard/Control_Buttons";
import BilliardBalls from "../../components/Game/BilliardScoreboard/Billiard_Balls";
import EndGameButton from "../../components/Game/BilliardScoreboard/End_Game_Button";

const BilliardScoreboard: React.FC = () => {
  const [scores, setScores] = useState([0, 0]);
  const [scoreHistory, setScoreHistory] = useState<number[][]>([[], []]);
  const [currentPlayer, setCurrentPlayer] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [selectedBalls, setSelectedBalls] = useState<number[]>([]);
  const [isGameEnd, setIsGameEnd] = useState(false);
  const [timer, setTimer] = useState(60); // Default to 60 seconds
  const [winner, setWinner] = useState<number | null>(null);

  const navigate = useNavigate();

  const players = [
    { username: "Player 1", avatar: "/images/user/owner.jpg" },
    { username: "Player 2", avatar: "/images/user/user-01.jpg" },
  ];

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
  ];

  useEffect(() => {
    // Retrieve settings data from localStorage
    const settingsData = JSON.parse(localStorage.getItem("settingsData") || "{}");
    if (settingsData.timePerTurn) {
      setTimer(settingsData.timePerTurn);
    }
  }, []);

  useEffect(() => {
    if (selectedBalls.length === 15) {
      handleGameEnd();
    }
  }, [selectedBalls]);

  useEffect(() => {
    let timerInterval: NodeJS.Timeout;
    if (!isPaused && !isGameEnd) {
      timerInterval = setInterval(() => {
        setTimer((prev) => {
          if (prev > 0) {
            return prev - 1;
          } else {
            handleEndTurn();
            return 60; // Reset timer to 60 seconds (or the value from settings)
          }
        });
      }, 1000);
    }
    return () => clearInterval(timerInterval);
  }, [isPaused, isGameEnd]);

  const handleUndo = () => {
    if (scoreHistory[currentPlayer].length > 0) {
      const lastScore = scoreHistory[currentPlayer].pop() || 0;
      setScores((prevScores) => {
        const newScores = [...prevScores];
        newScores[currentPlayer] = lastScore;
        return newScores;
      });
      setScoreHistory((prevHistory) => {
        const newHistory = [...prevHistory];
        newHistory[currentPlayer] = [...scoreHistory[currentPlayer]];
        return newHistory;
      });
      setSelectedBalls((prevSelectedBalls) => {
        const newSelectedBalls = [...prevSelectedBalls];
        newSelectedBalls.pop();
        return newSelectedBalls;
      });
    }
  };

  const handleFoul = () => {
    // Add points to the opponent
    const opponent = currentPlayer === 0 ? 1 : 0;
    setScoreHistory((prevHistory) => {
      const newHistory = [...prevHistory];
      newHistory[opponent] = [...scoreHistory[opponent], scores[opponent]];
      return newHistory;
    });
    setScores((prevScores) => {
      const newScores = [...prevScores];
      newScores[opponent] += 1; // Add 1 point for a foul
      return newScores;
    });
    handleEndTurn();
  };

  const handlePause = () => {
    setIsPaused(!isPaused);
  };

  const handleEndTurn = () => {
    setCurrentPlayer((prevPlayer) => (prevPlayer === 0 ? 1 : 0));
    const settingsData = JSON.parse(localStorage.getItem("settingsData") || "{}");
    setTimer(settingsData.timePerTurn || 60); // Reset timer to the value from settings
  };

  const handleBallClick = (num: number) => {
    // Prevent selecting ball 8 until all other balls are selected
    if (num === 8 && selectedBalls.length < 14) {
      return;
    }

    if (!selectedBalls.includes(num)) {
      setScoreHistory((prevHistory) => {
        const newHistory = [...prevHistory];
        newHistory[currentPlayer] = [...scoreHistory[currentPlayer], scores[currentPlayer]];
        return newHistory;
      });
      setScores((prevScores) => {
        const newScores = [...prevScores];
        newScores[currentPlayer] += num;
        return newScores;
      });
      setSelectedBalls((prevSelectedBalls) => [...prevSelectedBalls, num]);
    }
  };

  const handleGameEnd = () => {
    setIsGameEnd(true);
    if (scores[0] > scores[1]) {
      setWinner(0);
    } else if (scores[1] > scores[0]) {
      setWinner(1);
    } else {
      setWinner(null); // It's a tie
    }
  };

  const handleNewGame = () => {
    setScores([0, 0]);
    setScoreHistory([[], []]);
    setSelectedBalls([]);
    setIsGameEnd(false);
    setWinner(null);
    const settingsData = JSON.parse(localStorage.getItem("settingsData") || "{}");
    setTimer(settingsData.timePerTurn || 60);
  };

  const handleQuit = () => {
    navigate("/");
  };

  // Calculate time display
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  // Calculate warning class for timer
  const getTimerClass = () => {
    if (timer <= 10) return "text-red-500";
    if (timer <= 20) return "text-yellow-500";
    return "text-white";
  };

  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-gradient-to-b from-gray-900 to-gray-800 p-2">
      <div className="relative w-full max-w-4xl bg-gray-800 border-4 border-gray-700 rounded-2xl p-4 pt-10 pb-4 shadow-2xl">
        
        {/* Player Info Boxes */}
        <PlayerInfoBoxes
          players={players}
          scores={scores}
          currentPlayer={currentPlayer}
          timer={timer}
          formatTime={formatTime}
          getTimerClass={getTimerClass}
        />

        {/* Control Buttons */}
        <ControlButtons
          isPaused={isPaused}
          handleUndo={handleUndo}
          handlePause={handlePause}
          handleEndTurn={handleEndTurn}
          handleFoul={handleFoul}
        />

        {/* Billiard Balls */}
        <BilliardBalls
          ballColors={ballColors}
          selectedBalls={selectedBalls}
          handleBallClick={handleBallClick}
        />

        {/* End Game Button */}
        <EndGameButton handleGameEnd={handleGameEnd} />
      </div>

      {/* Pop UP Pause Modal */}
      {isPaused && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50">
          <div className="bg-gray-800 p-4 rounded-xl shadow-2xl text-center border-2 border-gray-700 max-w-md w-full">
            <h2 className="text-3xl font-bold mb-4 text-white">Game Paused</h2>
            <p className="text-gray-300 mb-4">
              The game timer has been paused. Click resume to continue playing.
            </p>
            <div className="flex justify-center gap-2">
              <button
                className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-5 py-2 rounded-lg transition-colors text-lg"
                onClick={handlePause}
              >
                <Play className="w-6 h-6" />
                <span>Resume Game</span>
              </button>
              <button
                className="flex items-center gap-2 bg-red-700 hover:bg-red-600 text-white px-5 py-2 rounded-lg transition-colors text-lg"
                onClick={handleGameEnd}
              >
                <Flag className="w-6 h-6" />
                <span>End Game</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Pop UP Game End Modal */}
      {isGameEnd && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50">
          <div className="bg-gray-800 p-4 rounded-xl shadow-2xl text-center border-2 border-gray-700 max-w-md w-full">
            <div className="mb-2">
              <Trophy className="w-16 h-16 text-yellow-400 mx-auto" />
            </div>
            <h2 className="text-3xl font-bold mb-2 text-white">
              {winner !== null
                ? `${players[winner].username} Wins!`
                : "It's a Tie!"}
            </h2>
            <p className="text-2xl font-bold mb-4 text-white">
              {scores[0]} - {scores[1]}
            </p>
            <div className="flex justify-center gap-2">
              <button
                className="flex items-center gap-2 bg-green-600 hover:bg-green-500 text-white px-5 py-2 rounded-lg transition-colors text-lg"
                onClick={handleNewGame}
              >
                <RotateCcw className="w-6 h-6" />
                <span>New Game</span>
              </button>
              <button
                className="flex items-center gap-2 bg-gray-700 hover:bg-gray-600 text-white px-5 py-2 rounded-lg transition-colors text-lg"
                onClick={handleQuit}
              >
                <Home className="w-6 h-6" />
                <span>Home</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BilliardScoreboard;
