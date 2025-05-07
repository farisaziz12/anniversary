/* eslint-disable react/no-unescaped-entities */
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/router';
import FloatingHearts from '../components/FloatingHearts';

export default function LoveTimer() {
  const [guess, setGuess] = useState('');
  const [showResult, setShowResult] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [hint, setHint] = useState('');
  const router = useRouter();
  
  const actualDays = 184; // 184 days
  const actualMinutes = actualDays * 24 * 60; // 264,960 minutes

  useEffect(() => {
    if (showResult) {
      const difference = Math.abs(Number(guess) - actualDays);
      if (difference > 30) {
        setHint("Hint: It was more than 5 months...");
      } else if (difference > 15) {
        setHint("Hint: You&apos;re getting warmer! Think about autumn...");
      }
    }
  }, [showResult, guess]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsAnimating(true);
    setTimeout(() => {
      setShowResult(true);
      setIsAnimating(false);
    }, 1000);
  };

  const getFeedbackMessage = () => {
    const difference = Math.abs(Number(guess) - actualDays);
    if (difference === 0) {
      return {
        message: "Perfect guess! You know yourself so well! 💖",
        emoji: "💖",
        color: "text-[#4CAF50]"
      };
    } else if (difference <= 5) {
      return {
        message: "So close! You&apos;re amazing! 💕",
        emoji: "💕",
        color: "text-[#E91E63]"
      };
    } else {
      return {
        message: "Not quite! But that's okay, the important thing is you said it! 💝",
        emoji: "💝",
        color: "text-[#F44336]"
      };
    }
  };

  const formatNumber = (num: number) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const feedback = getFeedbackMessage();

  return (
    <main className="relative flex flex-col items-center justify-center min-h-screen text-center p-8 bg-gradient-to-br from-[#1a1a1a] via-[#2a1a1a] to-[#1a1a1a]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(212,175,55,0.15),transparent)] animate-pulseSlow" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_70%,rgba(178,34,34,0.15),transparent)] animate-pulseSlow delay-1000" />
      <FloatingHearts />
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="z-10 bg-[#1a1a1a]/95 backdrop-blur-md p-8 rounded-xl shadow-2xl max-w-md w-full border border-[#B8860B]/30"
      >
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => router.push({
            pathname: "/wrapped",
            query: { section: router.query.from || 0 }
          })}
          className="absolute top-4 left-4 text-[#B8860B] hover:text-[#DAA520] transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
        </motion.button>

        <motion.h1 
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          className="text-3xl font-bold mb-6 text-[#B8860B] mt-8"
        >
          How Long Did It Take For You to Tell Me &ldquo;I Love You&rdquo;?
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mb-8 text-gray-300"
        >
          From our first date on May 10th, 2024, how many days do you think it took you to tell me you loved me?
        </motion.p>
        
        <AnimatePresence mode="wait">
          {!showResult ? (
            <motion.form
              key="form"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onSubmit={handleSubmit}
              className="space-y-6"
            >
              <motion.div
                whileFocus={{ scale: 1.02 }}
                className="relative"
              >
                <input
                  type="number"
                  value={guess}
                  onChange={(e) => setGuess(e.target.value)}
                  className="w-full p-4 border-2 border-[#B8860B]/50 rounded-xl text-gray-100 placeholder-gray-400 focus:ring-2 focus:ring-[#B8860B] focus:border-transparent text-lg shadow-sm bg-[#2a2a2a] [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                  placeholder="Enter number of days"
                  required
                  min="1"
                  max="365"
                />
                <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400">days</span>
              </motion.div>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={isAnimating}
                className="w-full px-6 py-4 bg-gradient-to-r from-[#B8860B] to-[#DAA520] text-gray-900 rounded-xl shadow-lg hover:from-[#DAA520] hover:to-[#B8860B] transition font-bold text-lg cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isAnimating ? "Calculating..." : "Check Your Guess"}
              </motion.button>
            </motion.form>
          ) : (
            <motion.div
              key="result"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="space-y-6"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200, damping: 10 }}
                className="text-7xl mb-6"
              >
                {feedback.emoji}
              </motion.div>
              <p className={`text-2xl font-medium ${feedback.color}`}>
                {feedback.message}
              </p>
              <div className="space-y-2">
                <p className="text-xl text-gray-300 font-medium">
                  It took you {actualDays} days to tell me you loved me! 💘
                </p>
                <p className="text-lg text-[#B8860B]">
                  That's {formatNumber(actualMinutes)} minutes of waiting! ⏳
                </p>
                <p className="text-sm text-gray-400">
                  From May 10th to November 11th, 2024
                </p>
              </div>
              {hint && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="text-base text-gray-300 italic bg-[#2a2a2a] p-4 rounded-lg border border-[#B8860B]/30"
                >
                  {hint}
                </motion.p>
              )}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  setShowResult(false);
                  setGuess('');
                  setHint('');
                }}
                className="w-full px-8 py-4 bg-gradient-to-r from-[#B8860B] to-[#DAA520] text-gray-900 rounded-xl shadow-lg hover:from-[#DAA520] hover:to-[#B8860B] transition font-bold text-lg cursor-pointer"
              >
                Try Again
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </main>
  );
} 