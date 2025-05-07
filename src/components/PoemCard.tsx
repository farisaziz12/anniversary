export default function PoemCard({ text }: { text: string }) {
  return (
    <div className="p-6 bg-gold text-red rounded-2xl shadow-lg text-xl">
      <p>{text}</p>
    </div>
  );
}