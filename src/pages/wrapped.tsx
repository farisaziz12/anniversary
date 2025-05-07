import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/router';

interface Color {
  name: string;
  hex: string;
  description: string;
  emoji: string;
}

interface Section {
  title: string;
  description: string;
  color: string;
  type: 'colors' | 'gallery' | 'poems' | 'love-letter' | 'love-timer' | 'year-in-numbers';
  link?: string;
  colors?: Color[];
  stats?: {
    number: number;
    label: string;
    emoji: string;
  }[];
  anecdotes?: {
    text: string;
    emoji: string;
  }[];
}

const sections: Section[] = [
  {
    title: "Our Journey in Colors",
    description: "Your favorite colors that paint our story",
    color: "bg-[#1a1a1a]",
    type: "colors",
    colors: [
      { name: "Shiny Gold", hex: "#B8860B", description: "Like the warmth of our love", emoji: "💛" },
      { name: "Deep Red", hex: "#D7263D", description: "The passion in our hearts", emoji: "❤️" },
      { name: "Deep Green", hex: "#3A7D44", description: "The growth of our journey", emoji: "💚" }
    ]
  },
  {
    title: "Our Photo Gallery",
    description: "Captured moments of our beautiful journey",
    color: "bg-[#1a1a1a]",
    type: "gallery",
    link: "/gallery"
  },
  {
    title: "The Love Timer",
    description: "How long did it take for me to say those three magical words?",
    color: "bg-[#1a1a1a]",
    type: "love-timer",
    link: "/love-timer"
  },
  {
    title: "Poems of Love",
    description: "Words that capture our story",
    color: "bg-[#1a1a1a]",
    type: "poems",
    link: "/poems"
  },
  {
    title: "A Letter For You",
    description: "Words from my heart to yours",
    color: "bg-[#1a1a1a]",
    type: "love-letter",
    link: "/love-letter"
  },
  {
    title: "Our Year in Numbers",
    description: "The moments that made our year special",
    color: "bg-[#1a1a1a]",
    type: "year-in-numbers",
    stats: [
      { number: 3, label: "Trips to New York", emoji: "🗽" },
      { number: 2, label: "Swiss Adventures in Geneva", emoji: "🇨🇭" },
      { number: 3, label: "Relaxing Spa Days", emoji: "💆‍♀️" },
      { number: 1000, label: "Milano Market Sandwiches", emoji: "🥪" },
      { number: 10000, label: "FaceTime Minutes", emoji: "📱" }
    ],
    anecdotes: [
      { text: "That time we got lost in Central Park but found the perfect spot for coffee", emoji: "🌳" },
      { text: "Our first Swiss chocolate tasting adventure in Geneva", emoji: "🍫" },
      { text: "The countless lunch breaks at Milano Market, always trying new sandwich combinations", emoji: "🥖" },
      { text: "Late night FaceTime calls that turned into early morning conversations", emoji: "✨" }
    ]
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1
  }
};

