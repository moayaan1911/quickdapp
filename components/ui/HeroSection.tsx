"use client";
import { motion } from "motion/react";
import { useState, useEffect } from "react";

export default function HeroSection() {
  const [text, setText] = useState("");
  const fullText = "QuickDapp";
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < fullText.length) {
      const timeout = setTimeout(() => {
        setText(fullText.slice(0, currentIndex + 1));
        setCurrentIndex(currentIndex + 1);
      }, 150);
      return () => clearTimeout(timeout);
    }
  }, [currentIndex, fullText]);

  return (
    <section className="pt-32 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-bold mb-6">
          <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-500 bg-clip-text text-transparent">
            {text}
            <motion.span
              animate={{ opacity: [1, 0] }}
              transition={{ duration: 0.8, repeat: Infinity, repeatType: "reverse" }}
              className="text-blue-600"
            >
              |
            </motion.span>
          </span>
        </h1>

        <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-gray-800 mb-4">
          Your Web3 dApp starter template
        </h2>

        <p className="text-xl sm:text-2xl text-gray-600 mb-8 max-w-2xl mx-auto">
          Next.js + Foundry + Thirdweb + AI ready
        </p>

        <div className="flex flex-wrap justify-center gap-4 text-sm sm:text-base">
          {["React", "TypeScript", "Tailwind", "Web3", "Smart Contracts", "AI Assistant"].map((tech) => (
            <span
              key={tech}
              className="px-4 py-2 bg-blue-100 text-blue-700 rounded-full font-medium shadow-sm"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}