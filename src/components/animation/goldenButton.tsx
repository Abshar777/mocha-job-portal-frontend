import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const GoldenButton = () => {
  const [textPhase, setTextPhase] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setTextPhase((prev) => (prev + 1) % 3);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const texts = ["360°", "GOLD", "PREMIUM"];

  const variants = {
    enter: (direction: number) => ({
      y: direction > 0 ? 40 : -40,
      opacity: 0
    }),
    center: {
      zIndex: 1,
      y: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      zIndex: 0,
      y: direction < 0 ? 40 : -40,
      opacity: 0
    })
  };

  return (
    <motion.button
      className="relative group overflow-hidden rounded-full px-8 py-4 
                 bg-gradient-to-r from-amber-600 via-yellow-500 to-amber-600 
                 hover:scale-105 transition-transform duration-300
                 before:absolute before:inset-0 
                 before:bg-gradient-to-r before:from-yellow-200 before:via-amber-500 before:to-yellow-200 
                 before:animate-shimmer before:bg-[length:200%_100%]
                 after:absolute after:inset-0 after:bg-gradient-to-r after:from-transparent 
                 after:via-white/25 after:to-transparent after:animate-shine"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <div className="relative z-10">
        <div className="overflow-hidden h-8">
          <AnimatePresence custom={1} mode="popLayout">
            <motion.div
              key={textPhase}
              variants={variants}
              custom={1}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                y: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.2 }
              }}
              className="h-8 flex items-center justify-center font-bold text-2xl"
            >
              <span className="text-white">
                {texts[textPhase]}
              </span>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </motion.button>
  );
};

export default GoldenButton;