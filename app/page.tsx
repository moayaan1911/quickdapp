"use client";
import Navbar from "@/components/ui/Navbar";
import HeroSection from "@/components/ui/HeroSection";
import SetupWarning from "@/components/ui/SetupWarning";
import ConnectWallet from "@/components/ConnectWallet";
import AIChat from "@/components/ui/AIChat";
import DemoSocialCreator from "@/components/ui/DemoSocialCreator";
import BackgroundParticles from "@/components/ui/BackgroundParticles";

export default function Home() {
  return (
    <div className="min-h-screen bg-white text-gray-900 overflow-hidden">
      <BackgroundParticles />
      <Navbar />
      <main className="relative z-10">
        <HeroSection />
        <SetupWarning />
        <section className="py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-8">
              Ready to Build?
            </h2>
            <p className="text-xl text-gray-600 mb-12">
              Connect your wallet and start exploring Web3 possibilities
            </p>
            <div className="flex justify-center">
              <ConnectWallet />
            </div>
            <div className="mt-8">
              <p className="text-gray-500 text-sm">
                🔐 Secure • 🚀 Fast • ⛽ Gasless • 🌟 Multi-chain • 🤖 AI Assistant
              </p>
            </div>
          </div>
        </section>
        <AIChat />
        <DemoSocialCreator />
        <footer className="py-8 px-4 sm:px-6 lg:px-8 border-t border-gray-200">
          <div className="text-center">
            <p className="text-gray-400 text-sm">
              © {new Date().getFullYear()} Mohammad Ayaan Siddiqui
            </p>
          </div>
        </footer>
      </main>
    </div>
  );
}
