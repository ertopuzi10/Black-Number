import { useState } from 'react';
import { useGame } from '../context/GameContext.jsx';
import styles from './GameEndDock.module.css';

export default function GameEndDock() {
  const { state, playAgain, resetToHome } = useGame();
  const [busy, setBusy] = useState(false);
  const won = state.status === 'WON';
  const attemptsUsed = state.history.length;
  const secret = state.revealedSecret ?? '—';

  if (state.status !== 'WON' && state.status !== 'LOST') {
    return null;
  }

  async function handlePlayAgain() {
    setBusy(true);
    try {
      await playAgain();
    } finally {
      setBusy(false);
    }
  }

  return (
    <section
      className={`${styles.dock} ${won ? styles.dockWin : styles.dockLoss}`}
      aria-label="Game result"
    >
      <div className={styles.row}>
        <div className={styles.summary}>
          {won ? (
            <>
              <span className={styles.badge}>ACCESS GRANTED</span>
              <span className={styles.detail}>
                Cracked in <strong>{attemptsUsed}</strong> {attemptsUsed === 1 ? 'attempt' : 'attempts'} · Code{' '}
                <span className={styles.secret}>{secret}</span>
              </span>
            </>
          ) : (
            <>
              <span className={`${styles.badge} ${styles.badgeLoss}`}>LOCKOUT</span>
              <span className={styles.detail}>
                Sequence was <span className={styles.secret}>{secret}</span>
              </span>
            </>
          )}
        </div>
        <div className={styles.actions}>
          {state.error && <span className={styles.inlineErr}>{state.error}</span>}
          <button type="button" className={styles.primary} onClick={handlePlayAgain} disabled={busy}>
            {busy ? 'Starting…' : 'Play Again'}
          </button>
          <button type="button" className={styles.secondary} onClick={resetToHome}>
            Change Mode
          </button>
        </div>
      </div>
    </section>
  );
}
