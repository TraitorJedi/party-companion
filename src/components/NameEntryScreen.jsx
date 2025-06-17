import React, { useState } from "react";
import PlayerSidebar from "./PlayerSidebar";

export default function NameEntryScreen({ state, dispatch }) {
  const [name, setName] = useState("");
  return (
    <div className="min-h-screen bg-gray-900 text-white pl-36 p-5">
      <PlayerSidebar state={state} dispatch={dispatch} />
      <h1 className="text-2xl font-bold mb-4">Add Players</h1>
      <input
        type="text"
        value={name}
        onChange={e => setName(e.target.value)}
        className="text-black p-2 rounded w-48 mb-2"
        placeholder="Player Name"
      />
      <button
        onClick={() => { dispatch({ type: "ADD_PLAYER", name }); setName(""); }}
        className="bg-green-500 p-2 rounded w-40"
      >
        Add
      </button>
    </div>
  );
}