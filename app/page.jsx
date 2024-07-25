// pages/index.jsx
import styles from './styles/Home.module.css';
import Link from 'next/link';
import Typed from '@/components/Typed';
import BackgroundMusic from '@/components/BackGroundMusic';
import AccountCircle from '@mui/icons-material/AccountBox';

export default function Home() {
  return (
    <div className={styles.container}>
      <BackgroundMusic />
      <div className="absolute top-6 right-6">
        <Link href="/profile">
          <button
            aria-label="profile"
            className="bg-purple-100 text-purple-600 rounded-2xl p-0.5 hover:bg-gray-300 hover:text-purple-800"
          >
            <AccountCircle className="text-7xl md:text-7xl" />
          </button>
        </Link>
      </div>
      <h1 id="mainHead" className="animate__animated animate__bounceInDown">
        GRE Word Wrangle
      </h1>
      <Typed />
      <div className={styles.buttons}>
        <Link href="/game">
          <button className={styles.homeBtn}>Play Game</button>
        </Link>
        <Link href="/instructions">
          <button className={styles.homeBtn}>Instructions</button>
        </Link>
      </div>
    </div>
  );
}
