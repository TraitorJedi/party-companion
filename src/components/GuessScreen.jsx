import React, { useState } from "react";

export default function GuessScreen({ state, dispatch }) {
  const isTiebreak = state.roundType === "tiebreaker";
  const candidates = isTiebreak
    ? state.players.filter(p => state.tiebreakerPlayers.includes(p))
    : state.players.filter((_, i) => i !== state.currentReaderIdx);

  const guesser = candidates[state.guesses.length];
  const [value, setValue] = useState("");
  const [override, setOverride] = useState(null);

  const submit = () => {
    let guess;
    if (override) guess = override === "INF" ? Infinity : -Infinity;
    else {
      const n = Number(value);
      if (isNaN(n)) return alert("Enter a number or use ∞/–∞");
      guess = n;
    }
    dispatch({ type: "ADD_GUESS", guess: { name: guesser, value: guess } });
    setValue(""); setOverride(null);
    if (state.guesses.length + 1 === candidates.length) dispatch({ type: "SHOW_RESULTS" });
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-5 flex flex-col gap-4 items-center">
      <h1 className="text-xl font-bold">Pass to {guesser}</h1>
      <div className="flex gap-2 items-center">
        <button
          onClick={() => setOverride("-INF")}
          className={`px-3 py-1 rounded ${override === "-INF" ? "bg-red-600" : "bg-gray-700"}`}
        >
          –∞
        </button>
        <input
          type="text"
          value={value}
          onChange={e => { setOverride(null); setValue(e.target.value); }}
          className="text-black p-2 rounded w-32 text-center"
          placeholder="Your Guess"
        />
        <button
          onClick={() => setOverride("INF")}
          className={`px-3 py-1 rounded ${override === "INF" ? "bg-green-600" : "bg-gray-700"}`}
        >
          ∞
        </button>
      </div>
      <button onClick={submit} className="bg-blue-500 p-2 rounded w-40">
        Submit
      </button>
    </div>
  );
}