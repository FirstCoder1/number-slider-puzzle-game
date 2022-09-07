import { useEffect, useCallback } from "react";
import { observer } from "mobx-react";

//components
import PuzzlePiece from "./components/PuzzlePiece";
import store from "./Store";

//styles
import "./App.css";

const App = observer(() => {
  useEffect(() => {
    store.getRandomPosition();
  }, []);

  const moveHandler = useCallback((number) => {
    store.swapPosition(number);
  }, []);

  return (
    <div className="App">
      <button onClick={() => store.getRandomPosition()}>Restart</button>
      <div className="puzzle-board">
        {store.state.map((num) => (
          <PuzzlePiece key={num} number={num} moveHandler={moveHandler} />
        ))}
      </div>
      {store.isWin ? <h1> Congratulation! </h1> : <p>Please Click Puzzles</p>}
    </div>
  );
});

export default App;
