import { useEffect, useState } from 'react';
import { useGame } from '../context/GameContext.jsx';
import styles from './GuessInput.module.css';

function hasDuplicateDigits(s) {
  return new Set(s).size !== s.length;
}

function validateGuess(raw, mode) {
  const guess = raw.trim();
  if (!guess) {
    return 'Enter a guess before submitting.';
  }
  if (guess.length !== mode) {
    return `Guess must be exactly ${mode} digits.`;
  }
  if (!/^\d+$/.test(guess)) {
    return 'Guess must contain only digits.';
  }
  if (hasDuplicateDigits(guess)) {
    return 'Guess cannot contain duplicate digits.';
  }
  return null;
}

export default function GuessInput() {
  const { state, submitGuess, resetToHome, clearError } = useGame();
  const [value, setValue] = useState('');
  const [localError, setLocalError] = useState(null);
  const [shake, setShake] = useState(false);

  const disabled = state.status === 'WON' || state.status === 'LOST';

  useEffect(() => {
    setValue('');
    setLocalError(null);
  }, [state.sessionId]);

  function triggerShake() {
    setShake(true);
    window.setTimeout(() => setShake(false), 500);
  }

  function onKeyDown(e) {
    const allowed = ['Backspace', 'Delete', 'Tab', 'Escape', 'Enter', 'ArrowLeft', 'ArrowRight'];
    if (allowed.includes(e.key)) return;
    if (e.ctrlKey || e.metaKey) return;
    if (!/^\d$/.test(e.key)) {
      e.preventDefault();
    }
  }

  function onChange(e) {
    const next = e.target.value.replace(/\D/g, '').slice(0, state.mode ?? 0);
    setValue(next);
    setLocalError(null);
    clearError();
  }

  async function onSubmit(e) {
    e.preventDefault();
    const clientErr = validateGuess(value, state.mode);
    if (clientErr) {
      setLocalError(clientErr);
      triggerShake();
      return;
    }
    setLocalError(null);
    const data = await submitGuess(value.trim());
    if (data?.status === 'ACTIVE') {
      triggerShake();
    }
  }

  useEffect(() => {
    if (!state.error) return;
    const msg = state.error.toLowerCase();
    if (msg.includes('duplicate') || msg.includes('exactly') || msg.includes('only numeric')) {
      triggerShake();
    }
  }, [state.error]);

  const displayError = localError || state.error;
  const max = state.maxAttempts ?? 0;
  const left = state.attemptsRemaining ?? max;

  return (
    <form className={styles.wrap} onSubmit={onSubmit}>
      <div className={styles.row}>
        <input
          className={`${styles.input} ${shake ? styles.inputShake : ''}`}
          type="text"
          inputMode="numeric"
          autoComplete="off"
          spellCheck={false}
          maxLength={state.mode ?? 5}
          placeholder={'·'.repeat(state.mode ?? 4)}
          value={value}
          onChange={onChange}
          onKeyDown={onKeyDown}
          disabled={disabled}
          aria-label="Guess input"
        />
        <button type="submit" className={styles.submit} disabled={disabled}>
          Submit
        </button>
      </div>
      <div className={styles.meta}>
        Attempts remaining:{' '}
        <strong>
          {left} / {max}
        </strong>
      </div>
      {displayError && (
        <div className={styles.error} role="alert">
          {displayError}
        </div>
      )}
      {state.fatalSessionError && (
        <div className={styles.actions}>
          <button type="button" className={styles.newGameBtn} onClick={resetToHome}>
            Start New Game
          </button>
        </div>
      )}
    </form>
  );
}
