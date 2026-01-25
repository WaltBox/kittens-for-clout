import { useState } from 'react'

export default function App() {
  const [currentPage, setCurrentPage] = useState('home')
  const [kittenName, setKittenName] = useState('')
  const [kittenHeight, setKittenHeight] = useState('')
  const [kittenMatches, setKittenMatches] = useState('')
  const [isCalculating, setIsCalculating] = useState(false)
  const [result, setResult] = useState(null)
  const [isShort, setIsShort] = useState(false)
  
  // Parse height and check if below 5'5"
  const checkHeight = (heightStr) => {
    setKittenHeight(heightStr)
    const cleanHeight = heightStr.toLowerCase().replace(/[""]/g, "'").trim()
    
    // Only check if the height looks "complete" - must have feet AND inches specified
    // Match patterns like: 5'4, 5'10, 5'4", 5ft4, 5ft 4, 5 ft 4, etc.
    // The key is: we need BOTH a feet number AND an inches number
    const completeHeightMatch = cleanHeight.match(/^(\d+)['\s]*(?:ft)?['\s]*(\d+)['"]?$/)
    
    if (completeHeightMatch) {
      const feet = parseInt(completeHeightMatch[1])
      const inches = parseInt(completeHeightMatch[2])
      
      // Make sure it looks like a real height (feet should be 4-7, inches 0-11)
      if (feet >= 4 && feet <= 7 && inches >= 0 && inches <= 11) {
        const totalInches = (feet * 12) + inches
        setIsShort(totalInches < 65) // 5'5" = 65 inches
        return
      }
    }
    
    // Also check for just inches format like "64" (must be 48-84 range to be valid)
    const justInchesMatch = cleanHeight.match(/^(\d{2})$/)
    if (justInchesMatch) {
      const totalInches = parseInt(justInchesMatch[1])
      if (totalInches >= 48 && totalInches <= 84) {
        setIsShort(totalInches < 65)
        return
      }
    }
    
    setIsShort(false)
  }
  
  const getPersonalResponse = (name, height, matches) => {
    const responses = [
      `${name}, analysis complete. No cat detected. This explains a lot.`,
      `Bro ${name}, at ${height}, you need every advantage you can get. A cat is the advantage.`,
      `${name}, current status: single. Probable cause: no kitten energy.`,
      `Our AI ran your profile. Solid human. Missing companion animal.`,
      `Bro ${name}, ${height} is fine. But fine doesn't pull. Cats pull.`,
      `${name}, women are not confused by you. They're confused why you don't have a cat.`,
      `Analysis result: your vibe is neutral. A kitten would make it elite.`,
      `Bro ${name}, without a cat, girls are guessing. With a cat, they *know*.`,
      `${name}, our model flagged "no pet = no emotional shortcut." Get a cat.`,
      `At ${height}, you need warmth. A kitten provides warmth. This is science.`,
      `Bro ${name}, girls aren't ignoring you. They're waiting for the cat arc.`,
      `${name}, right now you look responsible. A cat would make you lovable.`,
      `Our AI tested two versions of you. The cat version won easily.`,
      `Bro ${name}, a kitten would do more for your dating life than a bio rewrite.`,
      `${name}, no cat means women assume you don't own cozy furniture.`,
      `Analysis shows potential, ${name}. Cat would unlock it.`,
      `Bro ${name}, ${height} plus a kitten is a dangerous combo. Use it.`,
      `${name}, girls trust men who keep small animals alive. You need proof.`,
      `Right now ${name}, women see "maybe." A cat turns it into "wait."`,
      `Bro ${name}, the cat is the difference between "seems fine" and "I like him."`,
      `${name}, our AI flagged "no kitten presence." This is holding you back.`,
      `At ${height}, you're not intimidating. You're just missing a cat.`,
      `Bro ${name}, women want cozy. You are not cozy yet.`,
      `${name}, adding a cat would immediately raise your trust score.`,
      `Our model shows girls asking about pets before asking about jobs. Act accordingly.`,
      `Bro ${name}, no cat means your profile ends too soon.`,
      `${name}, women imagine future pets faster than future dates. Fix that.`,
      `At ${height}, personality matters. Cats are personality multipliers.`,
      `Bro ${name}, the kitten would be your best wingman and you know it.`,
      `${name}, right now girls are scrolling calmly. A cat would disrupt that.`,
      `Analysis complete: you're one fluffy decision away from better outcomes.`,
      `Bro ${name}, women trust men with cats more than men with opinions.`,
      `${name}, no cat = no "aww" moment. You need an "aww" moment.`,
      `Our AI predicts increased replies immediately after cat acquisition.`,
      `Bro ${name}, cats communicate softness. Softness is in.`,
      `${name}, ${height} is irrelevant once a kitten enters the equation.`,
      `Right now ${name}, girls don't know what dating you feels like. A cat shows them.`,
      `Bro ${name}, the kitten would answer questions you don't even get asked.`,
      `${name}, our model labeled your situation as "fixable with cat."`,
      `At ${height}, vibes beat stats. Cats are pure vibes.`,
      `Bro ${name}, women want proof you're safe. A cat is proof.`,
      `${name}, no kitten means you're relying on words. Bad strategy.`,
      `Our AI suggests a cat as a low-effort, high-return upgrade.`,
      `Bro ${name}, the kitten would make you feel familiar in a good way.`,
      `${name}, women trust cat guys faster. This is not up for debate.`,
      `Final verdict: you don't need a rebrand. You need a cat.`,
    ]
    return responses[Math.floor(Math.random() * responses.length)]
  }
  
  const calculateKitten = () => {
    if (!kittenName || !kittenHeight || !kittenMatches) return
    setIsCalculating(true)
    setResult(null)
    
    setTimeout(() => {
      const currentMatches = parseInt(kittenMatches) || 5
      const multiplier = (Math.random() * 3 + 4).toFixed(1) // 4x to 7x
      const projectedMatches = Math.round(currentMatches * parseFloat(multiplier))
      const personalReason = getPersonalResponse(kittenName, kittenHeight, currentMatches)
      
      setResult({ 
        name: kittenName,
        currentMatches,
        projectedMatches,
        multiplier,
        reason: personalReason
      })
      setIsCalculating(false)
    }, 2500)
  }
  
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Dela+Gothic+One&family=JetBrains+Mono:wght@400;500&display=swap');
        
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
        
        /* AI Calculator */
        @keyframes borderGlow {
          0%, 100% { opacity: 0.5; }
          50% { opacity: 1; }
        }
        
        @keyframes scanLine {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(100vh); }
        }
        
        @keyframes dataStream {
          0% { background-position: 0% 50%; }
          100% { background-position: 200% 50%; }
        }
        
        @keyframes typewriter {
          from { width: 0; }
          to { width: 100%; }
        }
        
        @keyframes resultSlam {
          0% { transform: scale(0.3); opacity: 0; }
          50% { transform: scale(1.1); }
          100% { transform: scale(1); opacity: 1; }
        }
        
        .calculator-section {
          padding: 6rem 2rem;
          position: relative;
          overflow: hidden;
        }
        
        .calculator-container {
          max-width: 550px;
          margin: 0 auto;
          text-align: center;
          position: relative;
        }
        
        .calculator-card {
          position: relative;
          background: linear-gradient(145deg, rgba(20, 20, 35, 0.9), rgba(10, 10, 20, 0.95));
          border-radius: 24px;
          padding: 3rem 2rem;
          border: 1px solid rgba(244, 114, 182, 0.2);
          box-shadow: 
            0 0 60px rgba(244, 114, 182, 0.1),
            0 0 100px rgba(168, 85, 247, 0.05),
            inset 0 1px 0 rgba(255, 255, 255, 0.05);
          overflow: hidden;
        }
        
        .calculator-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 3px;
          background: linear-gradient(90deg, transparent, #f472b6, #a855f7, #f472b6, transparent);
          animation: borderGlow 2s ease-in-out infinite;
        }
        
        .calculator-card::after {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(transparent 50%, rgba(244, 114, 182, 0.02) 50%);
          background-size: 100% 4px;
          pointer-events: none;
          opacity: 0.3;
        }
        
        .calculator-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          background: rgba(244, 114, 182, 0.1);
          border: 1px solid rgba(244, 114, 182, 0.3);
          padding: 0.4rem 1rem;
          border-radius: 50px;
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.7rem;
          color: #f472b6;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          margin-bottom: 1.5rem;
        }
        
        .badge-dot {
          width: 6px;
          height: 6px;
          background: #4ade80;
          border-radius: 50%;
          animation: pulse 1.5s ease-in-out infinite;
        }
        
        .calculator-title {
          font-family: 'Dela Gothic One', Impact, sans-serif;
          font-size: clamp(1.5rem, 5vw, 2.2rem);
          text-transform: uppercase;
          color: #fff;
          margin-bottom: 0.5rem;
          position: relative;
        }
        
        .calculator-subtitle {
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.8rem;
          color: rgba(255, 255, 255, 0.4);
          margin-bottom: 2rem;
          letter-spacing: 0.05em;
        }
        
        .calculator-form {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
          margin-bottom: 1.5rem;
        }
        
        .input-wrapper {
          position: relative;
        }
        
        .input-label {
          position: absolute;
          left: 1rem;
          top: -0.5rem;
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.6rem;
          color: rgba(244, 114, 182, 0.7);
          background: rgba(15, 15, 25, 1);
          padding: 0 0.5rem;
          text-transform: uppercase;
          letter-spacing: 0.1em;
        }
        
        .calculator-input {
          width: 100%;
          padding: 1.1rem 1.5rem;
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.95rem;
          color: #fff;
          background: rgba(0, 0, 0, 0.3);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 12px;
          outline: none;
          transition: all 0.3s ease;
          box-sizing: border-box;
        }
        
        .calculator-input::placeholder {
          color: rgba(255, 255, 255, 0.25);
          font-family: 'JetBrains Mono', monospace;
        }
        
        .calculator-input:focus {
          border-color: rgba(244, 114, 182, 0.5);
          background: rgba(0, 0, 0, 0.4);
          box-shadow: 0 0 20px rgba(244, 114, 182, 0.1);
        }
        
        .calculator-btn {
          padding: 1.1rem 2rem;
          font-family: 'Dela Gothic One', system-ui, sans-serif;
          font-size: 0.95rem;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: #000;
          background: linear-gradient(135deg, #f472b6, #a855f7);
          border: none;
          border-radius: 12px;
          cursor: pointer;
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
          margin-top: 0.5rem;
        }
        
        .calculator-btn::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent);
          transition: left 0.5s ease;
        }
        
        .calculator-btn:hover::before {
          left: 100%;
        }
        
        .calculator-btn:hover {
          transform: translateY(-2px);
          box-shadow: 
            0 10px 40px rgba(244, 114, 182, 0.4),
            0 0 60px rgba(168, 85, 247, 0.2);
        }
        
        .calculator-btn:disabled {
          opacity: 0.4;
          cursor: not-allowed;
          transform: none;
        }
        
        .calculator-loading {
          padding: 2.5rem 1rem;
          text-align: center;
        }
        
        .loading-text {
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.85rem;
          color: #f472b6;
          margin-bottom: 1.5rem;
          animation: pulse 1s ease-in-out infinite;
        }
        
        .loading-bars {
          display: flex;
          justify-content: center;
          gap: 6px;
        }
        
        .loading-bar {
          width: 4px;
          height: 30px;
          background: linear-gradient(180deg, #f472b6, #a855f7);
          border-radius: 2px;
          animation: loadingBar 0.6s ease-in-out infinite;
        }
        
        .loading-bar:nth-child(2) { animation-delay: 0.08s; }
        .loading-bar:nth-child(3) { animation-delay: 0.16s; }
        .loading-bar:nth-child(4) { animation-delay: 0.24s; }
        .loading-bar:nth-child(5) { animation-delay: 0.32s; }
        .loading-bar:nth-child(6) { animation-delay: 0.4s; }
        .loading-bar:nth-child(7) { animation-delay: 0.48s; }
        
        @keyframes loadingBar {
          0%, 100% { transform: scaleY(0.4); opacity: 0.4; }
          50% { transform: scaleY(1); opacity: 1; }
        }
        
        .calculator-result {
          padding: 2rem;
          background: rgba(0, 0, 0, 0.3);
          border: 1px solid rgba(74, 222, 128, 0.2);
          border-radius: 16px;
          animation: resultSlam 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          position: relative;
        }
        
        .calculator-result::before {
          content: '✓ ANALYSIS COMPLETE';
          display: block;
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.65rem;
          color: #4ade80;
          letter-spacing: 0.15em;
          margin-bottom: 1rem;
          opacity: 0.8;
        }
        
        .result-verdict {
          font-family: 'Dela Gothic One', Impact, sans-serif;
          font-size: clamp(1.4rem, 5vw, 2rem);
          color: #4ade80;
          margin-bottom: 0.25rem;
          text-shadow: 0 0 30px rgba(74, 222, 128, 0.5);
        }
        
        .result-number {
          font-family: 'Dela Gothic One', Impact, sans-serif;
          font-size: clamp(3rem, 12vw, 5rem);
          color: #4ade80;
          line-height: 1;
          text-shadow: 0 0 40px rgba(74, 222, 128, 0.5);
        }
        
        .result-projection {
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.9rem;
          color: rgba(255, 255, 255, 0.5);
          margin-bottom: 1.5rem;
        }
        
        .result-highlight {
          color: #f472b6;
          font-weight: 600;
        }
        
        .result-reason {
          font-family: system-ui, sans-serif;
          font-size: 0.9rem;
          color: rgba(255, 255, 255, 0.6);
          line-height: 1.7;
          margin-bottom: 1.5rem;
          font-style: italic;
        }
        
        .result-actions {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
          align-items: center;
        }
        
        .get-kitty-btn {
          display: inline-block;
          background: linear-gradient(135deg, #f472b6, #a855f7);
          color: white;
          font-family: 'Dela Gothic One', Impact, sans-serif;
          font-size: 1rem;
          padding: 1rem 2rem;
          border-radius: 50px;
          text-decoration: none;
          transition: all 0.3s ease;
          box-shadow: 0 4px 20px rgba(244, 114, 182, 0.4);
        }
        
        .get-kitty-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 30px rgba(244, 114, 182, 0.6);
        }
        
        .reset-btn {
          background: transparent;
          border: 1px solid rgba(255, 255, 255, 0.2);
          color: rgba(255, 255, 255, 0.5);
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.75rem;
          padding: 0.6rem 1.2rem;
          border-radius: 6px;
          cursor: pointer;
          transition: all 0.3s ease;
          text-transform: uppercase;
          letter-spacing: 0.1em;
        }
        
        .reset-btn:hover {
          border-color: rgba(255, 255, 255, 0.4);
          color: rgba(255, 255, 255, 0.8);
        }
        
        .short-king-message {
          text-align: center;
          padding: 2rem 0;
          animation: resultSlam 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }
        
        .short-king-text {
          font-family: 'Dela Gothic One', Impact, sans-serif;
          font-size: clamp(1.3rem, 5vw, 1.8rem);
          color: #f472b6;
          margin-bottom: 0.5rem;
        }
        
        .short-king-signature {
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.85rem;
          color: rgba(255, 255, 255, 0.5);
          font-style: italic;
          margin-bottom: 1.5rem;
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
        
        <section className="calculator-section">
          <div className="calculator-container">
            <div className="calculator-card">
              <div className="calculator-badge">
                <span className="badge-dot"></span>
                AI Model Active
              </div>
              <h2 className="calculator-title">Should You Get a Kitten?</h2>
              <p className="calculator-subtitle">// advanced compatibility analysis v2.4.1</p>
              
              {!isCalculating && !result && (
                <div className="calculator-form">
                  <div className="input-wrapper">
                    <span className="input-label">Identity</span>
                    <input 
                      type="text" 
                      placeholder="Enter your name" 
                      className="calculator-input"
                      value={kittenName}
                      onChange={(e) => setKittenName(e.target.value)}
                    />
                  </div>
                  <div className="input-wrapper">
                    <span className="input-label">Height</span>
                    <input 
                      type="text" 
                      placeholder="e.g. 5'10" 
                      className="calculator-input"
                      value={kittenHeight}
                      onChange={(e) => checkHeight(e.target.value)}
                    />
                  </div>
                  
                  {isShort ? (
                    <div className="short-king-message">
                      <p className="short-king-text">Cmon fam. You NEED a cat.</p>
                      <p className="short-king-signature">— Walt Boxwell</p>
                      <a 
                        href="https://www.petfinder.com/cat-adoption/" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="get-kitty-btn"
                      >
                        Get a Kitty →
                      </a>
                    </div>
                  ) : (
                    <>
                      <div className="input-wrapper">
                        <span className="input-label">Current Stats</span>
                        <input 
                          type="number" 
                          placeholder="Avg matches per week" 
                          className="calculator-input"
                          value={kittenMatches}
                          onChange={(e) => setKittenMatches(e.target.value)}
                        />
                      </div>
                      <button 
                        className="calculator-btn" 
                        onClick={calculateKitten}
                        disabled={!kittenName || !kittenHeight || !kittenMatches}
                      >
                        Run Analysis
                      </button>
                    </>
                  )}
                </div>
              )}
              
              {isCalculating && (
                <div className="calculator-loading">
                  <p className="loading-text">{">"} Processing biometric data...</p>
                  <div className="loading-bars">
                    <div className="loading-bar" />
                    <div className="loading-bar" />
                    <div className="loading-bar" />
                    <div className="loading-bar" />
                    <div className="loading-bar" />
                    <div className="loading-bar" />
                    <div className="loading-bar" />
                  </div>
                </div>
              )}
            
              {result && !isCalculating && (
                <div className="calculator-result">
                  <p className="result-number">{result.projectedMatches}</p>
                  <p className="result-verdict">matches/week</p>
                  <p className="result-projection">
                    Up from {result.currentMatches} → <span className="result-highlight">{result.multiplier}x increase</span>
                  </p>
                  <p className="result-reason">
                    {result.reason}
                  </p>
                  <div className="result-actions">
                    <a 
                      href="https://www.petfinder.com/cat-adoption/" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="get-kitty-btn"
                    >
                      Get a Kitty →
                    </a>
                    <button 
                      className="reset-btn"
                      onClick={() => { setResult(null); setKittenName(''); setKittenHeight(''); setKittenMatches(''); }}
                    >
                      Run Again
                    </button>
                  </div>
                </div>
              )}
            </div>
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
