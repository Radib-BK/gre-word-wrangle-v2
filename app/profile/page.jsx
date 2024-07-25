'use client'
import { useEffect, useState } from 'react';
import styles from '../styles/Profile.module.css';
import Link from 'next/link';
import '@fortawesome/fontawesome-svg-core/styles.css'; // Import the Font Awesome styles
import { config } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

config.autoAddCss = false; // Prevent Font Awesome from adding its CSS since we are doing it manually

export default function Profile() {
  const [highestStreak, setHighestStreak] = useState(0);
  const [wrongGuesses, setWrongGuesses] = useState([]);

  useEffect(() => {
    const fetchUserData = async () => {
      const { data } = await axios.get('/api/getUser');
      setHighestStreak(data.highestStreak);
      setWrongGuesses(data.wrongGuesses);
    };

    fetchUserData();
  }, []);

  return (
    <div className={`animate__animated animate__fadeIn ${styles.container}`}>
      <h1 className={styles.instructionsHeading}>PROFILE INFO</h1>

      <div className={styles.streakContainer}>
        <h2>Highest Streak</h2>
        <p className={styles.streak}>{highestStreak}</p>
      </div>

      <div className={styles.tableContainer}>
        <h2>Recent Wrong Guesses</h2>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Word</th>
              <th>Meaning</th>
            </tr>
          </thead>
          <tbody>
            {wrongGuesses.map((guess, index) => (
              <tr key={index}>
                <td>{guess.word}</td>
                <td>{guess.meaning}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Link href="/">
        <button className={styles.homeBtn}>
          <FontAwesomeIcon icon={faHome} /> Back to Home
        </button>
      </Link>
    </div>
  );
}
