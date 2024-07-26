'use client'
import { useEffect, useState } from 'react';
import styles from '../styles/Profile.module.css';
import Link from 'next/link';
import axios from 'axios';
import Image from 'next/image';

export default function Profile() {
  const [highestStreak, setHighestStreak] = useState(0);
  const [wrongGuesses, setWrongGuesses] = useState([]);
  const [loading, setLoading] = useState(true); // Add loading state

  useEffect(() => {
    const fetchUserData = async () => {
      const userId = localStorage.getItem('userId');
      if (!userId) return;
      try {
        const { data } = await axios.get(`/api/getUser?userId=${userId}`);
        setHighestStreak(data.highestStreak);
        setWrongGuesses(data.wrongGuesses);
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setLoading(false); // Set loading to false once data is fetched
      }
    };

    fetchUserData();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Image src="/loading.gif" alt="Loading..." width={200} height={200} className="h-auto w-auto" />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center animate__animated animate__fadeIn p-4" style={{ fontFamily: "sans-serif" }}>
      <h1 className={styles.instructionsHeading}>PROFILE INFO</h1>

      <div className="bg-white flex rounded-full shadow-lg px-10 py-0.5 mb-6 text-center transform hover:scale-105 transition-all duration-300 md:border-4 border-[3.5px] border-orange-400 animate-pulse-slow">
        <p className="text-[16px] md:text-[18px] pt-[2.5px] md:pt-[5px] font-bold text-gray-700">HIGHEST STREAK </p>
        <p className="text-[20px] md:text-[25px] font-bold text-orange-600 ml-3">{highestStreak}</p>
      </div>

      <div className="bg-purple-50 rounded-lg shadow-lg p-4 min-w-[95%] md:min-w-[85%] lg:min-w-[70%]">
        <h2 className="text-4xl font-semibold text-indigo-900 mb-4 p-4 text-center bg-purple-200">RECENT WRONG GUESSES</h2>
        <table className="min-w-full bg-white border border-gray-100 rounded-lg" style={{ fontFamily: "'Rubik'" }}>
          <thead>
            <tr className="text-gray-900 lg:text-4xl text-[24px]">
              <th className="py-2 px-4 border-b border-gray-200">#</th>
              <th className="py-2 px-4 border-b border-gray-200 text-left">Word</th>
              <th className="py-2 px-4 border-b border-gray-200 text-left">Meaning</th>
            </tr>
          </thead>
          <tbody>
            {wrongGuesses.length === 0 ? (
              <tr className='text-center'>
                <td colSpan="3" className="py-2 px-4 mx-auto text-center">
                  <Image src="/empty.png" alt="No wrong guesses" width={180} height={180} className="mx-auto my-10 bg-white" />
                </td>
              </tr>
            ) : (
              wrongGuesses.map((guess, index) => (
                <tr key={index} className="text-gray-800 lg:text-4xl text-[20px] odd:bg-gray-100 even:bg-white">
                  <td className="py-2 px-4 border-b border-gray-100 text-center">{index + 1}</td>
                  <td className="py-2 px-4 border-b text-blue-900 font-semibold border-gray-100 text-left">{guess.word}</td>
                  <td className="py-2 px-4 border-b border-gray-100 text-left">{guess.meaning}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <Link href="/">
        <button className={styles.homeBtn}>
          Back to Home
        </button>
      </Link>
    </div>
  );
}
