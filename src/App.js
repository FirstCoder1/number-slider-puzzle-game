import { useEffect, useMemo, useContext, useCallback } from "react";

//components
import PuzzlePiece from "./components/PuzzlePiece";
import { DispatchContext } from "./Store";
import { StateContext } from "./Store";

//styles
import "./App.css";

function App() {
  const state = useContext(StateContext);
  const dispatch = useContext(DispatchContext);

  useEffect(() => {
    dispatch({ type: "GET_RANDOM_POSITION" });
  }, []);

  const isWin = useMemo(
    () =>
      state.reduce(
        (pre, cur, index) => pre && (cur === index + 1 || cur === 0),
        true
      ),
    [state]
  );

  const moveHandler = useCallback((number) => {
    dispatch({ type: "SWAP_POSITION", number: number });
  }, []);

  return (
    <div className="App">
      <button onClick={() => dispatch({ type: "GET_RANDOM_POSITION" })}>
        Restart
      </button>
      <div className="puzzle-board">
        {state.map((num) => (
          <PuzzlePiece key={num} number={num} moveHandler={moveHandler} />
        ))}
      </div>
      {isWin ? <h1> Congratulation! </h1> : <p>Please Click Puzzles</p>}
    </div>
  );
}

export default App;
