"use client";
import { motion } from "motion/react";

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <motion.h1
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
              className="text-2xl font-bold text-blue-600 cursor-pointer hover:bg-gradient-to-r hover:from-blue-600 hover:via-purple-600 hover:to-cyan-500 hover:bg-clip-text hover:text-transparent"
            >
              QuickDapp
            </motion.h1>
          </div>
          
        </div>
      </div>
    </nav>
  );
}