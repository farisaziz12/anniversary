import { useState } from 'react';

interface FlipCardProps {
  title: string;
  content: string;
  color: string;
  textColor: string;
}

export default function FlipCard({ title, content, color, textColor }: FlipCardProps) {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div 
      className="relative h-[300px] w-full cursor-pointer perspective-1000"
      onClick={() => setIsFlipped(!isFlipped)}
    >
      <div className={`relative w-full h-full transition-transform duration-500 transform-style-3d ${isFlipped ? 'rotate-y-180' : ''}`}>
        {/* Front of card */}
        <div className={`absolute w-full h-full backface-hidden rounded-2xl ${color} p-6 flex items-center justify-center`}>
          <h3 className={`${textColor} text-2xl font-semibold text-center`}>{title}</h3>
        </div>
        
        {/* Back of card */}
        <div className={`absolute w-full h-full backface-hidden rounded-2xl ${color} p-6 rotate-y-180`}>
          <p className={`${textColor} text-lg font-medium whitespace-pre-line leading-relaxed`}>
            {content}
          </p>
        </div>
      </div>
    </div>
  );
} 