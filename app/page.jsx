import styles from './styles/Home.module.css';
import Typed from '@/components/Typed';
import BackgroundMusic from '@/components/BackGroundMusic';
import ProfileButton from '@/components/profileButton';
import LoadingButton from '@/components/LoadingButton';

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
        <LoadingButton href="/game" text="Play Game" />
        <LoadingButton href="/instructions" text="Instructions" />
      </div>
    </div>
  );
}