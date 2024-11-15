import clsx from "clsx";
import React, { useState } from "react";

interface Props {
  setPoints: (points: number) => void;
  play: boolean;
  setPlay: (play: boolean) => void;
  gameOver: boolean;
  status: number;
  currentNumber: number;
}

const Header: React.FC<Props> = ({
  setPoints,
  play,
  currentNumber,
  setPlay,
  gameOver,
  status,
}) => {
  const [inputValue, setInputValue] = useState<string>("");

  // Function to handle the "Play" button click
  const handlePlayClick = () => {
    const num = Number(inputValue);
    if (!isNaN(num) && num > 0) {
      setPoints(num); // Set points passed from parent component
      setPlay(true); // Set play state to true after clicking "Play"
    } else {
      alert("Please enter a valid number of points.");
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };
  return (
    <div className="flex flex-col gap-y-4">
      <h1 className="uppercase text-black text-2xl font-bold">
        {status === 1
          ? "All Cleared"
          : status === 2
          ? "Game Over"
          : "Let's Play"}
      </h1>
      <div>
        <label className="mr-2">Points:</label>
        <input
          type="number"
          placeholder="Enter points"
          className="border px-2"
          value={inputValue}
          onChange={handleInputChange}
        />
      </div>
      <p className="">
        Time:<span className="ml-5">00:00:00</span>
      </p>
      <div className=" flex gap-x-2">
        {!gameOver ? (
          <>
            {!play ? (
              <button className="border-2 w-32" onClick={handlePlayClick}>
                Play
              </button>
            ) : (
              <div>
                <div>
                  <button
                    className="border-2 w-32"
                    onClick={() => {
                      setPlay(false);
                      setInputValue("");
                      setPoints(0);
                    }}
                  >
                    Reset Game
                  </button>
                  <button className="border-2 w-32">Auto Play</button>
                </div>
                {play && status === 0 && (
                  <p className="pt-1">
                    Next Num: <span className="font-bold">{currentNumber}</span>
                  </p>
                )}
              </div>
            )}
          </>
        ) : (
          <p className="text-2xl font-bold">
            Finished!!!{" "}
            <span
              className={clsx({
                "text-green-500": status === 1,
                "text-red-500": status === 2,
              })}
            >
              ({status === 1 ? "You Win" : status === 2 ? "You Lose" : ""}) at
              points {inputValue}
            </span>
          </p>
        )}
      </div>
    </div>
  );
};

export default Header;
