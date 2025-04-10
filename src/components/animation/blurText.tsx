import { useRef, useEffect, useState } from "react";
import { AnimatePresence, motion, Variants } from "framer-motion";

type BlurTextProps = {
  text?: string;
  delay?: number;
  className?: string;
  animateBy?: "words" | "letters";
  direction?: "top" | "bottom";
  threshold?: number;
  rootMargin?: string;
  animationFrom?: Record<string, string | number>;
  animationTo?: Record<string, string | number>;
  easing?: string;
  onAnimationComplete?: () => void;
};

const BlurText: React.FC<BlurTextProps> = ({
  text = "",
  delay = 0.2,
  className = "",
  animateBy = "words",
  direction = "top",
  threshold = 0.1,
  rootMargin = "0px",
  animationFrom,
  animationTo,
  easing = "easeOut",
  onAnimationComplete,
}) => {
  const elements = animateBy === "words" ? text.split(" ") : text.split("");
  const [inView, setInView] = useState(false);
  const ref = useRef<HTMLParagraphElement | null>(null);
  const animatedCount = useRef(0);

  const defaultFrom = {
    filter: "blur(10px)",
    opacity: 0,
    y: direction === "top" ? -50 : 50,
  };

  const defaultTo = {
    filter: "blur(0px)",
    opacity: 1,
    y: 0,
  };

  const variants: Variants = {
    hidden: animationFrom || defaultFrom,
    visible: animationTo || defaultTo,
    exit: {
      filter: "blur(10px)",
      opacity: 0,
      y: direction === "top" ? 50 : -50,
      transition: {
        duration: 0.5,
        ease: easing,
      },
    },
  };

  useEffect(() => {
    if (!ref.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.unobserve(ref.current!);
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(ref.current);

    return () => observer.disconnect();
  }, [threshold, rootMargin]);

  return (
    <div ref={ref} className={`blur-text ${className}`}>
      <AnimatePresence mode="wait">
        <motion.div
          key={text}
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1 },
            exit: { opacity: 0 },
          }}
          transition={{
            duration: 0.3,
            ease: easing,
          }}
        >
          {elements.map((element, index) => (
            <motion.span
              key={`${element}-${index}`}
              variants={variants}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              transition={{
                delay: index * delay,
                duration: 0.5,
                ease: easing,
              }}
              style={{
                display: "inline-block",
                willChange: "transform, filter, opacity",
              }}
              onAnimationComplete={() => {
                animatedCount.current += 1;
                if (
                  animatedCount.current === elements.length &&
                  onAnimationComplete
                ) {
                  onAnimationComplete();
                }
              }}
            >
              {element === " " ? "\u00A0" : element}
              {animateBy === "words" && index < elements.length - 1 && "\u00A0"}
            </motion.span>
          ))}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default BlurText;