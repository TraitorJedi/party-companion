import React, { useState } from "react";
import SetupScreen from "./components/SetupScreen";
import NameEntryScreen from "./components/NameEntryScreen";
import ReaderInputScreen from "./components/ReaderInputScreen";
import GuessScreen from "./components/GuessScreen";
import ResultsScreen from "./components/ResultsScreen";
import VictoryScreen from "./components/VictoryScreen";
import { gameReducer, initialGameState } from "./state/gameState";

export default function App() {
  const [state, setState] = useState(initialGameState);
  const dispatch = (action) => setState((prev) => gameReducer(prev, action));

  switch (state.phase) {
    case "setup": return <SetupScreen state={state} dispatch={dispatch} />;
    case "nameEntry": return <NameEntryScreen state={state} dispatch={dispatch} />;
    case "readerInput": return <ReaderInputScreen state={state} dispatch={dispatch} />;
    case "guessing": return <GuessScreen state={state} dispatch={dispatch} />;
    case "results": return <ResultsScreen state={state} dispatch={dispatch} />;
    case "victory": return <VictoryScreen state={state} dispatch={dispatch} />;
    default: return <div className="text-white p-10">Unknown phase</div>;
  }
}