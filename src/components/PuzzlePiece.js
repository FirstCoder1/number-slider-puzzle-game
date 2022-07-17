import React from "react";
import "./PuzzlePiece.css";

export default function PuzzlePiece({ number, moveHandler }) {
  const isNonZero = number !== 0;
  return (
    <div
      className={isNonZero ? "puzzle-piece" : ""}
      onClick={(e) => (isNonZero ? moveHandler(number) : null)}
    >
      <p>{isNonZero ? number : ""}</p>
    </div>
  );
}
