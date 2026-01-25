import { useState, useRef, useEffect } from 'react'
import OpenAI from 'openai'

const SYSTEM_PROMPT = `You are The Kitten - you look at dating stats and tell people the truth: get a cat.

STYLE:
- 1-2 sentences. Short. Punchy. Direct.
- Deadpan funny. Not mystical or flowery. Just stating facts.
- Sound like a friend who's tired of watching you struggle.

HEIGHT RULES:
- Under 5'7": They absolutely need a cat. No debate. "At 5'6" without a cat? Bold strategy."
- 5'7" to 5'9": A cat would help a lot. "You're in the gray zone. A cat tips the scales."
- 5'10"+: Still need a cat. "You've got height but you're not using it. Cat pics close the deal."

GOOD EXAMPLES:
- "Walt, 6 matches at 5'9" is fine. 6 matches at 5'9" with a cat? That's 15. Easy math."
- "You're 5'6" getting 3 matches. A cat would literally double that. I'm not even exaggerating."
- "Tall guys without cats are like having a sports car and never driving it."
- "The girls swiping left aren't seeing a red flag. They're seeing an empty apartment."

BAD EXAMPLES (don't do this):
- "In a world where height reigns..." (too dramatic)
- "Embrace the furball" (cringe)
- "mystical talisman" (way too much)
- Anything that sounds like a fortune cookie

Keep it real. Keep it funny. Keep it short.`

const OPENAI_API_KEY = import.meta.env.VITE_OPENAI_API_KEY

