import { useEffect, useState } from "react";

export const useLogicApp = () => {
  const [points, setPoints] = useState<number>(0);
  const [play, setPlay] = useState<boolean>(false);
  const [gameOver, setGameOver] = useState(false);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState<number>(0);
  const [currentNumber, setCurrentNumber] = useState(1);
  const [selectedNumbers, setSelectedNumbers] = useState<number[]>([]);
  const [inputValue, setInputValue] = useState<string>("");
  const [timePlayer, setTimePlayer] = useState(0.0);
  const [timerRunning, setTimerRunning] = useState(false);
  const [intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (play && !gameOver && !timerRunning) {
      const id = setInterval(() => {
        setTimePlayer((prevTime) => parseFloat((prevTime + 0.1).toFixed(1)));
      }, 100);
      setIntervalId(id);
      setTimerRunning(true);
    } else if (!play || gameOver) {
      if (intervalId) {
        clearInterval(intervalId);
      }
      setTimerRunning(false);
      setIntervalId(null);
    }
    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [play, gameOver, timerRunning, intervalId]);

  const handlePlayClick = () => {
    const num = Number(inputValue);

    if (inputValue === "") {
      alert("Please enter a number.");
      setLoading(false);
      return;
    }

    if (isNaN(num) || num <= 0) {
      alert("Please enter a valid number greater than 0.");
      setPoints(0);
      setInputValue("");
      setLoading(false);
      return;
    }

    if (num > 5000) {
      alert("Please enter a number less than or equal to 5000.");
      setPoints(0);
      setInputValue("");
      setLoading(false);
      return;
    }

    setPoints(num);
    setPlay(true);
    setLoading(true);
  };
  return {
    points,
    setPoints,
    setGameOver,
    setPlay,
    currentNumber,
    setCurrentNumber,
    gameOver,
    setStatus,
    status,
    selectedNumbers,
    setSelectedNumbers,
    handlePlayClick,
    play,
    inputValue,
    timePlayer,
    setTimePlayer,
    loading,
    setLoading,
    setInputValue,
  };
};
