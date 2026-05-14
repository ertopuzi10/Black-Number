import AttemptHistory from './AttemptHistory.jsx';
import DigitTracker from './DigitTracker.jsx';
import GameEndDock from './GameEndDock.jsx';
import GuessInput from './GuessInput.jsx';
import styles from './GameScreen.module.css';

export default function GameScreen({ state }) {
  return (
    <div className={styles.wrap}>
      <header className={styles.header}>
        <h1 className={styles.brand}>BLACK NUMBER</h1>
        <span className={styles.modeTag}>
          MODE {state.mode} · MAX {state.maxAttempts} ATTEMPTS
        </span>
      </header>
      <div className={styles.layout}>
        <div className={styles.mainCol}>
          <GuessInput />
          <AttemptHistory history={state.history} />
        </div>
        <aside className={styles.sideCol}>
          <DigitTracker />
        </aside>
      </div>
      <GameEndDock />
    </div>
  );
}
