import styles from './styles/Home.module.css';
import Link from 'next/link';
import Typed from '@/components/Typed';
import BackgroundMusic from '@/components/BackGroundMusic';
import ProfileButton from '@/components/profileButton'; //fix

export default function Home() {
  return (
    <div className={styles.container}>
      <BackgroundMusic />
      <div className="absolute top-8 right-6">
      <ProfileButton />
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
