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
    case "START_ROUND":
      const startIdx = state.currentReaderIdx === null
        ? Math.floor(Math.random() * state.players.length)
        : state.currentReaderIdx;
      return { ...state, currentReaderIdx: startIdx, phase: "readerInput" };
    case "SET_READER_NUMBER":
      return { ...state, readerNumber: action.readerNumber, guesses: [], phase: "guessing" };
    case "ADD_GUESS":
      return { ...state, guesses: [...state.guesses, action.guess] };
    case "SHOW_RESULTS":
      return { ...state, phase: "results" };
    case "PROCESS_RESULTS":
      const diffs = state.guesses.map(g => ({ name: g.name, diff: Math.abs(g.value - state.readerNumber) }));
      diffs.sort((a,b) => a.diff - b.diff);
      const closest = diffs[0].diff;
      const tied = diffs.filter(d => d.diff === closest).map(d => d.name);
      if (tied.length === 1) {
        const updated = { ...state.scores };
        updated[tied[0]] += 1;
        const hasWon = updated[tied[0]] >= state.targetScore;
        return hasWon
          ? { ...state, scores: updated, phase: "victory" }
          : { ...state, scores: updated, phase: "nextRound" };
      } else {
        return { ...state, tiebreakerPlayers: tied, roundType: "tiebreaker", phase: "nextRound" };
      }
    case "NEXT_ROUND":
      const next = (state.currentReaderIdx + 1) % state.players.length;
      return {
        ...state,
        currentReaderIdx: next,
        readerNumber: null,
        guesses: [],
        phase: "readerInput"
      };
    case "RESET_TO_NORMAL":
      return { ...state, roundType: "normal", tiebreakerPlayers: [] };
    default:
      return state;
  }
}