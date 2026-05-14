import { useState } from 'react';
import { useGame } from '../context/GameContext.jsx';
import styles from './HomeScreen.module.css';

export default function HomeScreen() {
  const { startGame, state } = useGame();
  const [mode, setMode] = useState(4);
  const [loading, setLoading] = useState(false);

  async function handleStart() {
    setLoading(true);
    try {
      await startGame(mode);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className={styles.wrap}>
      <h1 className={styles.title}>BLACK NUMBER</h1>
      <p className={styles.sub}>
        Deduce the secret code using only digit and position counts. No duplicates. Limited
        attempts.
      </p>
      <div className={styles.card}>
        <div className={styles.label}>Select mode</div>
        <div className={styles.modeRow}>
          <button
            type="button"
            className={`${styles.modeBtn} ${mode === 4 ? styles.modeBtnActive : ''}`}
            onClick={() => setMode(4)}
          >
            4 Digits
          </button>
          <button
            type="button"
            className={`${styles.modeBtn} ${mode === 5 ? styles.modeBtnActive : ''}`}
            onClick={() => setMode(5)}
          >
            5 Digits
          </button>
        </div>
        <button
          type="button"
          className={styles.startBtn}
          onClick={handleStart}
          disabled={loading}
        >
          {loading ? 'Starting…' : 'Start Game'}
        </button>
        {state.error && state.status === 'IDLE' && (
          <div className={styles.error} role="alert">
            {state.error}
          </div>
        )}
      </div>
    </div>
  );
}
