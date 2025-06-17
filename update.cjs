// update2.cjs
const { writeFileSync, readFileSync, mkdirSync } = require("fs");
const { join } = require("path");

const ROOT = process.cwd();

// 1. Ensure the components folder exists
mkdirSync(join(ROOT, "src/components"), { recursive: true });

// 2. Overwrite ReaderInputScreen.jsx with ±∞ buttons and validation
writeFileSync(
  join(ROOT, "src/components/ReaderInputScreen.jsx"),
  `import React, { useState } from "react";

export default function ReaderInputScreen({ state, dispatch }) {
  const idx = state.currentReaderIdx;
  if (idx === null || idx < 0 || idx >= state.players.length) {
    return <div className="text-white p-10">No reader selected yet.</div>;
  }

  const readerName = state.players[idx];
  const [value, setValue] = useState("");
  const [override, setOverride] = useState(null); // null | "INF" | "-INF"

  const handleSubmit = () => {
    let num;
    if (override) {
      num = override === "INF" ? Infinity : -Infinity;
    } else {
      const n = Number(value);
      if (isNaN(n)) {
        alert("Please enter a valid number or use ∞/–∞");
        return;
      }
      num = n;
    }
    dispatch({ type: "SET_READER_NUMBER", readerNumber: num });
    setValue("");
    setOverride(null);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-5 flex flex-col gap-4 items-center">
      <h1 className="text-2xl font-bold">{readerName}, enter your secret number:</h1>
      <div className="flex gap-2 items-center">
        <button
          onClick={() => setOverride("-INF")}
          className={\`px-3 py-1 rounded \${override === "-INF" ? "bg-red-600" : "bg-gray-700"}\`}
        >
          –∞
        </button>
        <input
          type="text"
          value={value}
          onChange={e => { setOverride(null); setValue(e.target.value); }}
          className="text-black p-2 rounded w-32 text-center"
          placeholder="Secret"
        />
        <button
          onClick={() => setOverride("INF")}
          className={\`px-3 py-1 rounded \${override === "INF" ? "bg-green-600" : "bg-gray-700"}\`}
        >
          ∞
        </button>
      </div>
      <button onClick={handleSubmit} className="bg-blue-500 p-2 rounded w-40">
        Submit
      </button>
    </div>
  );
}
`
);

// 3. Patch src/App.jsx to handle the "nextRound" phase
const appPath = join(ROOT, "src/App.jsx");
let appContent = readFileSync(appPath, "utf-8");

// Insert a case for nextRound right after results
if (!appContent.includes('case "nextRound"')) {
  appContent = appContent.replace(
    /case "results": return withLayout\(ResultsScreen\);/,
    `case "results": return withLayout(ResultsScreen);
    case "nextRound": return withLayout(ReaderInputScreen);`
  );
  writeFileSync(appPath, appContent);
}

console.log("✅ ReaderInputScreen.jsx updated and App.jsx patched for nextRound.");
