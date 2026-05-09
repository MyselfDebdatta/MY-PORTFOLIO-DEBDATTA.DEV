import { motion } from 'framer-motion';

const interests = [
  '🎨 UI/UX Design',
  '🚀 Web Development',
  '🎮 Gaming',
  '📚 Learning New Tech',
  '🎵 Music',
  '💡 Problem Solving',
  '🌍 Open Source',
  '☕ Coffee & Code',
  '🏋️ Fitness',
  '✈️ Traveling',
  '📸 Photography',
  '🤖 AI & ML',
];

const InterestsMarquee = () => {
  return (
    <div className="py-16 overflow-hidden relative">
      {/* Gradient masks */}
      <div className="absolute left-0 top-0 bottom-0 w-32 z-10 bg-gradient-to-r from-background to-transparent" />
      <div className="absolute right-0 top-0 bottom-0 w-32 z-10 bg-gradient-to-l from-background to-transparent" />

      {/* Row 1 - left to right */}
      <div className="flex mb-4">
        <motion.div
          className="flex gap-4 whitespace-nowrap"
          animate={{ x: ['0%', '-50%'] }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
        >
          {[...interests, ...interests].map((item, i) => (
            <span
              key={i}
              className="neon-button !px-5 !py-2.5 text-sm font-heading tracking-wide"
            >
              {item}
            </span>
          ))}
        </motion.div>
      </div>

      {/* Row 2 - right to left */}
      <div className="flex">
        <motion.div
          className="flex gap-4 whitespace-nowrap"
          animate={{ x: ['-50%', '0%'] }}
          transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
        >
          {[...interests.slice().reverse(), ...interests.slice().reverse()].map((item, i) => (
            <span
              key={i}
              className="neon-button !px-5 !py-2.5 text-sm font-heading tracking-wide"
            >
              {item}
            </span>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default InterestsMarquee;
