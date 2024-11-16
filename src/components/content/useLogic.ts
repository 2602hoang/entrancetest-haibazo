import { useEffect, useState } from "react";
import { PropContent } from "./Content";

export const useLogic = ({
  points,
  setPoints,
  setGameOver,
  setPlay,
  currentNumber,
  setCurrentNumber,
  gameOver,
  setStatus,
  selectedNumbers,
  setSelectedNumbers,
}: PropContent) => {
  const containerHeight = window.innerHeight * 0.7;
  const containerWidth =
    window.innerWidth > 768
      ? (window.innerWidth / 3) * 2
      : window.innerWidth * 0.96;
  const numbers = Array.from({ length: points }, (_, index) => index + 1);
  const [positions, setPositions] = useState<{
    [key: number]: { top: number; left: number };
  }>({});
  useEffect(() => {
    const newPositions: { [key: number]: { top: number; left: number } } = {};
    numbers.forEach((num) => {
      const buttonSize = 40;
      const randomTop = Math.random() * (containerHeight - buttonSize);
      const randomLeft = Math.random() * (containerWidth - buttonSize);
      newPositions[num] = { top: randomTop, left: randomLeft };
    });
    setPositions(newPositions);
  }, [points]);

  const resetGame = () => {
    setSelectedNumbers([]);
    setCurrentNumber(1);
    setStatus(0);
    setGameOver(false);
    setPoints(0);
    setPlay(false);
  };
  return {
    containerHeight,
    containerWidth,
    selectedNumbers,
    positions,
    numbers,
    resetGame,
  };
};
