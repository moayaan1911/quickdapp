"use client";
import { motion } from "motion/react";
// import { useState } from "react";
import { FaGithub } from "react-icons/fa";
import { SiBuymeacoffee } from "react-icons/si";
import { FiGlobe, FiUser } from "react-icons/fi";

export default function DemoSocialCreator() {
  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Social Links and Creator Info in same row */}
        <div className="grid lg:grid-cols-2 gap-8 items-start">
          {/* Social Links */}
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Connect & Support
            </h2>
            <div className="flex justify-center gap-4">
              <motion.a
                href="https://github.com/moayaan1911/quickdapp"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1, y: -8 }}
                whileTap={{ scale: 0.95 }}
                className="group relative block">
                <div className="relative p-4 bg-gradient-to-br from-gray-700 to-gray-900 rounded-xl shadow-lg">
                  <motion.div
                    whileHover={{ rotate: [0, -10, 10, 0] }}
                    transition={{ duration: 0.5 }}>
                    <FaGithub className="w-6 h-6 mx-auto text-white mb-2" />
                  </motion.div>
                  <p className="text-white text-xs font-medium">Star repo</p>
                </div>
              </motion.a>

              <motion.a
                href="https://coff.ee/moayaan.eth"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1, y: -8 }}
                whileTap={{ scale: 0.95 }}
                className="group relative block">
                <div className="relative p-4 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-xl shadow-lg">
                  <motion.div
                    whileHover={{ rotate: [0, -10, 10, 0] }}
                    transition={{ duration: 0.5 }}>
                    <SiBuymeacoffee className="w-6 h-6 mx-auto text-white mb-2" />
                  </motion.div>
                  <p className="text-white text-xs font-medium">Buy coffee</p>
                </div>
              </motion.a>
            </div>
          </div>

          {/* Creator Info */}
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Meet the Creator
            </h2>
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-4 border border-blue-100">
              <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center shadow-lg mx-auto mb-3">
                <FiUser className="w-7 h-7 text-white" />
              </div>

              <h3 className="text-lg font-semibold text-gray-800 mb-1">
                Mohammad Ayaan Siddiqui
              </h3>
              <p className="text-blue-600 font-medium text-sm mb-3">
                ♦moayaan.eth♦
              </p>

              <motion.a
                href="https://moayaan.com"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center px-3 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-medium rounded-full text-xs shadow-md hover:shadow-lg transition-all duration-300">
                <FiGlobe className="w-3 h-3 mr-1" />
                Visit Website
              </motion.a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
