import React, { useState } from "react";
export default function ReaderInputScreen({ state, dispatch }) {
  const [readerNumber, setReaderNumber] = useState("");
  const reader = state.players[state.currentPlayerIndex].name;
  return (
    <div className="min-h-screen bg-gray-900 text-white p-5 flex flex-col gap-4 items-center">
      <h1 className="text-2xl font-bold">{reader}, enter your secret number:</h1>
      <input type="number" value={readerNumber} onChange={e => setReaderNumber(e.target.value)}
        className="text-black p-2 rounded w-48 text-center" placeholder="Secret Number" />
      <button onClick={() => dispatch({ type: "SET_READER_NUMBER", readerNumber: +readerNumber })}
        className="bg-blue-500 p-2 rounded">Submit</button>
    </div>
  );
}