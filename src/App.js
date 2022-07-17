import { useState, useEffect, useMemo } from "react";

//components

import PuzzlePiece from "./components/PuzzlePiece";

//styles
import "./App.css";

function App() {
  //hook
  const [positions, setPositions] = useState([]);

  const getRandomPosition = () => {
    setPositions(
      Array.from(Array(9).keys()) //0~8
        .sort(() => Math.random() - 0.5) //random
    );
  };
  const checkMovable = (pos, posZero) => {
    const diff = Math.abs(posZero - pos);
    if (diff % 3 === 0 || diff === 1) return true;
    return false;
  };
  const swapPosition = (pos, posZero) => {
    const newPositions = [...positions];
    newPositions[pos] = positions[posZero];
    newPositions[posZero] = positions[pos];
    setPositions(newPositions);
  };
  const moveHandler = (number) => {
    const posZero = positions.indexOf(0);
    const pos = positions.indexOf(number);
    if (checkMovable(pos, posZero)) swapPosition(pos, posZero);
  };

  useEffect(() => {
    getRandomPosition();
  }, []);

  const isWin = useMemo(
    () =>
      positions.reduce(
        (pre, cur, index) => pre && (cur === index + 1 || cur === 0),
        true
      ),
    [positions]
  );

  return (
    <div className="App">
      <button onClick={getRandomPosition}>Restart</button>
      <div className="puzzle-board">
        {positions.map((num) => (
          <PuzzlePiece key={num} number={num} moveHandler={moveHandler} />
        ))}
      </div>
      {isWin ? <h1> Congrantulation! </h1> : <p> Please Click Puzzles</p>}
    </div>
  );
}

export default App;
