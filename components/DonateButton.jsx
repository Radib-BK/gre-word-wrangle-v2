'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import '@fortawesome/fontawesome-svg-core/styles.css';
import { config } from '@fortawesome/fontawesome-svg-core';
import Image from 'next/image';
import gsap from 'gsap';

config.autoAddCss = false;

const DonateButton = () => {
  const buttonRef = useRef(null);

  useEffect(() => {
    const button = buttonRef.current;

    if (button) {
      gsap.set(button, { x: '-100%', opacity: 0 });

      const tl = gsap.timeline();
      tl.to(button, {
        x: '-100%',
        opacity: 0,
        duration: 0.6,
        ease: 'power2.out'
      })
      .to(button, {
        x: '0%',
        opacity: 1,
        duration: 0.5,
        ease: 'power2.in',
        delay: 3
      });
    }
  }, []);

  return (
    <div className="absolute top-8 left-6 flex items-center">
      <div 
        ref={buttonRef}
        className="relative border border-2 border-purple-500 rounded-full w-[42px] md:w-[48px] flex items-center"
      >
        <Link href="https://radib-bk.lemonsqueezy.com/buy/0d9aa068-2752-4503-96db-51fb3680c68f?discount=0">
          <Image src="/coffee.png" alt="coffee" height={100} width={100} className="object-contain" />
        </Link>
      </div>
    </div>
  );
};

export default DonateButton;
