export default function PhotoTimeline({ photos }: { photos: { src: string, caption: string }[] }) {
  return (
    <div className="space-y-12">
      {photos.map(({ src, caption }, idx) => (
        <div key={idx} className="flex flex-col items-center">
          <img src={src} alt="memory" className="rounded-lg shadow-md w-full max-w-md" />
          <p className="mt-2 text-lg">{caption}</p>
        </div>
      ))}
    </div>
  );
}