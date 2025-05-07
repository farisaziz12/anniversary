import { motion } from 'framer-motion';

export default function FloatingHearts() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute text-red text-2xl"
          initial={{ y: '100vh', x: `${Math.random() * 100}%`, opacity: 0 }}
          animate={{ y: '-10vh', opacity: 1 }}
          transition={{ duration: 8 + Math.random() * 4, delay: i * 0.3, repeat: Infinity }}
        >❤️</motion.div>
      ))}
    </div>
  );
}