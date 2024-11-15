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
}: PropContent) => {
  const numbers = Array.from({ length: points }, (_, index) => index + 1);

  const containerHeight = 600;
  const containerWidth = (window.innerWidth / 3) * 2;

  const [selectedNumbers, setSelectedNumbers] = useState<number[]>([]);

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [points]);
  const handleClick = (num: number) => {
    if (gameOver) return;
    if (num === currentNumber) {
      setSelectedNumbers([...selectedNumbers, num]);
      setCurrentNumber(currentNumber + 1);
      if (selectedNumbers.length + 1 === points) {
        setPoints(0);
        setGameOver(true);
        alert("You won!");
        setStatus(1);
      }
    } else {
      setPoints(0);
      setGameOver(true);
      alert("You lost!");
      setStatus(2);
    }
  };
  const resetGame = () => {
    setSelectedNumbers([]);
    setCurrentNumber(1);
    setStatus(0);
    setGameOver(false);
    setPoints(points);
    setPlay(false);
  };
  return {
    numbers,
    containerHeight,
    containerWidth,
    selectedNumbers,
    positions,
    handleClick,
    resetGame,
  };
};
