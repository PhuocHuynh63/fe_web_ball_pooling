import { useState, useEffect } from "react";

export const useScoreboard = () => {
  const [scores, setScores] = useState({ player1: 0, player2: 0, player3: 0, player4: 0 });
  const [selectedBalls, setSelectedBalls] = useState<number[]>([]);
  const [isLandscape, setIsLandscape] = useState(window.innerWidth > window.innerHeight);

  useEffect(() => {
    const handleResize = () => {
      setIsLandscape(window.innerWidth > window.innerHeight);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleSelectBall = (ball: number) => {
    if (!selectedBalls.includes(ball)) {
      setSelectedBalls([...selectedBalls, ball]);
      setScores(prev => ({ ...prev, player1: prev.player1 + ball }));
    }
  };

  const handleUndo = () => {
    const lastBall = selectedBalls.pop();
    if (lastBall !== undefined) {
      setSelectedBalls([...selectedBalls]);
      setScores(prev => ({ ...prev, player1: prev.player1 - lastBall }));
    }
  };

  return {
    scores,
    selectedBalls,
    isLandscape,
    handleSelectBall,
    handleUndo,
  };
};