import { useRouter } from 'next/router';
import Link from 'next/link';
import FloatingHearts from '../components/FloatingHearts';
import FlipCard from '../components/FlipCard';

const poems = [
  {
    title: "First Date in NYC",
    content: "The city lights from the rooftop view,\nA nervous first attempt, then you\nShowed me how it's meant to be.\nTimes Square glowed differently that night,\nAs we found our rhythm, just right.",
    color: "bg-gradient-to-br from-rose-600 via-red-500 to-rose-700",
    textColor: "text-white"
  },
  {
    title: "Bath House Date",
    content: "The steam rose gently at Bath House,\nAs we shared ramen, quiet and close.\nThe Flatiron's spa held our secrets,\nEach moment building, each touch perfect.\nNew York held us in its embrace.",
    color: "bg-gradient-to-br from-amber-400 via-amber-500 to-amber-600",
    textColor: "text-white"
  },
  {
    title: "Geneva Reunion",
    content: "Geneva's airport, a familiar scene,\nYet my heart raced as if it were new.\nI ran to you, and in that moment,\nAll the distance between us fell away.\nYour smile, my favorite welcome home.",
    color: "bg-gradient-to-br from-emerald-600 via-green-500 to-emerald-700",
    textColor: "text-white"
  },
  {
    title: "Swiss Adventures",
    content: "The mountains stood silent as we drove,\nThrough tunnels and snow-covered roads.\nThe chalet welcomed us with warmth,\nAs ice skating and laughter filled the air.\nSwitzerland became our shared story.",
    color: "bg-gradient-to-br from-rose-600 via-red-500 to-rose-700",
    textColor: "text-white"
  },
  {
    title: "Milano X Columbia",
    content: "Milano Market's familiar scent,\nYour favorite sandwich, time well spent.\nAt Columbia, your special spot,\nWhere hours passed without a thought.\nThese places now hold our memories.",
    color: "bg-gradient-to-br from-amber-400 via-amber-500 to-amber-600",
    textColor: "text-white"
  },
  {
    title: "Your Smile",
    content: "Your smile, a quiet constant in my day,\nTurning chaos into calm, in its own way.\nThe world's noise fades when you're near,\nAnd suddenly everything becomes clear.\nTogether, we find our perfect pace.",
    color: "bg-gradient-to-br from-emerald-600 via-green-500 to-emerald-700",
    textColor: "text-white"
  }
];

export default function Poems() {
  const router = useRouter();
  const fromSection = router.query.from ? parseInt(router.query.from as string) : 2;

  return (
    <main className="relative min-h-screen px-6 py-12 bg-gradient-to-b from-black to-gray-900">
      <FloatingHearts />
      <div className="relative z-10">
        <h2 className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-amber-400 via-red-500 to-green-500 text-transparent bg-clip-text">
          Our Story in Poems
        </h2>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto">
          {poems.map((poem, idx) => (
            <FlipCard
              key={idx}
              title={poem.title}
              content={poem.content}
              color={poem.color}
              textColor={poem.textColor}
            />
          ))}
        </div>
        <div className="mt-12 text-center">
          <Link 
            href={{
              pathname: '/wrapped',
              query: { section: fromSection }
            }}
            className="inline-block px-8 py-4 bg-gradient-to-r from-amber-400 via-red-500 to-green-500 text-white rounded-full font-semibold shadow-lg hover:opacity-90 transition-opacity"
          >
            Back to Wrapped
          </Link>
        </div>
      </div>
    </main>
  );
}