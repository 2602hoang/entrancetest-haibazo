import Header from "../components/header/Header";
import Content from "../components/content/Content";
import { useLogicApp } from "./useLogic";
import { LoadingPage } from "../components/loading/LoadingPage";

const App = () => {
  const {
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
    timePlayer,
    setTimePlayer,
    play,
    inputValue,
    setInputValue,
    loading,
    setLoading,
    handleClick,
    timePerNumber,
    setTimePerNumber,
    checkNum,
    setAutoClicking,
    autoClicking,
  } = useLogicApp();

  return (
    <div>
      <div className="flex flex-col justify-start pt-2 w-full  items-center h-screen container1">
        <div className="w-full px-3 lg:px-0 lg:w-2/3 pb-1 h-[29vh] lg:h-[27vh]">
          <Header
            setLoading={setLoading}
            timePlayer={timePlayer}
            setTimePlayer={setTimePlayer}
            handlePlayClick={handlePlayClick}
            inputValue={inputValue}
            setInputValue={setInputValue}
            setPoints={setPoints}
            play={play}
            setPlay={setPlay}
            gameOver={gameOver}
            currentNumber={currentNumber}
            setCurrentNumber={setCurrentNumber}
            status={status}
            setSelectedNumbers={setSelectedNumbers}
            setAutoClicking={setAutoClicking}
            autoClicking={autoClicking}
          />
        </div>

        <div className=" lg:h-[60vh] xl:h-[70vh]">
          <LoadingPage loading={loading} setLoading={setLoading} />
          <Content
            checkNum={checkNum}
            handleClick={handleClick}
            setTimePerNumber={setTimePerNumber}
            timePerNumber={timePerNumber}
            setTimePlayer={setTimePlayer}
            points={points}
            loading={loading}
            setLoading={setLoading}
            setPoints={setPoints}
            currentNumber={currentNumber}
            setCurrentNumber={setCurrentNumber}
            gameOver={gameOver}
            setGameOver={setGameOver}
            setPlay={setPlay}
            setStatus={setStatus}
            selectedNumbers={selectedNumbers}
            setSelectedNumbers={setSelectedNumbers}
          />
        </div>
      </div>
    </div>
  );
};

export default App;
