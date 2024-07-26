import styles from '../styles/Instructions.module.css';
import Link from 'next/link';
import '@fortawesome/fontawesome-svg-core/styles.css'; // Import the Font Awesome styles
import { config } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Image from 'next/image';
import { faQuestion, faKeyboard, faTimes, faUserShield, faLightbulb, faTrophy } from '@fortawesome/free-solid-svg-icons';

config.autoAddCss = false; // Prevent Font Awesome from adding its CSS since we are doing it manually

export default function Instructions() {
  return (
    <div className={`animate__animated animate__fadeIn ${styles.container}`}>
      <h1 className={styles.instructionsHeading}>INSTRUCTIONS</h1>
      <div className={styles.instructionsText}>
        <div className={styles.instructionCard}>
          <FontAwesomeIcon icon={faQuestion} className='text-3xl text-[#ffd700] w-[10%] mr-3' />
          <p>Guess the word based on the provided meaning.</p>
        </div>
        <div className={styles.instructionCard}>
          <FontAwesomeIcon icon={faKeyboard}  className='text-3xl text-[#ffd700] w-[10%] mr-3' />
          <p>Use the on-screen keyboard (on phone) / with keyboard (on PC) to select letters.</p>
        </div>
        <div className={styles.instructionCard}>
          <FontAwesomeIcon icon={faTimes} className='text-3xl text-[#ffd700] w-[10%] mr-3'/>
          <p>Don&apos;t type the same letter twice. Once a letter is used, it will be marked.</p>
        </div>
        <div className={styles.instructionCard}>
          <FontAwesomeIcon icon={faUserShield}className='text-3xl text-[#ffd700] w-[10%] mr-3' />
          <p>Save the man by guessing the correct word before running out of attempts!</p>
        </div>
        <div className={styles.instructionCard}>
          <FontAwesomeIcon icon={faLightbulb} className='text-3xl text-[#ffd700] w-[10%] mr-3'/>
          <p>Use the hint button to reveal one letter of the correct word. You can use this once per word.</p>
        </div>
        <div className={styles.instructionCard}>
          <FontAwesomeIcon icon={faTrophy} className='text-3xl text-[#ffd700] w-[10%] mr-3'/>
          <p>Try to keep the streak counter increasing by guessing words correctly in each round!</p>
        </div>
      </div>
      <Link href="/">
          <button className={styles.homeBtn}>
            <span className={styles.buttonText}>Back</span>
            <Image 
              src="/btnload.gif" 
              alt="Loading" 
              width={45} 
              height={45} 
              className={styles.loadingGif}
            />
          </button>
        </Link>
    </div>
  );
}
