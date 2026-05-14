import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useReducer,
} from 'react';
import * as gameApi from '../api/gameApi.js';
import { gameReducer, initialState } from './GameReducer.js';

const GameContext = createContext(null);

function parseApiError(err) {
  const data = err?.response?.data;
  if (data && typeof data.error === 'string') {
    return { message: data.error, fatalSession: data.error.includes('Session not found') };
  }
  if (err?.code === 'ERR_NETWORK' || !err?.response) {
    return { message: 'Connection error. Please try again.', fatalSession: false };
  }
  return { message: 'Something went wrong. Please try again.', fatalSession: false };
}

export function GameProvider({ children }) {
  const [state, dispatch] = useReducer(gameReducer, initialState);

  const startGame = useCallback(async (mode) => {
    dispatch({ type: 'CLEAR_ERROR' });
    try {
      const data = await gameApi.startGame(mode);
      dispatch({
        type: 'START_GAME',
        payload: {
          sessionId: data.sessionId,
          mode: data.mode,
          maxAttempts: data.maxAttempts,
        },
      });
    } catch (err) {
      dispatch({ type: 'SET_ERROR', payload: parseApiError(err) });
    }
  }, []);

  const submitGuess = useCallback(async (guess) => {
    if (!state.sessionId) return undefined;
    dispatch({ type: 'CLEAR_ERROR' });
    try {
      const data = await gameApi.submitGuess(state.sessionId, guess);
      dispatch({ type: 'SUBMIT_GUESS_SUCCESS', payload: data });
      return data;
    } catch (err) {
      dispatch({ type: 'SET_ERROR', payload: parseApiError(err) });
      return undefined;
    }
  }, [state.sessionId]);

  const toggleDigitMark = useCallback((digit) => {
    dispatch({ type: 'TOGGLE_DIGIT_MARK', payload: { digit } });
  }, []);

  const clearError = useCallback(() => {
    dispatch({ type: 'CLEAR_ERROR' });
  }, []);

  const resetToHome = useCallback(() => {
    dispatch({ type: 'RESET_GAME' });
  }, []);

  const playAgain = useCallback(async () => {
    if (state.mode == null) return;
    await startGame(state.mode);
  }, [state.mode, startGame]);

  const value = useMemo(
    () => ({
      state,
      dispatch,
      startGame,
      submitGuess,
      toggleDigitMark,
      clearError,
      resetToHome,
      playAgain,
    }),
    [state, startGame, submitGuess, toggleDigitMark, clearError, resetToHome, playAgain]
  );

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
}

export function useGame() {
  const ctx = useContext(GameContext);
  if (!ctx) {
    throw new Error('useGame must be used within GameProvider');
  }
  return ctx;
}
