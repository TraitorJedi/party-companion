import React from "react";

export default function VictoryScreen({ state }) {
  const topEntry = Object.entries(state.scores).sort((a, b) => b[1] - a[1])[0];

  return (
    <div className="min-h-screen bg-green-600 text-white p-10 flex flex-col items-center justify-center gap-4">
      <h1 className="text-3xl font-bold">🎉 {topEntry[0]} Wins! 🎉</h1>
      <h2>Score: {topEntry[1]}</h2>
    </div>
  );
}
