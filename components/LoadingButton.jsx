'use client'

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from '../app/styles/Home.module.css';

export default function LoadingButton({ href, text }) {
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = () => {
    setIsLoading(true);
  };

  return (
    <Link href={href}>
      <button className={styles.homeBtn} onClick={handleClick} disabled={isLoading}>
        {isLoading ? (
          <Image 
            src="/btnload.gif" 
            alt="Loading" 
            width={25} 
            height={25}
            className='m-auto' 
          />
        ) : (
          <span className={styles.buttonText}>{text}</span>
        )}
      </button>
    </Link>
  );
}