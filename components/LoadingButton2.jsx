'use client'

import { useState } from 'react';
import Link from 'next/link';
import styles from '../app/styles/Profile.module.css';

export default function LoadingButton({ href, text }) {
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = () => {
    setIsLoading(true);
  };

  return (
    <Link href={href}>
      <button className={styles.homeBtn} onClick={handleClick} disabled={isLoading}>
      {isLoading ? (
        <div className={styles.loadingSpinner}>
          <svg width="26" height="26" viewBox="0 0 50 50">
            <circle cx="26" cy="26" r="21" fill="none" stroke="#0000cd" strokeWidth="5" strokeDasharray="31.4 31.4" strokeLinecap="round">
              <animateTransform attributeName="transform" type="rotate" repeatCount="indefinite" dur="0.75s" from="0 25 25" to="360 25 25" />
            </circle>
          </svg>
        </div>
      ) : (
        <span className={styles.buttonText}>{text}</span>
      )}
      </button>
    </Link>
  );
}