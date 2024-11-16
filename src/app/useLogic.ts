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
  const [autoClicking, setAutoClicking] = useState(false);
  const [timePerNumber, setTimePerNumber] = useState<{
    [key: number]: number;
  }>({});
  const [disabledNumbers, setDisabledNumbers] = useState<Set<number>>(
    new Set()
  );
  const checkNum = (num: number) => {
    if (disabledNumbers.has(num)) {
      return true;
    }
    return false;
  };
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

  useEffect(() => {
    setDisabledNumbers(new Set(selectedNumbers));
  }, [selectedNumbers]);
  useEffect(() => {
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
    }, 100);

    return () => clearInterval(timer);
  }, []);
  useEffect(() => {
    if (gameOver || currentNumber > points || !autoClicking) return;

    const autoClickNextNumber = setInterval(() => {
      if (currentNumber <= points) {
        const nextNum = currentNumber;
        if (!checkNum(nextNum)) {
          handleClick(nextNum);
        }
      } else {
        clearInterval(autoClickNextNumber);
      }
    }, 2000);

    return () => clearInterval(autoClickNextNumber);
  }, [currentNumber, gameOver, points, selectedNumbers, autoClicking]);
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
    handleClick,
    timePerNumber,
    setTimePerNumber,
    checkNum,
    setAutoClicking,
    autoClicking,
  };
};
