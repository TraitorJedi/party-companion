import React from "react";

export default function ResultsScreen({ state, dispatch }) {
  const reader = state.players[state.currentReaderIdx];
  const readerValue = state.readerNumber;

  return (
    <div className="min-h-screen bg-gray-900 text-white p-5 flex flex-col gap-4 items-center">
      <h1 className="text-2xl font-bold">Results</h1>
      <p>Reader ({reader}) chose: {readerValue}</p>
      {state.guesses.map((g, i) => (
        <p key={i}>{g.name} guessed {g.value}</p>
      ))}
      <button
        onClick={() => dispatch({ type: state.phase === "nextRound" ? "NEXT_ROUND" : "RESET_TO_NORMAL" })}
        className="bg-blue-500 p-2 rounded mt-4"
      >
        Continue
      </button>
    </div>
  );
}
