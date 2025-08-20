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

        <div className="mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <a
              href="/docs"
              className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Commands Guide
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </motion.div>
        </div>

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