import { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import FloatingHearts from '../components/FloatingHearts';

const letterSections = [
  "My Dearest Annick,",
  "As I write this letter on our anniversary, I find myself overwhelmed with gratitude for the beautiful journey we've shared together.",
  "Every moment with you has been a gift - from our first date to our countless adventures, from the quiet evenings to the exciting travels.",
  "Your smile brightens my darkest days, your laugh is my favorite melody, and your love is the greatest blessing in my life.",
  "Thank you for being my partner, my best friend, and my greatest love. Here's to many more years of creating beautiful memories together.",
  "Forever yours,",
  "❤️"
];

export default function LoveLetter() {
  const router = useRouter();
  const fromSection = router.query.from ? parseInt(router.query.from as string) : 3;
  const [currentSection, setCurrentSection] = useState(0);
  const [showAll, setShowAll] = useState(false);

  const handleNext = () => {
    if (currentSection < letterSections.length - 1) {
      setCurrentSection(currentSection + 1);
    } else {
      setShowAll(true);
    }
  };

  return (
    <main className="relative flex flex-col items-center justify-center min-h-screen text-center p-8 bg-gradient-to-b from-red-50 to-white">
      <FloatingHearts />
      <div className="z-10 bg-white p-8 rounded-xl shadow-xl max-w-2xl border border-gray-100">
        <h1 className="text-3xl font-bold mb-8 text-gray-900">A Letter For You</h1>
        
        <div className="space-y-6 text-lg">
          {showAll ? (
            letterSections.map((section, index) => (
              <p key={index} className="animate-fade-in text-gray-800">
                {section}
              </p>
            ))
          ) : (
            <>
              {letterSections.slice(0, currentSection + 1).map((section, index) => (
                <p key={index} className="animate-fade-in text-gray-800">
                  {section}
                </p>
              ))}
              <button
                onClick={handleNext}
                className="mt-8 px-8 py-4 bg-amber-400 text-gray-900 rounded-xl shadow-lg hover:bg-amber-500 transition font-bold text-lg cursor-pointer"
              >
                {currentSection < letterSections.length - 1 ? 'Continue Reading' : 'Read All'}
              </button>
            </>
          )}
        </div>

        <Link 
          href={{
            pathname: '/wrapped',
            query: { section: fromSection }
          }}
          className="block mt-8 text-red-700 hover:text-red-800 font-bold text-lg cursor-pointer"
        >
          Back to Wrapped
        </Link>
      </div>
    </main>
  );
} 