import React from "react";
import { useLogic } from "./useLogic";

export interface PropContent {
  points: number;
  setPoints: (points: number) => void;
  setGameOver: (gameOver: boolean) => void;
  gameOver: boolean;
  setPlay: (play: boolean) => void;
  setStatus: (status: number) => void;
  currentNumber: number;
  setCurrentNumber: (currentNumber: number) => void;
}

const Content: React.FC<PropContent> = ({
  points,
  setPoints,
  setGameOver,
  setPlay,
  currentNumber,
  setCurrentNumber,
  gameOver,
  setStatus,
}) => {
  const {
    containerHeight,
    containerWidth,
    numbers,
    selectedNumbers,
    positions,
    handleClick,
    resetGame,
  } = useLogic({
    points,
    setPoints,
    setGameOver,
    setPlay,
    currentNumber,
    setCurrentNumber,
    gameOver,
    setStatus,
  });
  return (
    <div
      className="relative"
      style={{ minHeight: containerHeight, width: containerWidth }}
    >
      {numbers.reverse().map((num) => {
        if (selectedNumbers.includes(num)) {
          return null;
        }

        const position = positions[num];
        if (!position) return null;

        const buttonSize = 40;

        return (
          <button
            className="border rounded-full cursor-pointer flex items-center justify-center bg-blue-500 text-black"
            key={num}
            style={{
              position: "absolute",
              top: `${position.top}px`,
              left: `${position.left}px`,
              width: buttonSize,
              height: buttonSize,
            }}
            onClick={() => handleClick(num)}
          >
            {num}
          </button>
        );
      })}
      {gameOver && (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <button
            className="border px-4 py-2 bg-blue-500 text-white rounded"
            onClick={resetGame}
          >
            Restart Game
          </button>
        </div>
      )}
    </div>
  );
};

export default Content;
