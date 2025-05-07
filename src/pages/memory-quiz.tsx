import { useState } from 'react';
import Link from 'next/link';
import FloatingHearts from '../components/FloatingHearts';

interface Question {
  question: string;
  options: string[];
  correctAnswer: number;
}

const questions: Question[] = [
  {
    question: "Where was our first date?",
    options: ["Coffee Shop", "Park", "Restaurant", "Museum"],
    correctAnswer: 0
  },
  {
    question: "What was the first movie we watched together?",
    options: ["Movie A", "Movie B", "Movie C", "Movie D"],
    correctAnswer: 1
  },
  {
    question: "What's my favorite color?",
    options: ["Blue", "Red", "Green", "Purple"],
    correctAnswer: 2
  },
  // Add more questions as needed
];

export default function MemoryQuiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);

  const handleAnswer = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);
    if (answerIndex === questions[currentQuestion].correctAnswer) {
      setScore(score + 1);
    }
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
    } else {
      setShowScore(true);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setScore(0);
    setShowScore(false);
    setSelectedAnswer(null);
  };

  return (
    <main className="relative flex flex-col items-center justify-center min-h-screen text-center p-8 bg-gradient-to-b from-red-50 to-white">
      <FloatingHearts />
      <div className="z-10 bg-white p-8 rounded-xl shadow-xl max-w-md border border-gray-100">
        {!showScore ? (
          <>
            <h1 className="text-3xl font-bold mb-6 text-gray-900">Memory Quiz</h1>
            <div className="mb-4">
              <span className="text-lg text-gray-800 font-medium">Question {currentQuestion + 1} of {questions.length}</span>
            </div>
            <h2 className="text-xl mb-6 text-gray-900">{questions[currentQuestion].question}</h2>
            <div className="space-y-3">
              {questions[currentQuestion].options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswer(index)}
                  className={`w-full p-4 rounded-lg transition font-medium text-lg cursor-pointer ${
                    selectedAnswer === index
                      ? index === questions[currentQuestion].correctAnswer
                        ? 'bg-green-700 text-white shadow-lg'
                        : 'bg-red-700 text-white shadow-lg'
                      : 'bg-gray-100 hover:bg-gray-200 text-gray-900 border-2 border-gray-200'
                  }`}
                  disabled={selectedAnswer !== null}
                >
                  {option}
                </button>
              ))}
            </div>
            {selectedAnswer !== null && (
              <button
                onClick={handleNext}
                className="mt-8 px-8 py-4 bg-red-700 text-white rounded-xl shadow-lg hover:bg-red-800 transition font-bold text-lg cursor-pointer"
              >
                {currentQuestion < questions.length - 1 ? 'Next Question' : 'See Results'}
              </button>
            )}
          </>
        ) : (
          <div className="space-y-6">
            <h1 className="text-3xl font-bold text-gray-900">Quiz Complete!</h1>
            <p className="text-xl text-gray-800 font-medium">
              You scored {score} out of {questions.length}!
            </p>
            <p className="text-lg text-gray-800">
              {score === questions.length
                ? "Perfect score! You know me so well! 💖"
                : score >= questions.length / 2
                ? "Great job! We're meant to be! 💕"
                : "Keep learning about me! 💝"}
            </p>
            <button
              onClick={resetQuiz}
              className="px-8 py-4 bg-red-700 text-white rounded-xl shadow-lg hover:bg-red-800 transition font-bold text-lg cursor-pointer"
            >
              Try Again
            </button>
          </div>
        )}
        
        <Link href="/wrapped" className="block mt-8 text-red-700 hover:text-red-800 font-bold text-lg cursor-pointer">
          Back to Wrapped
        </Link>
      </div>
    </main>
  );
} 