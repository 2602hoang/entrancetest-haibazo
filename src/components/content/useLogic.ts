/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-expressions */
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
  console.log(window.innerWidth);
  const containerWidth =
    window.innerWidth > 768
      ? (window.innerWidth / 3) * 2
      : window.innerWidth * 0.96;
  const numbers = Array.from({ length: points }, (_, index) => index + 1);
  const [disabledNumbers, setDisabledNumbers] = useState<Set<number>>(
    new Set()
  );
  const [timePerNumber, setTimePerNumber] = useState<{ [key: number]: number }>(
    {}
  );

  useEffect(() => {
    // Start the countdown for numbers clicked
    const timer = setInterval(() => {
      setTimePerNumber((prevTimePerNumber) => {
        let updated = { ...prevTimePerNumber };
        Object.keys(updated).forEach((num: any) => {
          if (updated[num] > 0) {
            updated[num] = parseFloat((updated[num] - 0.1).toFixed(1));
            if (updated[num] <= 0) {
              updated[num] = 0;
            }
          }
        });
        return updated;
      });
    }, 100); // Decrement time by 0.1 every 100ms

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    setDisabledNumbers(new Set(selectedNumbers));
  }, [selectedNumbers]);

  const checkNum = (num: number) => {
    if (disabledNumbers.has(num)) {
      return true;
    }
    return false;
  };
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

  const handleClick = (num: number) => {
    if (gameOver) return;
    if (num === currentNumber) {
      setSelectedNumbers([...selectedNumbers, num]);
      setCurrentNumber(currentNumber + 1);
      setTimePerNumber((prev) => ({
        ...prev,
        [num]: 3.0,
      }));
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
    setPoints(0);
    setPlay(false);
  };
  return {
    containerHeight,
    containerWidth,
    selectedNumbers,
    positions,
    numbers,
    handleClick,
    resetGame,
    checkNum,
    setDisabledNumbers,
    timePerNumber,
    setTimePerNumber,
  };
};
