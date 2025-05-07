import { useRouter } from 'next/router';
import Link from 'next/link';
import FloatingHearts from '../components/FloatingHearts';

export default function Gallery() {
  const router = useRouter();
  const fromSection = router.query.from ? parseInt(router.query.from as string) : 1;

  const images = [
    '/images/pic1.jpg',
    '/images/pic2.jpg',
    '/images/pic3.jpg',
    '/images/pic4.jpg',
    '/images/pic5.jpg'
  ];

  return (
    <main className="relative min-h-screen px-6 py-12">
      <FloatingHearts />
      <div className="relative z-10">
        <h2 className="text-3xl font-semibold text-center mb-8">Our Photo Gallery</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {images.map((src, idx) => (
            <img
              key={idx}
              src={src}
              alt={`gallery-${idx}`}
              className="rounded-lg shadow-md hover:scale-105 transition-transform"
            />
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