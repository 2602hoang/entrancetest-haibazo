import React from "react";
import { useLogic } from "./useLogic";
import clsx from "clsx";

export interface PropContent {
  points: number;
  setPoints: (points: number) => void;
  setGameOver: (gameOver: boolean) => void;
  gameOver: boolean;
  setPlay: (play: boolean) => void;
  setStatus: (status: number) => void;
  currentNumber: number;
  setCurrentNumber: (currentNumber: number) => void;
  selectedNumbers: number[];
  setSelectedNumbers: (selectedNumbers: number[]) => void;
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setTimePlayer: React.Dispatch<React.SetStateAction<number>>;
  handleClick: (num: number) => void;
  timePerNumber: { [key: number]: number };
  setTimePerNumber: React.Dispatch<
    React.SetStateAction<{ [key: number]: number }>
  >;
  checkNum: (num: number) => boolean;
}

const Content: React.FC<PropContent> = ({
  points,
  setTimePlayer,
  setPoints,
  setGameOver,
  setPlay,
  currentNumber,
  setCurrentNumber,
  selectedNumbers,
  setSelectedNumbers,
  gameOver,
  setStatus,
  loading,
  setLoading,
  handleClick,
  timePerNumber,
  setTimePerNumber,
  checkNum,
}) => {
  const { containerHeight, containerWidth, positions, resetGame, numbers } =
    useLogic({
      points,
      loading,
      setLoading,
      setTimePlayer,
      handleClick,
      timePerNumber,
      setTimePerNumber,
      setPoints,
      setGameOver,
      setPlay,
      currentNumber,
      setSelectedNumbers,
      selectedNumbers,
      setCurrentNumber,
      gameOver,
      setStatus,
      checkNum,
    });
  const handleNumberClick = (num: number) => {
    if (!selectedNumbers.includes(num)) {
      handleClick(num);
    }
  };

  return (
    <>
      <div
        className="relative container "
        style={{ minHeight: containerHeight, width: containerWidth }}
      >
        {numbers.reverse().map((num) => {
          const position = positions[num];
          if (!position) return null;

          const buttonSize = 40;

          return (
            <button
              className={clsx(
                "border-2 rounded-full border-black bg-orange-400 cursor-pointer flex items-center justify-center text-wihite  ",
                {
                  "animate-fadeOut bg-red-400": checkNum(num),
                }
              )}
              key={num}
              style={{
                position: "absolute",
                top: `${position.top}px`,
                left: `${position.left}px`,
                width: buttonSize,
                height: buttonSize,
              }}
              onClick={() => {
                handleNumberClick(num);
              }}
            >
              <p className="flex flex-col justify-center items-center">
                <span> {num}</span>
                <span
                  className={clsx("text-[8px] text-white", {
                    "text-orange-400 hidden": timePerNumber[num] === 0,
                  })}
                >
                  {timePerNumber[num] !== undefined ? timePerNumber[num] : ""}
                </span>
              </p>
            </button>
          );
        })}
        {gameOver && (
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <button
              className="border px-4 py-2 bg-blue-300 text-white rounded-xlß"
              onClick={() => {
                resetGame();
                setTimePerNumber({});
                setTimePlayer(0.0);
              }}
            >
              New Game
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default Content;