const renderColoredHearts = (colorObj: Color) => {
  return Array.from({ length: 15 }).map((_, i) => (
    <motion.div
      key={i}
      className="absolute text-4xl"
      style={{
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`
      }}
      initial={{ 
        y: '100vh',
        x: `${Math.random() * 100}%`,
        opacity: 0,
        scale: 0.5
      }}
      animate={{ 
        y: '-10vh',
        opacity: [0.4, 1, 0.4],
        scale: [1, 1.2, 1]
      }}
      transition={{ 
        duration: 8 + Math.random() * 4,
        delay: i * 0.2,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    >
      {colorObj.emoji}
    </motion.div>
  ));
};

export default function RomanticWrapped() {
  const router = useRouter();
  const [currentSection, setCurrentSection] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [activeColor, setActiveColor] = useState<Color | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (router.isReady) {
      const section = router.query.section;
      if (section && typeof section === 'string') {
        const sectionIndex = parseInt(section);
        if (!isNaN(sectionIndex) && sectionIndex >= 0 && sectionIndex < sections.length) {
          setCurrentSection(sectionIndex);
        }
      }
    }
  }, [router.isReady, router.query.section]);

  const handleNext = () => {
    if (currentSection < sections.length - 1) {
      setCurrentSection(currentSection + 1);
    }
  };

  const handlePrevious = () => {
    if (currentSection > 0) {
      setCurrentSection(currentSection - 1);
    }
  };

  const handleSectionClick = (index: number) => {
    setCurrentSection(index);
  };

  const handleColorClick = (colorObj: Color) => {
    setActiveColor(colorObj);
  };

  const renderBackground = () => (
    <div className="absolute inset-0 z-0 bg-black">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(212,175,55,0.2),transparent)] animate-pulseSlow" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_70%,rgba(178,34,34,0.15),transparent)] animate-pulseSlow delay-1000" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,rgba(34,139,34,0.15),transparent)] animate-pulseSlow delay-2000" />
    </div>
  );

  const renderFloatingHearts = () => (
    Array.from({ length: 20 }).map((_, i) => (
      <motion.span
        key={i}
        className="absolute text-pink-300 text-2xl"
        style={{
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`
        }}
        animate={{
          y: [0, -20, 0],
          opacity: [0.4, 1, 0.4],
          scale: [1, 1.2, 1]
        }}
        transition={{
          duration: 6 + Math.random() * 4,
          repeat: Infinity
        }}
      >
        💖
      </motion.span>
    ))
  );

  const renderProgressIndicator = () => (
    <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 flex gap-2">
      {sections.map((section, index) => (
        <button
          key={index}
          onClick={() => handleSectionClick(index)}
          className={`w-3 h-3 rounded-full transition-all duration-300 ${
            currentSection === index 
              ? 'bg-white scale-125' 
              : 'bg-white/50 hover:bg-white/75'
          }`}
          aria-label={`Go to ${section.title}`}
        />
      ))}
    </div>
  );

  const renderSection = () => {
    const currentSectionData = sections[currentSection];
    const colors = currentSectionData.type === "colors" ? currentSectionData.colors : undefined;
    const defaultColor = colors?.[0];

    return (
      <motion.div
        key={currentSection}
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -100 }}
        transition={{ duration: 0.5 }}
        className={`relative z-10 min-h-screen flex flex-col items-center justify-center p-8 text-white ${currentSectionData.color}`}
      >
        {colors && (
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {renderColoredHearts(activeColor || defaultColor!)}
          </div>
        )}

        <motion.h1
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-5xl font-serif font-bold mb-6 drop-shadow-lg"
        >
          {currentSectionData.title}
        </motion.h1>

        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-xl font-light text-pink-100 mb-8 max-w-2xl text-center"
        >
          {currentSectionData.description}
        </motion.p>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="text-center w-full max-w-4xl"
        >
          {colors ? (
            <motion.div
              variants={itemVariants}
              className="grid grid-cols-1 md:grid-cols-3 gap-6"
            >
              {colors.map((color, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className={`bg-white/20 backdrop-blur-sm p-6 rounded-lg shadow-lg relative overflow-hidden cursor-pointer transition-all duration-300 ${
                    activeColor?.hex === color.hex ? 'ring-4 ring-white/50 scale-105' : 'hover:scale-105'
                  }`}
                  onClick={() => handleColorClick(color)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <div 
                    className="w-full h-32 rounded-lg mb-4 shadow-inner"
                    style={{ backgroundColor: color.hex }}
                  />
                  <h3 className="text-xl font-bold mb-2">{color.name}</h3>
                  <p className="text-pink-100">{color.description}</p>
                </motion.div>
              ))}
            </motion.div>
          ) : currentSectionData.type === "year-in-numbers" ? (
            <motion.div
              variants={itemVariants}
              className="space-y-12"
            >
              <motion.div
                variants={itemVariants}
                className="grid grid-cols-1 md:grid-cols-3 gap-6"
              >
                {currentSectionData.stats?.map((stat, index) => (
                  <motion.div
                    key={index}
                    variants={itemVariants}
                    className="bg-white/20 backdrop-blur-sm p-6 rounded-lg shadow-lg"
                    whileHover={{ scale: 1.05 }}
                  >
                    <div className="text-4xl mb-2">{stat.emoji}</div>
                    <div className="text-4xl font-bold mb-2">{stat.number.toLocaleString()}</div>
                    <div className="text-pink-100">{stat.label}</div>
                  </motion.div>
                ))}
              </motion.div>

              <motion.div
                variants={itemVariants}
                className="grid grid-cols-1 md:grid-cols-2 gap-6"
              >
                {currentSectionData.anecdotes?.map((anecdote, index) => (
                  <motion.div
                    key={index}
                    variants={itemVariants}
                    className="bg-white/20 backdrop-blur-sm p-6 rounded-lg shadow-lg"
                    whileHover={{ scale: 1.05 }}
                  >
                    <div className="text-3xl mb-2">{anecdote.emoji}</div>
                    <p className="text-lg">{anecdote.text}</p>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          ) : currentSectionData.link ? (
            <motion.div
              variants={itemVariants}
              className="bg-white/20 backdrop-blur-sm p-8 rounded-lg shadow-lg"
            >
              <Link 
                href={{
                  pathname: currentSectionData.link,
                  query: { from: currentSection }
                }}
                className="inline-block px-8 py-4 bg-white text-gray-900 rounded-full font-semibold shadow-lg hover:bg-gray-100 transition-colors"
              >
                {currentSectionData.type === "gallery" ? "View Gallery" : 
                 currentSectionData.type === "poems" ? "Read Poems" : 
                 currentSectionData.type === "love-timer" ? "Play Game" :
                 "Read Letter"}
              </Link>
            </motion.div>
          ) : null}
        </motion.div>

        <div className="flex gap-4 mt-12">
          {currentSection > 0 && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handlePrevious}
              className="bg-white/20 text-white px-6 py-3 rounded-full font-semibold shadow-lg hover:bg-white/30"
            >
              Back
            </motion.button>
          )}

          {currentSection < sections.length - 1 && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleNext}
              className="bg-white text-gray-900 px-6 py-3 rounded-full font-semibold shadow-lg hover:bg-gray-100"
            >
              Next
            </motion.button>
          )}
        </div>
      </motion.div>
    );
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white">
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-4xl font-bold"
        >
          Loading your memories...
        </motion.div>
      </div>
    );
  }

  return (
    <main className="relative min-h-screen overflow-hidden">
      {renderBackground()}
      {renderFloatingHearts()}
      {renderProgressIndicator()}
      <AnimatePresence mode="wait">
        {renderSection()}
      </AnimatePresence>
    </main>
  );
} 