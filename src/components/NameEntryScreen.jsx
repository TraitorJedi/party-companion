import React, { useState } from "react";
export default function NameEntryScreen({ state, dispatch }) {
  const [name, setName] = useState("");
  return (
    <div className="min-h-screen bg-gray-900 text-white p-5 flex flex-col gap-4 items-center">
      <h1 className="text-2xl font-bold">Enter Player Names</h1>
      <input type="text" value={name} onChange={e => setName(e.target.value)}
        className="text-black p-2 rounded w-48 text-center" placeholder="Player Name" />
      <button onClick={() => { dispatch({ type: "ADD_PLAYER", name }); setName(""); }}
        className="bg-green-500 p-2 rounded w-40">Add Player</button>
      <div>Players: {state.players.map(p => p.name).join(", ")}</div>
      {state.players.length === state.numPlayers && (
        <button onClick={() => dispatch({ type: "ALL_PLAYERS_ADDED" })}
          className="bg-blue-500 p-2 rounded w-40">Continue</button>
      )}
    </div>
  );
}