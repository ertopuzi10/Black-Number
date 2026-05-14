export function createMarkedDigits() {
  return Object.fromEntries(Array.from({ length: 10 }, (_, i) => [String(i), false]));
}

export const initialState = {
  sessionId: null,
  mode: null,
  maxAttempts: null,
  attemptsRemaining: null,
  status: 'IDLE',
  history: [],
  markedDigits: createMarkedDigits(),
  error: null,
  fatalSessionError: false,
  revealedSecret: null,
};

export function gameReducer(state, action) {
  switch (action.type) {
    case 'START_GAME': {
      const { sessionId, mode, maxAttempts } = action.payload;
      return {
        ...initialState,
        sessionId,
        mode,
        maxAttempts,
        attemptsRemaining: maxAttempts,
        status: 'ACTIVE',
        markedDigits: createMarkedDigits(),
        error: null,
        fatalSessionError: false,
        revealedSecret: null,
      };
    }
    case 'SUBMIT_GUESS_SUCCESS': {
      const p = action.payload;
      const record = {
        attemptIndex: p.attemptIndex,
        guess: p.guess,
        digitsCorrect: p.digitsCorrect,
        positionsCorrect: p.positionsCorrect,
      };
      const nextHistory = [record, ...state.history];
      const nextStatus = p.status;
      return {
        ...state,
        attemptsRemaining: p.attemptsRemaining,
        status: nextStatus,
        history: nextHistory,
        error: null,
        fatalSessionError: false,
        revealedSecret:
          nextStatus === 'WON' || nextStatus === 'LOST' ? p.secretNumber ?? null : null,
      };
    }
    case 'SET_ERROR':
      return {
        ...state,
        error: action.payload.message,
        fatalSessionError: Boolean(action.payload.fatalSession),
      };
    case 'CLEAR_ERROR':
      return { ...state, error: null, fatalSessionError: false };
    case 'TOGGLE_DIGIT_MARK': {
      const d = action.payload.digit;
      return {
        ...state,
        markedDigits: {
          ...state.markedDigits,
          [d]: !state.markedDigits[d],
        },
      };
    }
    case 'RESET_GAME':
      return { ...initialState };
    case 'UPDATE_HISTORY':
      return {
        ...state,
        history: action.payload.attempts,
      };
    default:
      return state;
  }
}
