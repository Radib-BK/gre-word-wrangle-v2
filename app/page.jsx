'use client'

import { useState } from 'react';
import styles from './styles/Home.module.css';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import Typed from '@/components/Typed';
import BackgroundMusic from '@/components/BackGroundMusic';
import ProfileButton from '@/components/profileButton';

export default function Home() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState({
    game: false,
    instructions: false
  });

  const handleClick = (route) => {
    setIsLoading({ ...isLoading, [route]: true });
    router.push(`/${route}`);
  };

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
  <button 
    className={styles.homeBtn} 
    onClick={() => handleClick('game')}
    disabled={isLoading.game}
  >
    {isLoading.game ? (
      <Image 
        src="/btnloading.gif" 
        alt="Loading" 
        width={35} 
        height={30} 
        className="mx-auto" // Centers the image horizontally
      />
    ) : (
      'Play Game'
    )}
  </button>
  <button 
    className={styles.homeBtn} 
    onClick={() => handleClick('instructions')}
    disabled={isLoading.instructions}
  >
    {isLoading.instructions ? (
      <Image 
        src="/btnloading.gif" 
        alt="Loading" 
        width={35} 
        height={30}
        className="mx-auto" // Centers the image horizontally
      />
    ) : (
      'Instructions'
    )}
  </button>
</div>
    </div>
  );
}