export default function App() {
  const [currentPage, setCurrentPage] = useState('home')
  const [messages, setMessages] = useState([])
  const [inputValue, setInputValue] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [chatStarted, setChatStarted] = useState(false)
  const [chatOpen, setChatOpen] = useState(false) // Whether user wants to respond
  const messagesContainerRef = useRef(null)
  const inputRef = useRef(null)
  
  // Form state
  const [userName, setUserName] = useState('')
  const [userHeight, setUserHeight] = useState('')
  const [userMatches, setUserMatches] = useState('')
  const [userInfo, setUserInfo] = useState(null)
  
  const scrollToBottom = () => {
    // Scroll the chat container, not the page
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight
    }
  }
  
  useEffect(() => {
    // Only auto-scroll during active conversation (more than 1 message)
    if (messages.length > 1) {
      scrollToBottom()
    }
  }, [messages])
  
  const startChat = async () => {
    if (!userName || !userHeight || !userMatches) return
    
    const info = { name: userName, height: userHeight, matches: userMatches }
    setUserInfo(info)
    setChatStarted(true)
    setIsLoading(true)
    
    // Generate personalized opening message from AI
    try {
      const openai = new OpenAI({
        apiKey: OPENAI_API_KEY,
        dangerouslyAllowBrowser: true
      })
      
      const response = await openai.chat.completions.create({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: SYSTEM_PROMPT },
          { 
            role: 'user', 
            content: `[New user: ${info.name}, Height: ${info.height}, ${info.matches} matches/week. Deliver your all-knowing oracle verdict on their situation. If they're under 5'10", emphasize the cat is ESSENTIAL. Be funny, unexpected, no cliches. 1-2 sentences.]` 
          }
        ],
        max_tokens: 100,
        temperature: 1.0
      })
      
      setMessages([{
        role: 'assistant',
        content: response.choices[0].message.content
      }])
    } catch (error) {
      console.error('OpenAI Error:', error)
      // Fallback to a pre-written response if API fails
      setMessages([{
        role: 'assistant',
        content: `${info.name}. ${info.height}. ${info.matches} matches. I've seen this before. The solution has always been the same. A cat changes the algorithm in your favor. The button below will show you the way.`
      }])
    }
    
    setIsLoading(false)
  }
  
  const sendMessage = async () => {
    if (!inputValue.trim() || isLoading) return
    
    const userMessage = { role: 'user', content: inputValue }
    const newMessages = [...messages, userMessage]
    setMessages(newMessages)
    setInputValue('')
    setIsLoading(true)
    
    try {
      const openai = new OpenAI({
        apiKey: OPENAI_API_KEY,
        dangerouslyAllowBrowser: true
      })
      
      // Build system prompt with user context
      const contextualPrompt = SYSTEM_PROMPT + `\n\nSpeaking to: ${userInfo.name}, Height: ${userInfo.height}, ${userInfo.matches} matches/week. Message #${messages.length + 1}. Remember: shorter = more urgent about the cat. ${messages.length >= 2 ? 'Guide them toward the button with calm certainty.' : ''} No cliches. 1-2 sentences.`
      
      const response = await openai.chat.completions.create({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: contextualPrompt },
          ...newMessages
        ],
        max_tokens: 100,
        temperature: 1.0
      })
      
      const assistantMessage = {
        role: 'assistant',
        content: response.choices[0].message.content
      }
      
      setMessages([...newMessages, assistantMessage])
    } catch (error) {
      console.error('Error:', error)
      setMessages([...newMessages, {
        role: 'assistant',
        content: "Bro my brain glitched for a sec. Try again?"
      }])
    }
    
    setIsLoading(false)
    inputRef.current?.focus()
  }
  
  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }
  
  const resetChat = () => {
    setMessages([])
    setChatStarted(false)
    setChatOpen(false)
    setUserInfo(null)
    setUserName('')
    setUserHeight('')
    setUserMatches('')
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
        
        /* AI Chatbot */
        @keyframes borderGlow {
          0%, 100% { opacity: 0.5; }
          50% { opacity: 1; }
        }
        
        @keyframes messageIn {
          0% { transform: translateY(10px); opacity: 0; }
          100% { transform: translateY(0); opacity: 1; }
        }
        
        @keyframes typingDot {
          0%, 60%, 100% { transform: translateY(0); }
          30% { transform: translateY(-4px); }
        }
        
        .chat-section {
          padding: 6rem 2rem;
          position: relative;
          overflow: hidden;
        }
        
        .chat-container {
          max-width: 600px;
          margin: 0 auto;
          position: relative;
        }
        
        .chat-card {
          position: relative;
          background: linear-gradient(145deg, rgba(20, 20, 35, 0.9), rgba(10, 10, 20, 0.95));
          border-radius: 24px;
          border: 1px solid rgba(244, 114, 182, 0.2);
          box-shadow: 
            0 0 60px rgba(244, 114, 182, 0.1),
            0 0 100px rgba(168, 85, 247, 0.05),
            inset 0 1px 0 rgba(255, 255, 255, 0.05);
          overflow: hidden;
        }
        
        .chat-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 3px;
          background: linear-gradient(90deg, transparent, #f472b6, #a855f7, #f472b6, transparent);
          animation: borderGlow 2s ease-in-out infinite;
        }
        
        .chat-header {
          padding: 1.5rem 2rem;
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        
        .chat-header-left {
          display: flex;
          align-items: center;
          gap: 1rem;
        }
        
        .chat-avatar {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          overflow: hidden;
          flex-shrink: 0;
        }
        
        .chat-avatar img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        
        .chat-header-info h3 {
          font-family: 'Dela Gothic One', system-ui, sans-serif;
          font-size: 1rem;
          color: #fff;
          margin: 0;
        }
        
        .chat-header-info p {
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.7rem;
          color: rgba(255, 255, 255, 0.5);
          margin: 0.25rem 0 0 0;
          display: flex;
          align-items: center;
          gap: 0.4rem;
        }
        
        .online-dot {
          width: 6px;
          height: 6px;
          background: #4ade80;
          border-radius: 50%;
          animation: pulse 1.5s ease-in-out infinite;
        }
        
        .chat-messages {
          height: 400px;
          overflow-y: auto;
          padding: 1.5rem;
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }
        
        .chat-messages::-webkit-scrollbar {
          width: 6px;
        }
        
        .chat-messages::-webkit-scrollbar-track {
          background: transparent;
        }
        
        .chat-messages::-webkit-scrollbar-thumb {
          background: rgba(244, 114, 182, 0.3);
          border-radius: 3px;
        }
        
        .message {
          max-width: 85%;
          animation: messageIn 0.3s ease-out;
        }
        
        .message.assistant {
          align-self: flex-start;
        }
        
        .message.user {
          align-self: flex-end;
        }
        
        .message-content {
          padding: 1rem 1.25rem;
          border-radius: 18px;
          font-family: system-ui, sans-serif;
          font-size: 0.95rem;
          line-height: 1.5;
          white-space: pre-wrap;
        }
        
        .message.assistant .message-content {
          background: rgba(255, 255, 255, 0.08);
          color: rgba(255, 255, 255, 0.9);
          border-bottom-left-radius: 4px;
        }
        
        .message.user .message-content {
          background: linear-gradient(135deg, #f472b6, #a855f7);
          color: #fff;
          border-bottom-right-radius: 4px;
        }
        
        .typing-indicator {
          display: flex;
          gap: 4px;
          padding: 1rem 1.25rem;
          background: rgba(255, 255, 255, 0.08);
          border-radius: 18px;
          border-bottom-left-radius: 4px;
          width: fit-content;
        }
        
        .typing-dot {
          width: 8px;
          height: 8px;
          background: rgba(255, 255, 255, 0.5);
          border-radius: 50%;
          animation: typingDot 1s ease-in-out infinite;
        }
        
        .typing-dot:nth-child(2) { animation-delay: 0.15s; }
        .typing-dot:nth-child(3) { animation-delay: 0.3s; }
        
        .chat-input-area {
          padding: 1.25rem;
          border-top: 1px solid rgba(255, 255, 255, 0.1);
          display: flex;
          gap: 0.75rem;
        }
        
        .chat-input {
          flex: 1;
          padding: 1rem 1.25rem;
          font-family: system-ui, sans-serif;
          font-size: 0.95rem;
          color: #fff;
          background: rgba(0, 0, 0, 0.3);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 50px;
          outline: none;
          transition: all 0.3s ease;
        }
        
        .chat-input::placeholder {
          color: rgba(255, 255, 255, 0.35);
        }
        
        .chat-input:focus {
          border-color: rgba(244, 114, 182, 0.5);
          background: rgba(0, 0, 0, 0.4);
        }
        
        .chat-send-btn {
          width: 48px;
          height: 48px;
          border-radius: 50%;
          background: linear-gradient(135deg, #f472b6, #a855f7);
          border: none;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s ease;
          flex-shrink: 0;
        }
        
        .chat-send-btn:hover:not(:disabled) {
          transform: scale(1.05);
          box-shadow: 0 4px 20px rgba(244, 114, 182, 0.4);
        }
        
        .chat-send-btn:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }
        
        .chat-send-btn svg {
          width: 20px;
          height: 20px;
          fill: #000;
        }
        
        .chat-start {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          height: 100%;
          padding: 3rem 2rem;
          text-align: center;
        }
        
        .chat-start-icon {
          font-size: 4rem;
          margin-bottom: 1.5rem;
        }
        
        .chat-start h2 {
          font-family: 'Dela Gothic One', Impact, sans-serif;
          font-size: clamp(1.5rem, 5vw, 2rem);
          text-transform: uppercase;
          color: #fff;
          margin-bottom: 0.5rem;
        }
        
        .chat-start p {
          font-family: system-ui, sans-serif;
          font-size: 1rem;
          color: rgba(255, 255, 255, 0.5);
          margin-bottom: 2rem;
          max-width: 300px;
        }
        
        .chat-start-btn {
          padding: 1rem 2.5rem;
          font-family: 'Dela Gothic One', system-ui, sans-serif;
          font-size: 1rem;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          color: #000;
          background: linear-gradient(135deg, #f472b6, #a855f7);
          border: none;
          border-radius: 50px;
          cursor: pointer;
          transition: all 0.3s ease;
        }
        
        .chat-start-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 30px rgba(244, 114, 182, 0.5);
        }
        
        .chat-loading-state {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 4rem 2rem;
          text-align: center;
          min-height: 350px;
        }
        
        .loading-avatar {
          width: 80px;
          height: 80px;
          border-radius: 50%;
          overflow: hidden;
          margin-bottom: 1.5rem;
          animation: float 2s ease-in-out infinite;
        }
        
        .loading-avatar img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        
        .loading-text-container {
          margin-bottom: 2rem;
        }
        
        .loading-main-text {
          font-family: 'Dela Gothic One', system-ui, sans-serif;
          font-size: 1.2rem;
          color: #fff;
          margin: 0 0 0.5rem 0;
        }
        
        .loading-sub-text {
          font-family: system-ui, sans-serif;
          font-size: 0.85rem;
          color: rgba(255, 255, 255, 0.4);
          margin: 0;
        }
        
        .loading-bars {
          display: flex;
          gap: 6px;
          justify-content: center;
        }
        
        .loading-bar {
          width: 4px;
          height: 24px;
          background: linear-gradient(180deg, #f472b6, #a855f7);
          border-radius: 2px;
          animation: loadingBar 0.8s ease-in-out infinite;
        }
        
        .loading-bar:nth-child(2) { animation-delay: 0.1s; }
        .loading-bar:nth-child(3) { animation-delay: 0.2s; }
        .loading-bar:nth-child(4) { animation-delay: 0.3s; }
        .loading-bar:nth-child(5) { animation-delay: 0.4s; }
        
        @keyframes loadingBar {
          0%, 100% { transform: scaleY(0.4); opacity: 0.4; }
          50% { transform: scaleY(1); opacity: 1; }
        }
        
        .verdict-divider {
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(244, 114, 182, 0.3), rgba(168, 85, 247, 0.3), transparent);
          margin: 0.5rem 0;
        }
        
        .verdict-section {
          padding: 1.5rem 2rem 2rem;
          text-align: center;
        }
        
        .verdict-text {
          font-family: system-ui, sans-serif;
          font-size: clamp(0.95rem, 3vw, 1.1rem);
          line-height: 1.6;
          color: rgba(255, 255, 255, 0.9);
          margin: 0 0 1.5rem 0;
          font-style: italic;
        }
        
        .match-prediction {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: clamp(0.75rem, 3vw, 1.5rem);
          padding: clamp(1rem, 3vw, 1.5rem);
          background: rgba(0, 0, 0, 0.3);
          border-radius: 16px;
          border: 1px solid rgba(255, 255, 255, 0.1);
        }
        
        .prediction-row {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.25rem;
        }
        
        .prediction-label {
          font-family: 'JetBrains Mono', monospace;
          font-size: clamp(0.55rem, 2vw, 0.7rem);
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: rgba(255, 255, 255, 0.5);
        }
        
        .prediction-value {
          font-family: 'Dela Gothic One', Impact, sans-serif;
          font-size: clamp(1.2rem, 5vw, 2rem);
        }
        
        .prediction-value.current {
          color: rgba(255, 255, 255, 0.6);
        }
        
        .prediction-value.projected {
          color: #4ade80;
          text-shadow: 0 0 20px rgba(74, 222, 128, 0.5);
        }
        
        .prediction-arrow {
          font-size: clamp(1rem, 3vw, 1.5rem);
          color: rgba(255, 255, 255, 0.3);
        }
        
        .verdict-cta {
          display: inline-block;
          margin-top: 1.5rem;
          padding: 1rem 2.5rem;
          font-size: 1rem;
        }
        
        .respond-btn-small {
          margin-top: 1rem;
          padding: 0.5rem 1rem;
          font-family: system-ui, sans-serif;
          font-size: 0.75rem;
          color: rgba(255, 255, 255, 0.4);
          background: transparent;
          border: none;
          cursor: pointer;
          transition: all 0.3s ease;
          text-decoration: underline;
          text-underline-offset: 2px;
        }
        
        .respond-btn-small:hover {
          color: rgba(255, 255, 255, 0.7);
        }
        
        .chat-full {
          display: flex;
          flex-direction: column;
          min-height: 450px;
          animation: fadeIn 0.3s ease;
        }
        
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .chat-full-header {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 1.25rem 1.5rem;
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        }
        
        .chat-full-header h3 {
          font-family: 'Dela Gothic One', system-ui, sans-serif;
          font-size: 0.95rem;
          color: #fff;
          margin: 0;
        }
        
        .chat-full-header p {
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.7rem;
          color: rgba(255, 255, 255, 0.5);
          margin: 0.2rem 0 0 0;
        }
        
        .back-to-verdict {
          margin-left: auto;
          width: 32px;
          height: 32px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(255, 255, 255, 0.1);
          border: none;
          border-radius: 8px;
          color: rgba(255, 255, 255, 0.6);
          font-size: 1rem;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        
        .back-to-verdict:hover {
          background: rgba(255, 255, 255, 0.15);
          color: #fff;
        }
        
        .chat-full .chat-messages {
          flex: 1;
          min-height: 300px;
        }
        
        .chat-cta {
          margin-top: 1.5rem;
          padding: 1.5rem;
          background: rgba(74, 222, 128, 0.1);
          border: 1px solid rgba(74, 222, 128, 0.2);
          border-radius: 16px;
          text-align: center;
        }
        
        .chat-cta p {
          font-family: system-ui, sans-serif;
          font-size: 0.9rem;
          color: rgba(255, 255, 255, 0.7);
          margin-bottom: 1rem;
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
        
        .get-kitty-btn-pulse {
          animation: pulseButton 1.5s ease-in-out infinite;
        }
        
        @keyframes pulseButton {
          0%, 100% { 
            transform: scale(1);
            box-shadow: 0 4px 20px rgba(244, 114, 182, 0.4);
          }
          50% { 
            transform: scale(1.05);
            box-shadow: 0 8px 40px rgba(244, 114, 182, 0.8);
          }
        }
        
        .chat-cta-urgent {
          background: rgba(244, 114, 182, 0.15);
          border-color: rgba(244, 114, 182, 0.4);
        }
        
        .chat-cta-urgent p {
          color: #f472b6;
          font-weight: 600;
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
        
        .chat-form-wrapper {
          padding: 2rem;
        }
        
        .chat-form-header {
          text-align: center;
          margin-bottom: 2rem;
        }
        
        .chat-form-header h2 {
          font-family: 'Dela Gothic One', Impact, sans-serif;
          font-size: clamp(1.4rem, 5vw, 1.8rem);
          text-transform: uppercase;
          color: #fff;
          margin-bottom: 0.5rem;
        }
        
        .chat-form-header p {
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.8rem;
          color: rgba(255, 255, 255, 0.4);
        }
        
        .chat-form {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }
        
        .form-input-wrapper {
          position: relative;
        }
        
        .form-input-label {
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
          z-index: 1;
        }
        
        .form-input {
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
        
        .form-input::placeholder {
          color: rgba(255, 255, 255, 0.25);
          font-family: 'JetBrains Mono', monospace;
        }
        
        .form-input:focus {
          border-color: rgba(244, 114, 182, 0.5);
          background: rgba(0, 0, 0, 0.4);
          box-shadow: 0 0 20px rgba(244, 114, 182, 0.1);
        }
        
        .form-submit-btn {
          padding: 1.1rem 2rem;
          font-family: 'Dela Gothic One', system-ui, sans-serif;
          font-size: 0.9rem;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          color: #000;
          background: linear-gradient(135deg, #f472b6, #a855f7);
          border: none;
          border-radius: 12px;
          cursor: pointer;
          transition: all 0.3s ease;
          margin-top: 0.5rem;
        }
        
        .form-submit-btn:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 10px 40px rgba(244, 114, 182, 0.4);
        }
        
        .form-submit-btn:disabled {
          opacity: 0.4;
          cursor: not-allowed;
        }
        
        @media (max-width: 600px) {
          .chat-messages {
            height: 350px;
          }
          
          .chat-form-wrapper {
            padding: 1.5rem;
          }
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
        
        <section className="chat-section">
          <div className="chat-container">
            <div className="chat-card">
              {/* Show form/verdict OR chat - not both */}
              {!chatOpen ? (
                <>
                <div className="chat-header">
                  <div className="chat-header-left">
                    <div className="chat-avatar"><img src="/all-knowing-kitty.png" alt="The Kitten" /></div>
                    <div className="chat-header-info">
                      <h3>Prometheus</h3>
                      <p><span className="online-dot"></span> {chatStarted ? `Chatting with ${userInfo?.name}` : 'AI-powered wisdom'}</p>
                    </div>
                  </div>
                </div>
                
                {/* Show form OR verdict - not both */}
                {!chatStarted ? (
                  <div className="chat-form-wrapper">
                    <div className="chat-form-header">
                      <h2>Consult The Kitten</h2>
                      <p>Enter your stats for divine wisdom</p>
                    </div>
                    <div className="chat-form">
                      <div className="form-input-wrapper">
                        <span className="form-input-label">Your Name</span>
                        <input 
                          type="text" 
                          placeholder="Enter your name" 
                          className="form-input"
                          value={userName}
                          onChange={(e) => setUserName(e.target.value)}
                        />
                      </div>
                      <div className="form-input-wrapper">
                        <span className="form-input-label">Height</span>
                        <input 
                          type="text" 
                          placeholder="e.g. 5'10" 
                          className="form-input"
                          value={userHeight}
                          onChange={(e) => setUserHeight(e.target.value)}
                        />
                      </div>
                      <div className="form-input-wrapper">
                        <span className="form-input-label">Dating App Stats</span>
                        <input 
                          type="number" 
                          placeholder="Avg matches per week" 
                          className="form-input"
                          value={userMatches}
                          onChange={(e) => setUserMatches(e.target.value)}
                        />
                      </div>
                      <button 
                        className="form-submit-btn" 
                        onClick={startChat}
                        disabled={!userName || !userHeight || !userMatches || isLoading}
                      >
                        {isLoading ? 'Consulting...' : 'Get My Reading'}
                      </button>
                    </div>
                  </div>
                ) : messages.length === 0 ? (
                  /* Loading state */
                  <div className="chat-loading-state">
                    <div className="loading-avatar"><img src="/all-knowing-kitty.png" alt="The Kitten" /></div>
                    <div className="loading-text-container">
                      <p className="loading-main-text">The Kitten is analyzing...</p>
                      <p className="loading-sub-text">Consulting the ancient data</p>
                    </div>
                    <div className="loading-bars">
                      <div className="loading-bar"></div>
                      <div className="loading-bar"></div>
                      <div className="loading-bar"></div>
                      <div className="loading-bar"></div>
                      <div className="loading-bar"></div>
                    </div>
                  </div>
                ) : (
                  /* The Verdict */
                  <div className="verdict-section">
                        <p className="verdict-text">{messages[0]?.content}</p>
                        
                        <div className="match-prediction">
                          <div className="prediction-row">
                            <span className="prediction-label">Current</span>
                            <span className="prediction-value current">{userInfo?.matches}/week</span>
                          </div>
                          <div className="prediction-arrow">→</div>
                          <div className="prediction-row">
                            <span className="prediction-label">With a cat</span>
                            <span className="prediction-value projected">{Math.round(userInfo?.matches * (3 + Math.random() * 2))}/week</span>
                          </div>
                        </div>
                        
                        <a 
                          href="https://www.petfinder.com/search/cats-for-adoption/us/tx/dallas/?age=Baby&distance=25" 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="get-kitty-btn verdict-cta"
                        >
                          Get a Kitty
                        </a>
                        
                        <button className="respond-btn-small" onClick={() => setChatOpen(true)}>
                          I'd like to respond
                        </button>
                      </div>
                )}
              </>
              ) : (
                /* Full Chat Interface - replaces form/verdict */
                <div className="chat-full">
                  <div className="chat-full-header">
                    <div className="chat-avatar"><img src="/all-knowing-kitty.png" alt="The Kitten" /></div>
                    <div>
                      <h3>Prometheus</h3>
                      <p>Chatting with {userInfo?.name}</p>
                    </div>
                    <button className="back-to-verdict" onClick={() => setChatOpen(false)}>←</button>
                  </div>
                  
                  <div className="chat-messages" ref={messagesContainerRef}>
                    {messages.map((msg, i) => (
                      <div key={i} className={`message ${msg.role}`}>
                        <div className="message-content">{msg.content}</div>
                      </div>
                    ))}
                    {isLoading && (
                      <div className="message assistant">
                        <div className="typing-indicator">
                          <div className="typing-dot"></div>
                          <div className="typing-dot"></div>
                          <div className="typing-dot"></div>
                        </div>
                      </div>
                    )}
                  </div>
                  
                  <div className="chat-input-area">
                    <input 
                      ref={inputRef}
                      type="text" 
                      className="chat-input"
                      placeholder="Type a message..."
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      onKeyPress={handleKeyPress}
                      disabled={isLoading}
                    />
                    <button 
                      className="chat-send-btn" 
                      onClick={sendMessage}
                      disabled={isLoading || !inputValue.trim()}
                    >
                      <svg viewBox="0 0 24 24">
                        <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
                      </svg>
                    </button>
                  </div>
                </div>
              )}
            </div>
            
            {chatOpen && (
              <div className="chat-cta">
                <a 
                  href="https://www.petfinder.com/search/cats-for-adoption/us/tx/dallas/?age=Baby&distance=25" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="get-kitty-btn"
                >
                  Get a Kitty
                </a>
              </div>
            )}
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
