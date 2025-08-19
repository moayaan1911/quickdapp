"use client";
import { motion } from "motion/react";
import { useMemo } from "react";

export default function BackgroundParticles() {
  // Generate random particles with web3/crypto themes
  const particles = useMemo(() => {
    const shapes = ["circle", "diamond", "triangle", "hexagon"];
    const colors = [
      "bg-blue-400/10", "bg-purple-400/10", "bg-cyan-400/10", 
      "bg-indigo-400/10", "bg-pink-400/10", "bg-emerald-400/10"
    ];
    
    return Array.from({ length: 50 }, (_, i) => ({
      id: i,
      shape: shapes[Math.floor(Math.random() * shapes.length)],
      color: colors[Math.floor(Math.random() * colors.length)],
      size: Math.random() * 60 + 20, // 20-80px
      initialX: Math.random() * 100, // 0-100%
      initialY: Math.random() * 100, // 0-100%
      duration: Math.random() * 20 + 15, // 15-35s
      delay: Math.random() * 10, // 0-10s delay
    }));
  }, []);

  const ParticleShape = ({ particle }: { particle: typeof particles[0] }) => {
    const shapeClasses: Record<string, string> = {
      circle: "rounded-full",
      diamond: "rotate-45 rounded-sm",
      triangle: "rounded-sm",
      hexagon: "rounded-lg",
    };

    const animationPath = {
      x: [
        `${particle.initialX}vw`,
        `${(particle.initialX + 30) % 100}vw`,
        `${(particle.initialX + 60) % 100}vw`,
        `${particle.initialX}vw`
      ],
      y: [
        `${particle.initialY}vh`,
        `${(particle.initialY + 20) % 100}vh`,
        `${(particle.initialY + 40) % 100}vh`,
        `${particle.initialY}vh`
      ],
      rotate: particle.shape === "diamond" ? [45, 135, 225, 315, 45] : [0, 90, 180, 270, 360],
      scale: [1, 1.2, 0.8, 1.1, 1],
      opacity: [0.1, 0.3, 0.1, 0.2, 0.1]
    };

    return (
      <motion.div
        className={`absolute ${particle.color} ${shapeClasses[particle.shape]} border border-white/5`}
        style={{
          width: particle.size,
          height: particle.size,
          left: 0,
          top: 0,
        }}
        animate={animationPath}
        transition={{
          duration: particle.duration,
          repeat: Infinity,
          ease: "linear",
          delay: particle.delay,
        }}
        initial={{
          x: `${particle.initialX}vw`,
          y: `${particle.initialY}vh`,
          opacity: 0.1,
        }}
      />
    );
  };

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
      {/* Web3 themed floating elements */}
      {particles.map((particle) => (
        <ParticleShape key={particle.id} particle={particle} />
      ))}

      {/* Special blockchain-themed elements */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-20 h-20 border-2 border-blue-300/20 rounded-lg"
        animate={{
          rotate: [0, 360],
          scale: [1, 1.1, 1],
          opacity: [0.1, 0.3, 0.1]
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "linear"
        }}
      />

      <motion.div
        className="absolute top-3/4 right-1/3 w-16 h-16 border-2 border-purple-300/20"
        style={{ clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)" }}
        animate={{
          rotate: [0, -360],
          y: [-20, 20, -20],
          opacity: [0.1, 0.25, 0.1]
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      <motion.div
        className="absolute top-1/2 right-1/4 w-24 h-24 border border-cyan-300/20 rounded-full"
        animate={{
          scale: [1, 1.2, 1],
          rotate: [0, 180, 360],
          opacity: [0.1, 0.2, 0.1]
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear"
        }}
      />

      {/* Ethereum-style hexagons */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={`hex-${i}`}
          className="absolute border border-indigo-300/15"
          style={{
            width: 40 + i * 5,
            height: 40 + i * 5,
            clipPath: "polygon(30% 0%, 70% 0%, 100% 50%, 70% 100%, 30% 100%, 0% 50%)",
            left: `${10 + i * 10}%`,
            top: `${5 + i * 12}%`,
          }}
          animate={{
            rotate: [0, 360],
            opacity: [0.05, 0.15, 0.05],
            scale: [1, 1.1, 1]
          }}
          transition={{
            duration: 15 + i * 2,
            repeat: Infinity,
            ease: "linear",
            delay: i * 0.5
          }}
        />
      ))}

      {/* Chain link effect */}
      <motion.div
        className="absolute top-1/3 left-1/2 transform -translate-x-1/2"
        animate={{
          y: [0, -30, 0],
          opacity: [0.1, 0.2, 0.1]
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        {[...Array(4)].map((_, i) => (
          <motion.div
            key={`chain-${i}`}
            className="w-8 h-2 bg-gray-400/10 rounded-full mb-2"
            animate={{
              scaleX: [1, 0.8, 1],
              opacity: [0.1, 0.2, 0.1]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: i * 0.2,
              ease: "easeInOut"
            }}
          />
        ))}
      </motion.div>

      {/* Gradient overlay for depth */}
      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/[0.02] to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-tr from-blue-50/5 via-transparent to-purple-50/5" />
    </div>
  );
}