import { useEffect, useRef, useState } from 'react';
import { Delete, LockKeyhole, ShieldCheck } from 'lucide-react';
import { unlockPortfolio } from '../lib/unlock';
import type { PortfolioData } from '../data/portfolio';

const keypad = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];

type LockScreenProps = {
  onUnlock: (data: PortfolioData) => void;
};

export function LockScreen({ onUnlock }: LockScreenProps) {
  const [code, setCode] = useState('');
  const [error, setError] = useState(false);
  const [isChecking, setIsChecking] = useState(false);
  const [isUnlocking, setIsUnlocking] = useState(false);
  const attemptIdRef = useRef(0);

  const submitCode = async (nextCode: string) => {
    const attemptId = ++attemptIdRef.current;
    setIsChecking(true);

    const data = await unlockPortfolio(nextCode);

    if (attemptId !== attemptIdRef.current) {
      return;
    }

    setIsChecking(false);

    if (data) {
      setIsUnlocking(true);
      window.setTimeout(() => onUnlock(data), 420);
      return;
    }

    setError(true);
    window.setTimeout(() => {
      if (attemptId !== attemptIdRef.current) {
        return;
      }
      setCode('');
      setError(false);
    }, 520);
  };

  const addDigit = (digit: string) => {
    if (isUnlocking || isChecking || error || code.length >= 4) {
      return;
    }

    const nextCode = `${code}${digit}`;
    setCode(nextCode);

    if (nextCode.length === 4) {
      void submitCode(nextCode);
    }
  };

  const deleteDigit = () => {
    if (isUnlocking || isChecking || error) {
      return;
    }
    setCode((current) => current.slice(0, -1));
  };

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (/^\d$/.test(event.key)) {
        addDigit(event.key);
      }

      if (event.key === 'Backspace') {
        deleteDigit();
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [code, error, isUnlocking, isChecking]);

  const statusText = error
    ? 'Incorrect code. Try again.'
    : isUnlocking
      ? 'Access granted.'
      : isChecking
        ? 'Verifying...'
        : 'Passcode required';

  return (
    <main className="lock-screen" aria-label="Portfolio passcode screen">
      <section
        className={`lock-card ${error ? 'lock-card--error' : ''} ${
          isUnlocking ? 'lock-card--success' : ''
        }`}
      >
        <div className="lock-card__halo" aria-hidden="true" />
        <div className="lock-card__icon">
          {isUnlocking ? <ShieldCheck size={30} /> : <LockKeyhole size={30} />}
        </div>

        <p className="eyebrow">Private portfolio</p>
        <h1>Enter access code</h1>
        <p className="lock-card__copy">
          Use the 4-digit passcode to view Heramb's portfolio.
        </p>

        <div className="passcode-dots" aria-label={`${code.length} of 4 digits entered`}>
          {Array.from({ length: 4 }).map((_, index) => (
            <span key={index} className={index < code.length ? 'is-filled' : ''} />
          ))}
        </div>

        <p className="lock-card__status" aria-live="polite">
          {statusText}
        </p>

        <div className="keypad" aria-label="Numeric keypad">
          {keypad.slice(0, 9).map((digit) => (
            <button
              type="button"
              key={digit}
              onClick={() => addDigit(digit)}
              aria-label={`Enter ${digit}`}
            >
              {digit}
            </button>
          ))}
          <span aria-hidden="true" />
          <button type="button" onClick={() => addDigit('0')} aria-label="Enter 0">
            0
          </button>
          <button
            type="button"
            onClick={deleteDigit}
            aria-label="Delete last digit"
            className="keypad__icon"
          >
            <Delete size={22} />
          </button>
        </div>
      </section>
    </main>
  );
}
