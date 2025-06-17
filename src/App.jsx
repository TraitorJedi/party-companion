import React, { useState } from "react";
import SetupScreen from "./components/SetupScreen";
import NameEntryScreen from "./components/NameEntryScreen";
import ReaderInputScreen from "./components/ReaderInputScreen";
import GuessScreen from "./components/GuessScreen";
import ResultsScreen from "./components/ResultsScreen";
import VictoryScreen from "./components/VictoryScreen";
import PlayerSidebar from "./components/PlayerSidebar";
import { gameReducer, initialGameState } from "./state/gameState";

export default function App() {
  const [state, setState] = useState(initialGameState);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const dispatch = (action) => setState((prev) => gameReducer(prev, action));

  const withLayout = (Screen) => (
    <div className="flex h-screen overflow-hidden">
      <PlayerSidebar 
        state={state} 
        dispatch={dispatch} 
        open={sidebarOpen} 
        onClose={() => setSidebarOpen(false)} 
      />
      <div className="flex-1 relative">
        <button
          className="absolute top-2 left-2 z-10 p-2 bg-gray-800 text-white rounded md:hidden"
          onClick={() => setSidebarOpen(true)}
        >
          ☰
        </button>
        <div className="flex-1 overflow-auto p-5">
          <Screen state={state} dispatch={dispatch} />
        </div>
      </div>
    </div>
  );

  switch (state.phase) {
    case "setup": return <SetupScreen dispatch={dispatch} />;
    case "nameEntry": return withLayout(NameEntryScreen);
    case "readerInput": return withLayout(ReaderInputScreen);
    case "guessing": return withLayout(GuessScreen);
    case "results": return withLayout(ResultsScreen);
    case "nextRound": return withLayout(ReaderInputScreen);
    case "victory": return withLayout(VictoryScreen);
    default: return <div className="text-white p-10">Unknown phase: {state.phase}</div>;
  }
}