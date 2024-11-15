import Header from "../components/header/Header";
import Content from "../components/content/Content";
import React, { useState } from "react";

const App = () => {
  const [points, setPoints] = useState<number>(0);
  const [play, setPlay] = useState<boolean>(false);
  const [gameOver, setGameOver] = useState(false);
  const [status, setStatus] = useState<number>(0);
  const [currentNumber, setCurrentNumber] = useState(1);

  return (
    <div className="flex flex-col justify-start pt-5 items-center h-screen">
      <div className="w-1/2 mb-2">
        <Header
          setPoints={setPoints}
          play={play}
          setPlay={setPlay}
          gameOver={gameOver}
          currentNumber={currentNumber}
          status={status}
        />
      </div>
      <div className="w-2/3 border-2">
        <Content
          points={points}
          setPoints={setPoints}
          currentNumber={currentNumber}
          setCurrentNumber={setCurrentNumber}
          gameOver={gameOver}
          setGameOver={setGameOver}
          setPlay={setPlay}
          setStatus={setStatus}
        />
      </div>
    </div>
  );
};

export default App;
