export default function App() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Dela+Gothic+One&display=swap');
        
        * { box-sizing: border-box; margin: 0; padding: 0; }
        
        html, body, #root {
          min-height: 100vh;
          background: #000;
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
        
        .app {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 5rem 1rem 2rem;
          background: 
            radial-gradient(ellipse at 50% 0%, rgba(236, 72, 153, 0.15) 0%, transparent 50%),
            radial-gradient(ellipse at 0% 100%, rgba(139, 92, 246, 0.1) 0%, transparent 40%),
            radial-gradient(ellipse at 100% 100%, rgba(59, 130, 246, 0.1) 0%, transparent 40%),
            #050505;
        }
        
        .image-container {
          position: relative;
          margin-bottom: 2rem;
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
          max-width: min(320px, 70vw);
          height: auto;
          border-radius: 16px;
          display: block;
          box-shadow: 
            0 0 60px rgba(236, 72, 153, 0.3),
            0 30px 60px rgba(0, 0, 0, 0.5);
        }
        
        .copy {
          text-align: center;
          margin-bottom: 2rem;
        }
        
        .headline {
          font-family: 'Dela Gothic One', Impact, sans-serif;
          font-size: clamp(1.5rem, 5vw, 2.5rem);
          text-transform: uppercase;
          line-height: 1.3;
          margin-bottom: 0.75rem;
        }
        
        .headline-1 {
          color: #f9a8d4;
          display: block;
        }
        
        .headline-2 {
          color: #c4b5fd;
          display: block;
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
          color: #fff;
          text-decoration: none;
          background: linear-gradient(90deg, #f9a8d4, #c4b5fd);
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
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
      `}</style>
      
      <div className="app">
        <nav className="navbar">
          <a href="/" className="logo">Kittens For Clout</a>
          <a href="#" className="shop-button">Shop</a>
        </nav>
        
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
          href="https://www.petfinder.com/cat-adoption/" 
          target="_blank" 
          rel="noopener noreferrer"
          className="cta-button"
        >
          <span className="emoji">🐱</span>
          Adopt a Cat Today
        </a>
      </div>
    </>
  )
}
