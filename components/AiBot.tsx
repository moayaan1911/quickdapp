"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { FiMessageSquare, FiCpu } from "react-icons/fi";
import AIChat from "./AIChat";

export default function AiBot() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Floating AI Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ duration: 0.2, delay: 0.5 }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-6 right-6 bg-gradient-to-br from-blue-500 to-purple-600 text-white p-6 rounded-full shadow-2xl hover:scale-110 hover:shadow-3xl transition-all duration-300 z-40 cursor-pointer group"
          >
            <div className="relative">
              <FiMessageSquare size={28} className="group-hover:scale-110 transition-transform duration-200" />
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
            </div>
            
            {/* Tooltip */}
            <div className="absolute bottom-full right-0 mb-2 px-3 py-1 bg-gray-900 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap pointer-events-none">
              <FiCpu className="inline-block mr-1" size={14} />
              Ask Thirdweb AI
              <div className="absolute top-full right-4 w-0 h-0 border-l-4 border-l-transparent border-r-4 border-r-transparent border-t-4 border-t-gray-900"></div>
            </div>
          </motion.button>
        )}
      </AnimatePresence>

      {/* AI Chat Modal */}
      <AIChat isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
}