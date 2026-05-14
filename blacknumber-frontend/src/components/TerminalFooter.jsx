import styles from './TerminalFooter.module.css';

export default function TerminalFooter() {
  return (
    <footer className={styles.footer} aria-hidden="true">
      <div className={styles.scan} />
      <div className={styles.inner}>
        <div className={styles.hex}>
          <span>0x4E756D</span>
          <span className={styles.sep}>│</span>
          <span>0x426C6B</span>
          <span className={styles.sep}>│</span>
          <span>SECURE_SESSION</span>
        </div>
        <div className={styles.bar}>
          <div className={styles.tickerTrack}>
            <span className={styles.tickerInner}>
              BLACK_NUMBER · UPLINK_STANDBY · NO_LOG_PERSIST · MEM_ONLY · BLACK_NUMBER · UPLINK_STANDBY · NO_LOG_PERSIST
              · MEM_ONLY ·{' '}
            </span>
            <span className={styles.tickerInner} aria-hidden="true">
              BLACK_NUMBER · UPLINK_STANDBY · NO_LOG_PERSIST · MEM_ONLY · BLACK_NUMBER · UPLINK_STANDBY · NO_LOG_PERSIST
              · MEM_ONLY ·{' '}
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
