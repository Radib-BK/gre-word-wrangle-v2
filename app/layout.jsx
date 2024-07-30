// app/layout.jsx
import './styles/globals.css';
import { useMemo } from 'react';
import BackgroundMusic from '../components/BackGroundMusic';

export const metadata = {
  title: 'GRE Word Wrangle',
  description: 'Enhance Your GRE Preparation with Engaging and Interactive Vocabulary Challenges',
  icons: {
    icon: "/iconshangman.png",
  },
};

export default function RootLayout({ children }) {
  const audioTemplate = useMemo(() => (
    <div>
      <audio id="background-music" loop>
        <source src="/space_bg.mp3" type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>
    </div>
  ), []);

  return (
    <html lang="en">
      <head>
        <meta name="google-site-verification" content="5DQkKboywdSpQDG0GZjs3zTW7BRb6xod4ggdUJuUSrw" />
        <link rel="icon" href="/iconshangman.png" type="image/x-icon" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
        <meta name="description" content="Enhance Your GRE Preparation with Engaging and Interactive Vocabulary Word Challenges" />
        <meta name="keywords" content="GRE, Vocabulary, Word Game, Education, Hangman, Word Puzzles, Test Preparation, Learning Games, GRE Prep, English Vocabulary, Interactive Learning" />
        <meta name="author" content="Radib Bin Kabir" />
        
        {/* Open Graph Meta Tags */}
        <meta property="og:title" content="GRE Word Wrangle" />
        <meta property="og:description" content="Enhance Your GRE Preparation with Engaging and Interactive Vocabulary Word Challenges" />
        <meta property="og:image" content="/coverImg.jpg" />
        <meta property="og:url" content="https://wordwrangle.vercel.app" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="GRE Word Wrangle" />
        
        {/* Additional Open Graph Tags for Better Compatibility */}
        <meta property="og:locale" content="en_US" />
        <meta property="article:author" content="https://www.facebook.com/Radib.bk" />
        <meta property="article:published_time" content="2024-01-01T12:00:00Z" />
        <meta property="article:modified_time" content="2024-01-01T12:00:00Z" />

        {/* Apple Touch Icon and Web App Settings */}
        <link rel="apple-touch-icon" href="/iconshangman.png" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="GRE Word Wrangle" />
        <link rel="apple-touch-startup-image" href="/iconshangman.png" />

        {/* Schema Markup */}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: `
        {
          "@context": "http://schema.org",
          "@type": "WebSite",
          "name": "GRE Word Wrangle",
          "url": "https://wordwrangle.vercel.app",
          "sameAs": [
            "https://www.facebook.com/Radib.bk",
            "https://www.linkedin.com/in/radib-kabir-21683021a/"
          ]
        }
        ` }} />
      </head>
      <body>
        {audioTemplate}
        <BackgroundMusic />
        {children}
        <div className="copyright">
          &copy; Radib Bin Kabir 2024
        </div>
      </body>
    </html>
  );
}
