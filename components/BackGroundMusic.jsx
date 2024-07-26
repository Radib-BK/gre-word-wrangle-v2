// components/BackgroundMusic.jsx
'use client'
import { useEffect } from 'react';

const BackgroundMusic = () => {
  useEffect(() => {
    const audioElement = document.getElementById('background-music');
    const unmuteAudio = () => {
      if (audioElement) {
        audioElement.muted = false;
        audioElement.volume = 0.2;
        audioElement.play().catch(err => {
            // console.log('Autoplay prevented:', err);
        });
    }
};

if (audioElement) {
    audioElement.muted = true;
    audioElement.volume = 0.2;
      audioElement.play().catch(err => {
        // console.log('Autoplay prevented:', err);
      });

      document.addEventListener('click', unmuteAudio);
      document.addEventListener('keydown', unmuteAudio);

      return () => {
        document.removeEventListener('click', unmuteAudio);
        document.removeEventListener('keydown', unmuteAudio);
      };
    }
  }, []);

  return null;
};

export default BackgroundMusic;
