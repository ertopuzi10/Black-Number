import styles from './AttemptHistory.module.css';

export default function AttemptHistory({ history }) {
  return (
    <section className={styles.panel} aria-label="Attempt history">
      <h2 className={styles.title}>Terminal log</h2>
      {history.length === 0 ? (
        <p className={styles.empty}>{'> Awaiting first transmission…'}</p>
      ) : (
        <ul className={styles.list}>
          {history.map((row) => (
            <li key={row.attemptIndex} className={styles.row}>
              <span className={styles.idx}>#{row.attemptIndex}</span>
              <span className={styles.guess}>
                Guess: <span className={styles.guessDigits}>{row.guess}</span>
              </span>
              <span className={styles.metaRow}>
                <span>Digits: {row.digitsCorrect}</span>
                <span>Positions: {row.positionsCorrect}</span>
              </span>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
