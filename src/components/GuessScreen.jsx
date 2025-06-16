import React, { useState } from "react";
export default function GuessScreen({ state, dispatch }) {
  const guesserList = state.roundType === "normal"
    ? state.players.filter((_, i) => i !== state.currentPlayerIndex)
    : state.players.filter(p => state.tiebreakerPlayers.includes(p.name));
  const guesser = guesserList[state.guesses.length];
  const [guess, setGuess] = useState("");
  return (
    <div className="min-h-screen bg-gray-900 text-white p-5 flex flex-col gap-4 items-center">
      <h1 className="text-xl font-bold">Pass to {guesser.name}</h1>
      <h2>Enter your guess:</h2>
      <input type="number" value={guess} onChange={e => setGuess(e.target.value)}
        className="text-black p-2 rounded w-48 text-center" placeholder="Your Guess" />
      <button onClick={() => {
        dispatch({ type: "ADD_GUESS", guess: { name: guesser.name, value: +guess } });
        if (state.guesses.length + 1 === guesserList.length) dispatch({ type: "SHOW_RESULTS" });
      }} className="bg-blue-500 p-2 rounded w-40">Submit</button>
    </div>
  );
}