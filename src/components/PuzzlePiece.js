import React from "react";
import "./PuzzlePiece.css";

export default function PuzzlePiece({ number, state, dispatch }) {
  const isNonZero = number !== 0;
  const checkMovable = (pos, posZero) => {
    const diff = Math.abs(posZero - pos);
    if (diff === 3 || diff === 1) return true;
    return false;
  };

  const moveHandler = (number) => {
    const spacePos = state.indexOf(0);
    const selectedPos = state.indexOf(number);
    if (checkMovable(selectedPos, spacePos))
      dispatch({ type: "SWAP_POSITION", selectedPos, spacePos });
  };
  return (
    <div
      className={isNonZero ? "puzzle-piece" : ""}
      onClick={(e) => (isNonZero ? moveHandler(number) : null)}
    >
      <p>{isNonZero ? number : ""}</p>
    </div>
  );
}
