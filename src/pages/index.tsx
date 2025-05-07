import Link from 'next/link';
import FloatingHearts from '../components/FloatingHearts';
import { useEffect, useState } from 'react';
import { differenceInDays, differenceInHours, differenceInMinutes, differenceInSeconds } from 'date-fns';

export default function Home() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });
  const [isActive, setIsActive] = useState(false);
  const targetDate = new Date('2025-05-10T00:01:00-04:00'); // NYC time

  useEffect(() => {
    const updateCountdown = () => {
      const now = new Date();
      if (now >= targetDate) {
        setIsActive(true);
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      } else {
        const days = differenceInDays(targetDate, now);
        const hours = differenceInHours(targetDate, now) % 24;
        const minutes = differenceInMinutes(targetDate, now) % 60;
        const seconds = differenceInSeconds(targetDate, now) % 60;
        setTimeLeft({ days, hours, minutes, seconds });
      }
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, []);

  const CountdownBox = ({ value, label, emoji }: { value: number; label: string; emoji: string }) => (
    <div className="flex flex-col items-center mx-2">
      <div className="text-3xl font-bold bg-white/90 rounded-lg px-4 py-2 shadow-lg text-black">
        {value.toString().padStart(2, '0')}
      </div>
      <div className="text-sm mt-1 text-gray-800 font-medium">
        {label} {emoji}
      </div>
    </div>
  );

  return (
    <main className="relative flex flex-col items-center justify-center h-screen text-center p-8 overflow-hidden">
      {/* Animated gradient background */}
      <div className="absolute inset-0 z-0 bg-gradient-to-br from-red-100 via-yellow-50 to-green-100 animate-gradientMove" />

      {/* Floating hearts component */}
      <FloatingHearts />

      {/* Extra hearts layer */}
      <div className="absolute inset-0 pointer-events-none z-0">
        {Array.from({ length: 30 }).map((_, i) => (
          <span
            key={i}
            className="absolute w-4 h-4 bg-green-400 rounded-full opacity-60 animate-heartFloat"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 10}s`,
              animationDuration: `${8 + Math.random() * 4}s`,
            }}
          />
        ))}
      </div>

      <h1 className={`text-5xl font-extrabold z-10 text-gray-900 mb-4 drop-shadow-md transition-all duration-1000 ${!isActive ? 'blur-md' : 'blur-0'}`}>
        Happy Anniversary, Annick ❤️
      </h1>

      <p className={`mt-2 text-2xl z-10 text-gray-700 max-w-xl transition-all duration-1000 ${!isActive ? 'blur-md' : 'blur-0'}`}>
        One year of love, laughs, and Hozier on repeat.
      </p>

      <div className="mt-6 z-10">
        <div className="text-xl text-gray-700 mb-4">
          {!isActive ? 'Our anniversary starts in:' : 'Ready to begin! 🎉'}
        </div>
        {!isActive && (
          <div className="flex justify-center items-center">
            <CountdownBox value={timeLeft.days} label="Days" emoji="📅" />
            <CountdownBox value={timeLeft.hours} label="Hours" emoji="⏰" />
            <CountdownBox value={timeLeft.minutes} label="Minutes" emoji="⌛" />
            <CountdownBox value={timeLeft.seconds} label="Seconds" emoji="✨" />
          </div>
        )}
      </div>

      {isActive ? (
        <Link 
          href="/wrapped"
          className="mt-10 px-10 py-4 rounded-xl text-lg font-semibold transition shadow-xl z-10
                     bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-500 text-gray-900
                     hover:from-yellow-500 hover:to-yellow-600"
        >
          Start
        </Link>
      ) : (
        <button
          className="mt-10 px-10 py-4 rounded-xl text-lg font-semibold transition shadow-xl z-10
                     bg-gray-300 text-gray-500 cursor-not-allowed"
          disabled
        >
          Start
        </button>
      )}

      <style jsx>{`
        @keyframes gradientMove {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }

        .animate-gradientMove {
          background-size: 200% 200%;
          animation: gradientMove 15s ease infinite;
        }

        @keyframes heartFloat {
          0% {
            transform: translateY(0) scale(1);
            opacity: 0.4;
          }
          50% {
            transform: translateY(-30px) scale(1.1);
            opacity: 0.8;
          }
          100% {
            transform: translateY(0) scale(1);
            opacity: 0.4;
          }
        }

        .animate-heartFloat {
          animation: heartFloat ease-in-out infinite;
        }
      `}</style>
    </main>
  );
}