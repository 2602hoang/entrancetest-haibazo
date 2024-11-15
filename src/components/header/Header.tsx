import clsx from "clsx";
import React from "react";
import LoadText from "../loading/LoadText";

interface Props {
  setPoints: (points: number) => void;
  play: boolean;
  setPlay: (play: boolean) => void;
  gameOver: boolean;
  status: number;
  currentNumber: number;
  setCurrentNumber: (currentNumber: number) => void;
  setSelectedNumbers: (selectedNumbers: number[]) => void;
  inputValue: string;
  setInputValue: (inputValue: string) => void;
  handlePlayClick(): void;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  timePlayer: number;
  setTimePlayer: React.Dispatch<React.SetStateAction<number>>;
}

const Header: React.FC<Props> = ({
  setPoints,
  timePlayer,
  setTimePlayer,
  handlePlayClick,
  setLoading,
  play,
  currentNumber,
  setCurrentNumber,
  setSelectedNumbers,
  setPlay,
  gameOver,
  status,
  inputValue,
  setInputValue,
}) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  return (
    <div className="flex flex-col relative gap-y-4 container text-white pl-4 py-2">
      <h1
        className={clsx("uppercase  text-2xl font-bold", {
          "text-red-600 py-5": status === 2,
          "text-green-600 py-5": status === 1,
        })}
      >
        {status === 1 ? (
          <LoadText title="All cleared" />
        ) : status === 2 ? (
          <LoadText title="Game Over" />
        ) : (
          "Let's Play"
        )}
      </h1>
      <div>
        <label className="mr-2">Points:</label>
        <input
          type="number"
          placeholder="Enter points"
          className="border bg-slate-600 px-2  focus-within:border-orange-400 "
          value={inputValue}
          onChange={handleInputChange}
          disabled={play}
        />
      </div>
      <p className="">
        Time:<span className="ml-5">{timePlayer}s</span>
      </p>
      <div className=" flex gap-x-2">
        {!gameOver ? (
          <>
            {!play ? (
              <button
                className="border-2 w-32 py-1 rounded-xl hover:bg-sky-400"
                onClick={() => {
                  handlePlayClick();
                  setTimePlayer(0.0);
                }}
              >
                Play
              </button>
            ) : (
              <div>
                <div className=" flex gap-x-2">
                  <button
                    className="border-2 w-32 py-1 rounded-xl hover:bg-sky-400"
                    onClick={() => {
                      setPlay(false);
                      setInputValue("");
                      setSelectedNumbers([]);
                      setPoints(0);
                      setCurrentNumber(1);
                      setTimePlayer(0.0);
                      setLoading(true);
                    }}
                  >
                    Reset Game
                  </button>
                  <button className="border-2 w-32 py-1 rounded-xl hover:bg-sky-400">
                    Auto Play
                  </button>
                </div>
                {play && status === 0 && (
                  <p className="py-1">
                    Next Num: <span className="font-bold">{currentNumber}</span>
                  </p>
                )}
              </div>
            )}
          </>
        ) : (
          <div>
            <p className="text-2xl font-bold">
              Finished!!!{" "}
              <span
                className={clsx({
                  "text-green-500": status === 1,
                  "text-red-500": status === 2,
                })}
              >
                ({status === 1 ? "You Win" : status === 2 ? "You Lose" : ""}) at
                points {currentNumber - 1}
              </span>
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
