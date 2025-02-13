"use client";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

interface SplitTextProps {
    text?: string;
    className?: string;
    delay?: number;
    animationFrom?: { opacity: number; y: number };
    animationTo?: { opacity: number; y: number };
    threshold?: number;
    rootMargin?: string;
    textAlign?: "left" | "right" | "center" | "justify" | "initial" | "inherit";
    onLetterAnimationComplete?: () => void;
}

const SplitText: React.FC<SplitTextProps> = ({
    text = "",
    className = "",
    delay = 0.05,
    animationFrom = { opacity: 0, y: 40 },
    animationTo = { opacity: 1, y: 0 },
    threshold = 0.1,
    rootMargin = "-100px",
    textAlign = "center",
    onLetterAnimationComplete,
}) => {
    const words = text.split(" ").map((word) => word.split(""));
    const letters = words.flat();
    const [inView, setInView] = useState(false);
    const ref = useRef<HTMLParagraphElement>(null);
    const animatedCount = useRef(0);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setInView(true);
                    if (ref.current) {
                        observer.unobserve(ref.current);
                    }
                }
            },
            { threshold, rootMargin }
        );

        if (ref.current) {
            observer.observe(ref.current);
        }

        return () => observer.disconnect();
    }, [threshold, rootMargin]);

    return (
        <p
            ref={ref}
            className={`split-parent ${className}`}
            style={{ textAlign, overflow: "hidden", display: "inline", whiteSpace: "normal", wordWrap: "break-word" }}
        >
            {words.map((word, wordIndex) => (
                <span key={wordIndex} style={{ display: "inline-block", whiteSpace: "nowrap" }}>
                    {word.map((letter, letterIndex) => {
                        const index = words
                            .slice(0, wordIndex)
                            .reduce((acc, w) => acc + w.length, 0) + letterIndex;

                        return (
                            <motion.span
                                key={index}
                                initial={animationFrom}
                                animate={inView ? animationTo : animationFrom}
                                transition={{ delay: index * delay, duration: 0.5 }}
                                style={{ display: "inline-block", willChange: "transform, opacity" }}
                                onAnimationComplete={() => {
                                    animatedCount.current += 1;
                                    if (animatedCount.current === letters.length && onLetterAnimationComplete) {
                                        onLetterAnimationComplete();
                                    }
                                }}
                            >
                                {letter}
                            </motion.span>
                        );
                    })}
                    <span style={{ display: "inline-block", width: "0.3em" }}>&nbsp;</span>
                </span>
            ))}
        </p>
    );
};

export default SplitText;