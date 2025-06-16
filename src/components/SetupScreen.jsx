import React, { useState } from "react";
export default function SetupScreen({ state, dispatch }) {
  const [numPlayers, setNumPlayers] = useState(4);
  const [targetScore, setTargetScore] = useState(4);
  return (
    <div className="min-h-screen bg-gray-900 text-white p-5 flex flex-col gap-4 items-center">
      <h1 className="text-2xl font-bold">Game Setup</h1>
      <input type="number" value={numPlayers} onChange={e => setNumPlayers(+e.target.value)}
        className="text-black p-2 rounded" placeholder="Number of Players" />
      <input type="number" value={targetScore} onChange={e => setTargetScore(+e.target.value)}
        className="text-black p-2 rounded" placeholder="Score to Win" />
      <button onClick={() => dispatch({ type: "SETUP", numPlayers, targetScore })}
        className="bg-blue-500 p-2 rounded">Start</button>
    </div>
  );
}