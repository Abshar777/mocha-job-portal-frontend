"use client";

import { useState, useEffect } from "react";
import {  useAnimation } from "framer-motion";

export default function TypewriterEffect({ quotes }: { quotes: string[] }) {
  const [currentQuote, setCurrentQuote] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const controls = useAnimation();

  useEffect(() => {
    let timeout: NodeJS.Timeout;

    const typeWriter = async () => {
      for (let i = 0; i <= quotes[currentQuote].length; i++) {
        setCurrentText(quotes[currentQuote].slice(0, i));
        await new Promise((resolve) => setTimeout(resolve, 50)); // Adjust typing speed here
      }

      // Pause at the end of the quote
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Erase the quote
      for (let i = quotes[currentQuote].length; i >= 0; i--) {
        setCurrentText(quotes[currentQuote].slice(0, i));
        await new Promise((resolve) => setTimeout(resolve, 30)); // Adjust erasing speed here
      }

      // Move to the next quote
      setCurrentQuote((prev: number) => (prev + 1) % quotes.length);
    };

    timeout = setTimeout(typeWriter, 1000);

    return () => clearTimeout(timeout);
  }, [currentQuote]);

  useEffect(() => {
    controls.start({
      opacity: [0, 1, 0],
      transition: {
        duration: 0.8,
        repeat: Number.POSITIVE_INFINITY,
        ease: "linear",
      },
    });
  }, [controls]);

  return (
    <div className="min-h-[50%]  max-h-[50%]">
      <p className="text-2xl transition-all duration-300  typeWriter font-bold font-secondary">
        {currentText}
       
      </p>
    </div>
  );
}
