import { useState } from "react";

export const useLogicApp = () => {
  const [points, setPoints] = useState<number>(0);
  const [play, setPlay] = useState<boolean>(false);
  const [gameOver, setGameOver] = useState(false);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState<number>(0);
  const [currentNumber, setCurrentNumber] = useState(1);
  const [selectedNumbers, setSelectedNumbers] = useState<number[]>([]);
  const [inputValue, setInputValue] = useState<string>("");

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
    loading,
    setLoading,
    setInputValue,
  };
};
