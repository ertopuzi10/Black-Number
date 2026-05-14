import { useGame } from '../context/GameContext.jsx';
import styles from './DigitTracker.module.css';

const layout = [
  ['1', '2', '3'],
  ['4', '5', '6'],
  ['7', '8', '9'],
];

export default function DigitTracker() {
  const { state, toggleDigitMark } = useGame();

  return (
    <section className={styles.panel} aria-label="Digits ruled out of the secret">
      <h2 className={styles.title}>Rule out</h2>
      <p className={styles.hint}>Tap to mark digits you believe are not in the code (red ✕).</p>
      <div className={styles.grid}>
        {layout.map((row) =>
          row.map((d) => (
            <button
              key={d}
              type="button"
              className={`${styles.cell} ${styles.wrapBtn} ${state.markedDigits[d] ? styles.ruledOut : ''}`}
              onClick={() => toggleDigitMark(d)}
              aria-pressed={state.markedDigits[d]}
              aria-label={
                state.markedDigits[d] ? `Digit ${d} marked as not in secret` : `Mark digit ${d} as not in secret`
              }
            >
              {state.markedDigits[d] && <span className={styles.cross}>✕</span>}
              {d}
            </button>
          ))
        )}
        <div className={styles.span3}>
          <button
            type="button"
            className={`${styles.cell} ${styles.wrapBtn} ${styles.zeroBtn} ${state.markedDigits['0'] ? styles.ruledOut : ''}`}
            onClick={() => toggleDigitMark('0')}
            aria-pressed={state.markedDigits['0']}
            aria-label={
              state.markedDigits['0']
                ? 'Digit 0 marked as not in secret'
                : 'Mark digit 0 as not in secret'
            }
          >
            {state.markedDigits['0'] && <span className={styles.cross}>✕</span>}
            0
          </button>
        </div>
      </div>
    </section>
  );
}
