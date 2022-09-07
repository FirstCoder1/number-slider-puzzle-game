import { useEffect, useMemo, useReducer } from "react";

//components
import PuzzlePiece from "./components/PuzzlePiece";

//styles
import "./App.css";

function App() {
  const reducer = (state, action) => {
    switch (action.type) {
      case "GET_RANDOM_POSITION":
        return Array.from(Array(9).keys()) //0~8
          .sort(() => Math.random() - 0.5); //random
      case "SWAP_POSITION":
        return state.map((pos, index) => {
          if (index === action.selectedPos) return state[action.spacePos];
          if (index === action.spacePos) return state[action.selectedPos];
          return pos;
        });
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(reducer, []);

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

  return (
    <div className="App">
      <button onClick={() => dispatch({ type: "GET_RANDOM_POSITION" })}>
        Restart
      </button>
      <div className="puzzle-board">
        {state.map((num) => (
          <PuzzlePiece
            key={num}
            number={num}
            state={state}
            dispatch={dispatch}
          />
        ))}
      </div>
      {isWin ? <h1> Congratulation! </h1> : <p>Please Click Puzzles</p>}
    </div>
  );
}

export default App;
