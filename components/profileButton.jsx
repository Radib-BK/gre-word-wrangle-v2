'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import '@fortawesome/fontawesome-svg-core/styles.css';
import { config } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';
import gsap from 'gsap';

config.autoAddCss = false;

const ProfileButton = () => {
  const sliderRef = useRef(null);
  const buttonRef = useRef(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = () => {
    setIsLoading(true);
  };

  useEffect(() => {
    const slider = sliderRef.current;
    const button = buttonRef.current;

    if (slider && button) {
      gsap.set(slider, { x: '-100%', opacity: 0 });

      const tl = gsap.timeline();

      tl.to(slider, {
        x: '10%',
        opacity: 1,
        duration: 0.6,
        ease: 'power2.out'
      })
      .to(slider, {
        x: '-100%',
        opacity: 0,
        duration: 0.5,
        ease: 'power2.in',
        delay: 3
      });
    }
  }, []);

  return (
    <div className="relative">
      <div className="absolute top-8 right-6 flex items-center">
        <div
          ref={sliderRef}
          className="absolute right-full bg-white text-purple-700 py-1 px-10 rounded-l-full whitespace-nowrap z-0"
        >
          <p className='text-[16px] md:text-[18.5px] font-roboto font-semibold'>Profile</p>
        </div>
        <Link href="/profile">
          <button
            ref={buttonRef}
            aria-label="profile"
            className="bg-white text-purple-700 rounded-full p-[4px] hover:bg-purple-200 transition-colors duration-300 relative z-10"
            onClick={handleClick}
            disabled={isLoading}
          >
            {isLoading ? (
              <svg width="25" height="25" viewBox="0 0 50 50">
              <circle cx="25" cy="25" r="20" fill="none" stroke="#0000cd" strokeWidth="5" strokeDasharray="31.4 31.4" strokeLinecap="round">
                <animateTransform attributeName="transform" type="rotate" repeatCount="indefinite" dur="0.75s" from="0 25 25" to="360 25 25" />
              </circle>
            </svg>
            ) : (
              <FontAwesomeIcon className="text-6xl" icon={faUserCircle} />
            )}
          </button>
        </Link>
      </div>
    </div>
  );
};

export default ProfileButton;