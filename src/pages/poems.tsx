import { useRouter } from 'next/router';
import Link from 'next/link';
import PoemCard from '../components/PoemCard';
import FloatingHearts from '../components/FloatingHearts';

const poems = [
  "You laugh at my worst jokes,\nStill kiss me when I'm gross,\nYou say \"ew\" and kiss me anyway—\nThat's love, I suppose.",
  "We argue, then we hug.\nWe tease, then we kiss.\nAnnick, my favorite mess.",
  "Even when you steal the covers,\nOr roll away mid-snore,\nI wake up and love you more."
];

export default function Poems() {
  const router = useRouter();
  const fromSection = router.query.from ? parseInt(router.query.from as string) : 2;

  return (
    <main className="relative min-h-screen px-6 py-12">
      <FloatingHearts />
      <div className="relative z-10">
        <h2 className="text-3xl font-semibold text-center mb-8">Poems for Annick</h2>
        <div className="grid gap-6 md:grid-cols-2 max-w-4xl mx-auto">
          {poems.map((text, idx) => (
            <PoemCard key={idx} text={text} />
          ))}
        </div>
        <div className="mt-8 text-center">
          <Link 
            href={{
              pathname: '/wrapped',
              query: { section: fromSection }
            }}
            className="inline-block px-8 py-4 bg-white/20 backdrop-blur-sm text-white rounded-full font-semibold shadow-lg hover:bg-white/30 transition-colors"
          >
            Back to Wrapped
          </Link>
        </div>
      </div>
    </main>
  );
}