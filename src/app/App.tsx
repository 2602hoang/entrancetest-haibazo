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
    play,
    inputValue,
    setInputValue,
    loading,
    setLoading,
  } = useLogicApp();

  return (
    <div>
      <div className="flex flex-col justify-start pt-2 w-full items-center h-screen container1">
        <div className="w-2/3 pb-2 h-[26vh]">
          <Header
            setLoading={setLoading}
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
          />
        </div>

        <div className="w-2/3 border-2 h-[60vh]">
          <LoadingPage loading={loading} setLoading={setLoading} />
          <Content
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
