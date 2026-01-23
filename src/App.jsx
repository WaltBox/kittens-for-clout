import { useState } from 'react'

export default function App() {
  const [currentPage, setCurrentPage] = useState('home')
  
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Dela+Gothic+One&display=swap');
        
        * { box-sizing: border-box; margin: 0; padding: 0; }
        
        html, body, #root {
          min-height: 100vh;
          background: #000;
        }
        
        @media (min-width: 768px) {
          * {
            cursor: url("/cat-cursor.png"), auto;
          }
          
          a, button {
            cursor: url("/cat-cursor.png"), pointer;
          }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-12px); }
        }
        
        @keyframes shimmer {
          0% { background-position: 200% center; }
          100% { background-position: -200% center; }
        }
        
        @keyframes glow {
          0%, 100% { opacity: 0.6; }
          50% { opacity: 1; }
        }
        
        @keyframes countUp {
          0% { transform: translateY(20px); opacity: 0; }
          100% { transform: translateY(0); opacity: 1; }
        }
        
        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }
        
        @keyframes slideIn {
          0% { transform: translateX(-30px); opacity: 0; }
          100% { transform: translateX(0); opacity: 1; }
        }
        
        @keyframes gradientShift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        
        .app {
          background: 
            radial-gradient(ellipse at 50% 0%, rgba(236, 72, 153, 0.15) 0%, transparent 50%),
            radial-gradient(ellipse at 0% 100%, rgba(139, 92, 246, 0.1) 0%, transparent 40%),
            radial-gradient(ellipse at 100% 100%, rgba(59, 130, 246, 0.1) 0%, transparent 40%),
            #050505;
        }
        
        .hero {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 5rem 1rem 2rem;
        }
        
        .image-container {
          position: relative;
          margin-bottom: 1.5rem;
          animation: float 6s ease-in-out infinite;
        }
        
        .image-glow {
          position: absolute;
          inset: -5px;
          background: linear-gradient(135deg, #ec4899, #8b5cf6, #3b82f6, #ec4899);
          background-size: 300% 300%;
          border-radius: 20px;
          animation: shimmer 4s linear infinite;
        }
        
        .main-image {
          position: relative;
          z-index: 1;
          width: 100%;
          max-width: min(260px, 60vw);
          height: auto;
          border-radius: 16px;
          display: block;
          box-shadow: 
            0 0 60px rgba(236, 72, 153, 0.3),
            0 30px 60px rgba(0, 0, 0, 0.5);
        }
        
        .copy {
          text-align: center;
          margin-bottom: 1.25rem;
        }
        
        .headline {
          font-family: 'Dela Gothic One', Impact, sans-serif;
          font-size: clamp(1.4rem, 4vw, 2.2rem);
          text-transform: uppercase;
          line-height: 1.3;
          margin-bottom: 0.75rem;
        }
        
        .headline-1 {
          color: #f9a8d4;
          display: block;
          font-size: 0.7em;
        }
        
        .headline-2 {
          color: #c4b5fd;
          display: block;
          font-size: 1em;
        }
        
        .subtext {
          font-family: system-ui, sans-serif;
          font-size: clamp(0.8rem, 2vw, 1rem);
          color: rgba(255, 255, 255, 0.4);
          letter-spacing: 0.1em;
        }
        
        .cta-button {
          display: inline-flex;
          align-items: center;
          gap: 0.6rem;
          padding: 1rem 2.5rem;
          font-family: 'Dela Gothic One', system-ui, sans-serif;
          font-size: clamp(0.85rem, 2.5vw, 1rem);
          text-transform: uppercase;
          letter-spacing: 0.03em;
          color: #000;
          background: linear-gradient(135deg, #f9a8d4 0%, #e879f9 50%, #c4b5fd 100%);
          background-size: 200% 200%;
          border: none;
          border-radius: 50px;
          cursor: pointer;
          text-decoration: none;
          transition: all 0.3s ease;
          box-shadow: 0 4px 25px rgba(232, 121, 249, 0.4);
          animation: shimmer 4s linear infinite;
        }
        
        .cta-button:hover {
          transform: translateY(-3px) scale(1.03);
          box-shadow: 0 8px 40px rgba(232, 121, 249, 0.6);
        }
        
        .cta-button:active {
          transform: translateY(0) scale(0.98);
        }
        
        .emoji {
          font-size: 1.2em;
        }
        
        .navbar {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1rem 1.5rem;
          background: rgba(0, 0, 0, 0.5);
          backdrop-filter: blur(12px);
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
          z-index: 100;
        }
        
        .logo {
          font-family: 'Dela Gothic One', system-ui, sans-serif;
          font-size: clamp(0.9rem, 3vw, 1.1rem);
          text-transform: uppercase;
          letter-spacing: 0.02em;
          text-decoration: none;
          color: #f472b6;
          background: none;
          border: none;
          cursor: pointer;
        }
        
        .shop-button {
          padding: 0.5rem 1.25rem;
          font-family: 'Dela Gothic One', system-ui, sans-serif;
          font-size: 0.8rem;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          color: #fff;
          background: rgba(255, 255, 255, 0.1);
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 50px;
          text-decoration: none;
          transition: all 0.3s ease;
        }
        
        .shop-button:hover {
          background: rgba(255, 255, 255, 0.2);
          border-color: rgba(255, 255, 255, 0.4);
          transform: translateY(-2px);
        }
        
        /* Stats Section */
        .stats-section {
          padding: 6rem 2rem;
          position: relative;
          overflow: hidden;
          background: 
            radial-gradient(ellipse at 50% 50%, rgba(236, 72, 153, 0.08) 0%, transparent 60%),
            linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(139, 92, 246, 0.05) 50%, rgba(0,0,0,0) 100%);
        }
        
        .stats-section::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(236, 72, 153, 0.5), rgba(139, 92, 246, 0.5), transparent);
        }
        
        .stats-section::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(139, 92, 246, 0.5), rgba(59, 130, 246, 0.5), transparent);
        }
        
        .stats-container {
          max-width: 900px;
          margin: 0 auto;
          text-align: center;
        }
        
        .stats-eyebrow {
          font-family: system-ui, sans-serif;
          font-size: 0.85rem;
          text-transform: uppercase;
          letter-spacing: 0.3em;
          color: rgba(255, 255, 255, 0.5);
          margin-bottom: 1.5rem;
          animation: slideIn 0.8s ease-out both;
        }
        
        .stats-number-wrapper {
          position: relative;
          display: inline-block;
          margin-bottom: 1rem;
        }
        
        .stats-number {
          font-family: 'Dela Gothic One', Impact, sans-serif;
          font-size: clamp(5rem, 20vw, 12rem);
          line-height: 1;
          background: linear-gradient(135deg, #f472b6 0%, #e879f9 25%, #c084fc 50%, #a78bfa 75%, #818cf8 100%);
          background-size: 200% 200%;
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: 
            countUp 1s ease-out both,
            gradientShift 4s ease infinite;
          filter: drop-shadow(0 0 60px rgba(232, 121, 249, 0.4));
        }
        
        .stats-number::after {
          content: '+';
          font-size: 0.5em;
          vertical-align: super;
        }
        
        .stats-glow {
          position: absolute;
          inset: -20%;
          background: radial-gradient(circle, rgba(232, 121, 249, 0.2) 0%, transparent 70%);
          z-index: -1;
          animation: pulse 3s ease-in-out infinite;
        }
        
        .stats-label {
          font-family: 'Dela Gothic One', Impact, sans-serif;
          font-size: clamp(1.2rem, 4vw, 2rem);
          text-transform: uppercase;
          color: #fff;
          margin-bottom: 1rem;
          animation: countUp 1s ease-out 0.2s both;
        }
        
        .stats-sublabel {
          font-family: 'Dela Gothic One', system-ui, sans-serif;
          font-size: clamp(0.9rem, 2.5vw, 1.3rem);
          text-transform: uppercase;
          background: linear-gradient(90deg, #f9a8d4, #c4b5fd);
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          margin-bottom: 2rem;
          animation: countUp 1s ease-out 0.3s both;
        }
        
        .stats-bonus {
          font-family: system-ui, sans-serif;
          font-size: clamp(0.9rem, 2vw, 1.1rem);
          color: rgba(255, 255, 255, 0.5);
          margin-top: 1rem;
          animation: countUp 1s ease-out 0.5s both;
        }
        
        .stats-description {
          font-family: system-ui, sans-serif;
          font-size: clamp(0.9rem, 2vw, 1.1rem);
          color: rgba(255, 255, 255, 0.5);
          max-width: 500px;
          margin: 0 auto 2rem;
          line-height: 1.6;
          animation: countUp 1s ease-out 0.4s both;
        }
        
        .stats-pills {
          display: flex;
          justify-content: center;
          gap: 1rem;
          flex-wrap: wrap;
          animation: countUp 1s ease-out 0.5s both;
        }
        
        .stats-pill {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.6rem 1.2rem;
          font-family: system-ui, sans-serif;
          font-size: 0.85rem;
          color: rgba(255, 255, 255, 0.8);
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 50px;
          transition: all 0.3s ease;
        }
        
        .stats-pill:hover {
          background: rgba(255, 255, 255, 0.1);
          border-color: rgba(236, 72, 153, 0.5);
          transform: translateY(-2px);
        }
        
        .pill-icon {
          font-size: 1.1em;
        }
        
        @media (max-width: 600px) {
          .stats-section {
            padding: 4rem 1.5rem;
          }
          
          .stats-number {
            font-size: clamp(4rem, 25vw, 6rem);
          }
          
          .stats-pills {
            gap: 0.75rem;
          }
          
          .stats-pill {
            padding: 0.5rem 1rem;
            font-size: 0.8rem;
          }
        }
        
        /* Shop Page */
        .shop-page {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 6rem 2rem;
          position: relative;
          overflow: hidden;
        }
        
        .shop-content {
          position: relative;
          z-index: 1;
          text-align: center;
          max-width: 700px;
        }
        
        .shop-title {
          font-family: 'Dela Gothic One', Impact, sans-serif;
          font-size: clamp(2.5rem, 10vw, 5rem);
          text-transform: uppercase;
          line-height: 1.1;
          margin-bottom: 1.5rem;
          background: linear-gradient(135deg, #f472b6 0%, #e879f9 30%, #c084fc 60%, #a78bfa 100%);
          background-size: 200% 200%;
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: gradientShift 4s ease infinite;
        }
        
        .shop-subtitle {
          font-family: 'Dela Gothic One', system-ui, sans-serif;
          font-size: clamp(1rem, 3vw, 1.5rem);
          text-transform: uppercase;
          letter-spacing: 0.2em;
          color: rgba(255, 255, 255, 0.6);
          margin-bottom: 1rem;
        }
        
        .shop-mission {
          font-family: system-ui, sans-serif;
          font-size: clamp(0.8rem, 1.8vw, 0.95rem);
          color: rgba(255, 255, 255, 0.35);
          letter-spacing: 0.05em;
        }
        
        .shop-description {
          font-family: system-ui, sans-serif;
          font-size: clamp(1rem, 2vw, 1.2rem);
          color: rgba(255, 255, 255, 0.5);
          line-height: 1.7;
          margin-bottom: 3rem;
        }
        
        .shop-notify-form {
          display: flex;
          gap: 1rem;
          justify-content: center;
          flex-wrap: wrap;
          margin-bottom: 2rem;
        }
        
        .shop-email-input {
          padding: 1rem 1.5rem;
          font-family: system-ui, sans-serif;
          font-size: 1rem;
          color: #fff;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 50px;
          outline: none;
          min-width: 280px;
          transition: all 0.3s ease;
        }
        
        .shop-email-input::placeholder {
          color: rgba(255, 255, 255, 0.4);
        }
        
        .shop-email-input:focus {
          border-color: rgba(236, 72, 153, 0.6);
          background: rgba(255, 255, 255, 0.08);
          box-shadow: 0 0 20px rgba(236, 72, 153, 0.2);
        }
        
        .shop-notify-btn {
          padding: 1rem 2rem;
          font-family: 'Dela Gothic One', system-ui, sans-serif;
          font-size: 0.9rem;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          color: #000;
          background: linear-gradient(135deg, #f9a8d4 0%, #e879f9 50%, #c4b5fd 100%);
          background-size: 200% 200%;
          border: none;
          border-radius: 50px;
          cursor: pointer;
          transition: all 0.3s ease;
          animation: shimmer 4s linear infinite;
        }
        
        .shop-notify-btn:hover {
          transform: translateY(-3px);
          box-shadow: 0 8px 30px rgba(232, 121, 249, 0.5);
        }
        
        .shop-teaser {
          display: flex;
          justify-content: center;
          gap: 4rem;
          flex-wrap: wrap;
          margin-top: 5rem;
          perspective: 1000px;
        }
        
        .teaser-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          transition: all 0.5s cubic-bezier(0.23, 1, 0.32, 1);
        }
        
        .teaser-item:hover {
          transform: scale(1.08);
        }
        
        .teaser-item:hover .teaser-shirt {
          transform: rotateY(-8deg) rotateX(5deg) translateY(-15px);
        }
        
        .teaser-item:hover .teaser-shirt::before {
          opacity: 1;
        }
        
        .teaser-item:hover .teaser-shirt img {
          filter: drop-shadow(0 30px 50px rgba(236, 72, 153, 0.5)) 
                  drop-shadow(0 0 20px rgba(139, 92, 246, 0.3));
        }
        
        .teaser-item:hover .shirt-gleam {
          opacity: 1;
          left: 150%;
        }
        
        .teaser-item:hover .teaser-name {
          color: rgba(255, 255, 255, 0.9);
          text-shadow: 0 0 20px rgba(236, 72, 153, 0.5);
        }
        
        .teaser-shirt {
          width: 160px;
          height: auto;
          position: relative;
          transition: all 0.5s cubic-bezier(0.23, 1, 0.32, 1);
          transform-style: preserve-3d;
        }
        
        .teaser-shirt::before {
          content: '';
          position: absolute;
          inset: -20px;
          background: radial-gradient(
            ellipse at center,
            rgba(236, 72, 153, 0.2) 0%,
            rgba(139, 92, 246, 0.1) 40%,
            transparent 70%
          );
          opacity: 0;
          transition: opacity 0.5s ease;
          z-index: -1;
          filter: blur(20px);
        }
        
        .teaser-shirt img {
          width: 100%;
          height: auto;
          filter: drop-shadow(0 20px 40px rgba(0, 0, 0, 0.6));
          transition: all 0.5s cubic-bezier(0.23, 1, 0.32, 1);
        }
        
        .shirt-gleam {
          position: absolute;
          top: 0;
          left: -50%;
          width: 30%;
          height: 100%;
          background: linear-gradient(
            90deg,
            transparent,
            rgba(255, 255, 255, 0.4),
            transparent
          );
          transform: skewX(-25deg);
          transition: all 0.8s cubic-bezier(0.23, 1, 0.32, 1);
          opacity: 0;
          pointer-events: none;
        }
        
        .teaser-name {
          font-family: 'Dela Gothic One', system-ui, sans-serif;
          font-size: 0.75rem;
          text-transform: uppercase;
          letter-spacing: 0.15em;
          color: rgba(255, 255, 255, 0.4);
          margin-top: 2rem;
          transition: all 0.4s ease;
        }
        
        .back-link {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          margin-top: 4rem;
          padding: 0.8rem 1.5rem;
          font-family: system-ui, sans-serif;
          font-size: 0.85rem;
          color: rgba(255, 255, 255, 0.4);
          text-decoration: none;
          transition: all 0.3s ease;
          cursor: pointer;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 50px;
        }
        
        .back-link:hover {
          color: rgba(255, 255, 255, 0.8);
          background: rgba(255, 255, 255, 0.06);
          border-color: rgba(255, 255, 255, 0.15);
        }
        
        @media (max-width: 600px) {
          .shop-page {
            padding: 5rem 1.5rem;
          }
          
          .shop-teaser {
            gap: 2rem;
          }
          
          .teaser-shirt {
            width: 110px;
            height: 120px;
          }
        }
        
        /* Footer */
        .footer {
          width: 100%;
          padding: 4rem 2rem 2rem;
          text-align: center;
          background: linear-gradient(to bottom, transparent, rgba(0,0,0,0.5));
          border-top: 1px solid rgba(255, 255, 255, 0.1);
          margin-top: 4rem;
        }
        
        .footer-content {
          max-width: 900px;
          margin: 0 auto;
        }
        
        .footer-image {
          width: 100%;
          max-width: 500px;
          height: auto;
          border-radius: 16px;
          margin: 0 auto 2rem;
          display: block;
          opacity: 0.95;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.7);
        }
        
        .footer-title {
          font-family: 'Dela Gothic One', system-ui, sans-serif;
          font-size: clamp(1.2rem, 3vw, 1.5rem);
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: #c4b5fd;
          margin-bottom: 1.5rem;
        }
        
        .footer-links {
          display: flex;
          justify-content: center;
          gap: 2rem;
          margin-bottom: 2rem;
          flex-wrap: wrap;
        }
        
        .footer-link {
          font-family: system-ui, sans-serif;
          font-size: 0.9rem;
          color: rgba(255, 255, 255, 0.6);
          text-decoration: none;
          transition: color 0.3s ease;
        }
        
        .footer-link:hover {
          color: #f9a8d4;
        }
        
        .footer-copyright {
          font-family: system-ui, sans-serif;
          font-size: 0.75rem;
          color: rgba(255, 255, 255, 0.4);
          margin-top: 1.5rem;
          padding-top: 1.5rem;
          border-top: 1px solid rgba(255, 255, 255, 0.1);
        }
        
        /* Mobile: No animation */
        @media (max-width: 600px) {
          .image-container {
            margin-bottom: 1.5rem;
            animation: none;
          }
          
          .main-image {
            max-width: min(280px, 80vw);
          }
          
          .copy {
            margin-bottom: 1.5rem;
          }
          
          .headline {
            font-size: clamp(1.3rem, 7vw, 2rem);
          }
          
          .footer {
            padding: 3rem 1.5rem 1.5rem;
            margin-top: 2rem;
          }
          
          .footer-image {
            max-width: 100%;
            margin-bottom: 1.5rem;
          }
          
          .footer-links {
            gap: 1.5rem;
            font-size: 0.85rem;
          }
          
          .footer-title {
            font-size: clamp(1rem, 4vw, 1.2rem);
            margin-bottom: 1rem;
          }
        }
      `}</style>
      
      <div className="app">
        <nav className="navbar">
          <button onClick={() => setCurrentPage('home')} className="logo" style={{ background: 'none', border: 'none', cursor: 'pointer' }}>Kittens For Clout</button>
          <button onClick={() => setCurrentPage('shop')} className="shop-button" style={{ cursor: 'pointer' }}>Shop</button>
        </nav>
        
        {currentPage === 'home' ? (
          <>
        <section className="hero">
          <div className="image-container">
            <div className="image-glow" />
            <img 
              src="/walt-kitty.png" 
              alt="Guy in I Love Kitties hoodie surrounded by adoring girls" 
              className="main-image"
            />
          </div>
          
          <div className="copy">
            <h1 className="headline">
              <span className="headline-1">Girls love cats.</span>
              <span className="headline-2">Girls love guys that love cats.</span>
            </h1>
            <p className="subtext">It's science.</p>
          </div>
          
          <a 
            href="https://www.petfinder.com/search/cats-for-adoption/us/tx/dallas/?age=Baby&distance=25" 
            target="_blank" 
            rel="noopener noreferrer"
            className="cta-button"
          >
           Get a cat today
          </a>
        </section>
        
        <section className="stats-section">
          <div className="stats-container">
            <p className="stats-eyebrow">The numbers don't lie</p>
            <div className="stats-number-wrapper">
              <div className="stats-glow" />
              <span className="stats-number">500%</span>
            </div>
            <h2 className="stats-label">Increase in Dating App Likes</h2>
            <p className="stats-sublabel">When theres a cute little kitty cat in your profile</p>
            
            <p className="stats-bonus">+ 100% chance to pull out of your league</p>
          </div>
        </section>
        
        <footer className="footer">
          <div className="footer-content">
            <img 
              src="/adam-thingy.png" 
              alt="The Creation of Clout - Divine cat bestowing clout upon man" 
              className="footer-image"
            />
            <h2 className="footer-title">The Divine Truth</h2>
            <nav className="footer-links">
              <button onClick={() => setCurrentPage('home')} className="footer-link" style={{ background: 'none', border: 'none', cursor: 'pointer' }}>Home</button>
              <button onClick={() => setCurrentPage('shop')} className="footer-link" style={{ background: 'none', border: 'none', cursor: 'pointer' }}>Shop</button>
              <a href="https://www.petfinder.com/search/cats-for-adoption/" target="_blank" rel="noopener noreferrer" className="footer-link">Adopt a Cat</a>
              <button className="footer-link" style={{ background: 'none', border: 'none', cursor: 'pointer' }}>About</button>
            </nav>
            <p className="footer-copyright">
              © 2026 Kittens For Clout. All clout reserved.
            </p>
          </div>
        </footer>
          </>
        ) : (
          <section className="shop-page">
            <div className="shop-content">
              <h1 className="shop-title">Coming Soon</h1>
              <p className="shop-subtitle">The drip is loading</p>
              <p className="shop-mission">100% of profits help kittens find new homes</p>
              
              <div className="shop-teaser">
                <div className="teaser-item">
                  <div className="teaser-shirt">
                    <img src="/shirt.png" alt="Kitty Lover Tee" />
                    <div className="shirt-gleam" />
                  </div>
                  <span className="teaser-name">Kitty Lover</span>
                </div>
                <div className="teaser-item">
                  <div className="teaser-shirt">
                    <img src="/shirt.png" alt="Clout Cat Tee" />
                    <div className="shirt-gleam" />
                  </div>
                  <span className="teaser-name">Clout Cat</span>
                </div>
                <div className="teaser-item">
                  <div className="teaser-shirt">
                    <img src="/shirt.png" alt="Cat Dad Tee" />
                    <div className="shirt-gleam" />
                  </div>
                  <span className="teaser-name">Cat Dad</span>
                </div>
              </div>
              
              <button onClick={() => setCurrentPage('home')} className="back-link">
                ← Back
              </button>
            </div>
          </section>
        )}
      </div>
    </>
  )
}
