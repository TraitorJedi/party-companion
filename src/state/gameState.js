export const initialGameState = {
  phase: "setup",
  targetScore: 4,
  players: [],
  currentReaderIdx: null,
  readerNumber: null,
  guesses: [],
  scores: {},
  tiebreakerPlayers: [],
  roundType: "normal"
};

export function gameReducer(state, action) {
  switch (action.type) {
    case "SET_TARGET":
      return { ...state, targetScore: action.targetScore, phase: "nameEntry" };
    case "ADD_PLAYER":
      if (!action.name.trim()) return state;
      if (state.players.includes(action.name)) return state;
      return {
        ...state,
        players: [...state.players, action.name],
        scores: { ...state.scores, [action.name]: 0 }
      };
    case "REORDER_PLAYERS":
      return { ...state, players: action.players };
    case "START_ROUND": {
      // First round: pick a random reader
      // Subsequent calls to START_ROUND (if any) just preserve the current reader
      const startIdx =
        state.currentReaderIdx === null
          ? Math.floor(Math.random() * state.players.length)
          : state.currentReaderIdx;
      return {
        ...state,
        currentReaderIdx: startIdx,
        phase: "readerInput"
      };
    }
    case "SET_READER_NUMBER":
      return { ...state, readerNumber: action.readerNumber, guesses: [], phase: "guessing" };
    case "ADD_GUESS":
      return { ...state, guesses: [...state.guesses, action.guess] };
    case "SHOW_RESULTS": {
      // Perform scoring immediately here
      const diffs = state.guesses.map(g => ({
        name: g.name,
        diff: Math.abs(g.value - state.readerNumber)
      }));
      diffs.sort((a, b) => a.diff - b.diff);
      const closest = diffs[0].diff;
      const tied = diffs.filter(d => d.diff === closest).map(d => d.name);

      if (tied.length === 1) {
        // Single winner
        const updatedScores = { ...state.scores };
        updatedScores[tied[0]] += 1;
        const hasWon = updatedScores[tied[0]] >= state.targetScore;
        return hasWon
          ? { ...state, scores: updatedScores, phase: "victory" }
          : { ...state, scores: updatedScores, phase: "nextRound" };
      } else {
        // Tie → sudden death
        return {
          ...state,
          tiebreakerPlayers: tied,
          roundType: "tiebreaker",
          phase: "nextRound"
        };
      }
    }
      
    case "NEXT_ROUND": {
       // Move to the next reader in the list
      const nextIdx = (state.currentReaderIdx + 1) % state.players.length;
      return {
        ...state,
        currentReaderIdx: nextIdx,
        readerNumber: null,
        guesses: [],
        phase: "readerInput"
      };
    }
    case "RESET_TO_NORMAL":
      return { ...state, roundType: "normal", tiebreakerPlayers: [] };
    default:
      return state;
      //Ignore comment
  }
}