import React, { useState } from "react";
export default function SetupScreen({ dispatch }) {
  const [target, setTarget] = useState(4);
  return (
    <div className="min-h-screen bg-gray-900 text-white p-5 flex flex-col gap-4 items-center">
      <h1 className="text-2xl font-bold">Set Target Score</h1>
      <input
        type="number"
        value={target}
        onChange={e => setTarget(Math.max(1, +e.target.value))}
        className="text-black p-2 rounded w-32 text-center"
      />
      <button
        onClick={() => dispatch({ type: "SET_TARGET", targetScore: target })}
        className="bg-blue-500 p-2 rounded w-40"
      >
        Next
      </button>
    </div>
  );
}