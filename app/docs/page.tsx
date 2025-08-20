"use client";
import { useState, useEffect } from "react";
import { motion } from "motion/react";
import {
  FaCopy,
  FaCheck,
  FaRocket,
  FaTerminal,
  FaCode,
  FaCog,
  FaGithub,
  FaExternalLinkAlt,
  FaPalette,
  FaLink,
  FaRobot,
  FaBolt,
  FaWrench,
  FaMobile,
  FaHome,
  FaArrowUp,
  FaDownload,
  FaPlay,
  FaCubes,
  FaGlobe,
  FaEnvelope,
  FaUser,
  FaExclamationTriangle,
  FaBug,
  FaLightbulb,
  FaHeart,
  FaNodeJs,
  FaKey,
  FaDatabase,
  FaTools,
} from "react-icons/fa";
import Link from "next/link";

interface CopyButtonProps {
  text: string;
  className?: string;
}

function CopyButton({ text, className = "" }: CopyButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  return (
    <button
      onClick={handleCopy}
      className={`inline-flex items-center gap-2 px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-md transition-all duration-200 text-sm font-mono ${className}`}
      title={copied ? "Copied!" : "Copy to clipboard"}
    >
      <span className="font-mono text-xs">{text}</span>
      {copied ? (
        <FaCheck className="text-green-600 w-3 h-3" />
      ) : (
        <FaCopy className="w-3 h-3" />
      )}
    </button>
  );
}

interface CodeBlockProps {
  children: string;
  title?: string;
  language?: string;
}

function CodeBlock({ children, title }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(children);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  return (
    <div className="relative bg-gray-900 rounded-lg overflow-hidden shadow-lg">
      {title && (
        <div className="flex items-center justify-between px-4 py-2 bg-gray-800 border-b border-gray-700">
          <span className="text-gray-300 text-sm font-medium">{title}</span>
          <button
            onClick={handleCopy}
            className="flex items-center gap-2 px-2 py-1 bg-gray-700 hover:bg-gray-600 text-gray-300 rounded text-xs transition-colors"
          >
            {copied ? <FaCheck className="w-3 h-3" /> : <FaCopy className="w-3 h-3" />}
            {copied ? "Copied!" : "Copy"}
          </button>
        </div>
      )}
      <div className="relative">
        <pre className="p-4 text-green-400 font-mono text-sm overflow-x-auto">
          <code>{children}</code>
        </pre>
        {!title && (
          <button
            onClick={handleCopy}
            className="absolute top-2 right-2 p-2 bg-gray-800 hover:bg-gray-700 text-gray-300 rounded transition-colors"
          >
            {copied ? <FaCheck className="w-3 h-3" /> : <FaCopy className="w-3 h-3" />}
          </button>
        )}
      </div>
    </div>
  );
}

interface SectionProps {
  id: string;
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
}

function Section({ id, icon, title, children }: SectionProps) {
  return (
    <section id={id} className="mb-16 scroll-mt-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-blue-100 text-blue-600 rounded-lg">
            {icon}
          </div>
          <h2 className="text-3xl font-bold text-gray-900">{title}</h2>
        </div>
        {children}
      </motion.div>
    </section>
  );
}

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

function FeatureCard({ icon, title, description }: FeatureCardProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="p-6 bg-white rounded-xl shadow-md border border-gray-200 hover:shadow-lg transition-all duration-300"
    >
      <div className="flex items-center gap-3 mb-3">
        <div className="p-2 bg-blue-100 text-blue-600 rounded-lg">
          {icon}
        </div>
        <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
      </div>
      <p className="text-gray-600">{description}</p>
    </motion.div>
  );
}

interface TimelineStepProps {
  number: number;
  title: string;
  description: string;
  isLast?: boolean;
}

function TimelineStep({ number, title, description, isLast }: TimelineStepProps) {
  return (
    <div className="flex items-start gap-4">
      <div className="flex flex-col items-center">
        <motion.div
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          transition={{ duration: 0.4, delay: number * 0.1 }}
          viewport={{ once: true }}
          className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-sm"
        >
          {number}
        </motion.div>
        {!isLast && <div className="w-px h-12 bg-gray-300 mt-2" />}
      </div>
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: number * 0.1 }}
        viewport={{ once: true }}
        className="flex-1 pb-8"
      >
        <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
        <p className="text-gray-600">{description}</p>
      </motion.div>
    </div>
  );
}

export default function DocsPage() {
  const [activeSection, setActiveSection] = useState("hero");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.1, rootMargin: "-50px 0px -80% 0px" }
    );

    // Observe all sections by their IDs
    const sectionIds = [
      "hero", "quick-start", "installation", "user-flow", "post-install", 
      "environment", "smart-contracts", "features", "contributing", 
      "troubleshooting", "api", "credits", "links"
    ];

    sectionIds.forEach((id) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const navItems = [
    { id: "hero", label: "Overview", icon: <FaHome className="w-4 h-4" /> },
    { id: "quick-start", label: "Quick Start", icon: <FaRocket className="w-4 h-4" /> },
    { id: "installation", label: "Installation", icon: <FaDownload className="w-4 h-4" /> },
    { id: "user-flow", label: "User Flow", icon: <FaPlay className="w-4 h-4" /> },
    { id: "post-install", label: "Commands", icon: <FaTerminal className="w-4 h-4" /> },
    { id: "environment", label: "Environment", icon: <FaCog className="w-4 h-4" /> },
    { id: "smart-contracts", label: "Smart Contracts", icon: <FaCubes className="w-4 h-4" /> },
    { id: "features", label: "Features", icon: <FaBolt className="w-4 h-4" /> },
    { id: "contributing", label: "Contributing", icon: <FaHeart className="w-4 h-4" /> },
    { id: "troubleshooting", label: "Troubleshooting", icon: <FaBug className="w-4 h-4" /> },
    { id: "api", label: "API Reference", icon: <FaCode className="w-4 h-4" /> },
  ];

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Sidebar Navigation */}
      <aside className="fixed left-0 top-0 bottom-0 w-64 bg-white border-r border-gray-200 overflow-y-auto z-40 hidden xl:block">
        <div className="p-6">
          <Link
            href="/"
            className="flex items-center gap-2 text-blue-600 hover:text-blue-700 transition-colors mb-6"
          >
            <FaHome className="w-5 h-5" />
            <span className="font-semibold">Home</span>
          </Link>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Navigation</h3>
          <nav className="space-y-2">
            {navItems.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className={`flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  activeSection === item.id
                    ? "bg-blue-100 text-blue-700"
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                }`}
              >
                {item.icon}
                {item.label}
              </a>
            ))}
          </nav>
        </div>
      </aside>

      {/* Main Content */}
      <main className="xl:ml-64">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Hero Section */}
          <section
            id="hero"
            className="text-center mb-16 scroll-mt-8"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-5xl sm:text-6xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-500 bg-clip-text text-transparent mb-6">
                QuickDapp CLI Documentation
              </h1>
              <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                The fastest way to scaffold production-ready Web3 dApps with Next.js, Foundry, and Thirdweb
              </p>
              <div className="flex flex-wrap justify-center gap-4 mb-8">
                {navItems.slice(1, 6).map((item) => (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    className="flex items-center gap-2 px-4 py-2 bg-white hover:bg-blue-50 border border-gray-200 hover:border-blue-300 rounded-lg transition-all duration-200 text-gray-700 hover:text-blue-700"
                  >
                    {item.icon}
                    {item.label}
                  </a>
                ))}
              </div>
            </motion.div>
          </section>

          {/* Quick Start */}
          <Section
            id="quick-start"
            icon={<FaRocket className="w-6 h-6" />}
            title="Quick Start"
          >
            <div className="space-y-4">
              <p className="text-gray-600 mb-6">
                Get started with QuickDapp in seconds. Choose your preferred method:
              </p>
              
              <div className="grid gap-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Create a New Project</h3>
                  <CodeBlock title="NPX (Recommended)">npx quickdapp my-awesome-dapp</CodeBlock>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Use Current Directory</h3>
                  <CodeBlock>npx quickdapp .</CodeBlock>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Specify Package Manager</h3>
                  <CodeBlock>npx quickdapp my-project --pm pnpm</CodeBlock>
                </div>
              </div>
            </div>
          </Section>

          {/* Installation & Usage */}
          <Section
            id="installation"
            icon={<FaDownload className="w-6 h-6" />}
            title="Installation & Usage"
          >
            <div className="space-y-8">
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Create New Project</h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="text-lg font-medium text-gray-800 mb-2">NPX (Recommended)</h4>
                    <p className="text-gray-600 mb-3">Downloads and runs CLI without global install</p>
                    <div className="space-y-2">
                      <CodeBlock>npx quickdapp my-project-name</CodeBlock>
                      <CodeBlock>npx quickdapp my-crypto-wallet --pm pnpm</CodeBlock>
                      <CodeBlock>npx quickdapp trading-bot --pm npm</CodeBlock>
                      <CodeBlock>npx quickdapp defi-app --pm yarn</CodeBlock>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-lg font-medium text-gray-800 mb-2">Global Installation</h4>
                    <p className="text-gray-600 mb-3">Installs CLI globally for repeated use</p>
                    <div className="space-y-2">
                      <CodeBlock>npm install -g quickdapp</CodeBlock>
                      <CodeBlock>quickdapp my-project-name</CodeBlock>
                      <CodeBlock>quickdapp my-project --pm pnpm</CodeBlock>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-lg font-medium text-gray-800 mb-2">Current Directory</h4>
                    <p className="text-gray-600 mb-3">Creates project in current folder</p>
                    <div className="space-y-2">
                      <CodeBlock>npx quickdapp .</CodeBlock>
                      <CodeBlock>npx quickdapp . --pm pnpm</CodeBlock>
                      <CodeBlock>npx quickdapp ./ --pm yarn</CodeBlock>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-lg font-medium text-gray-800 mb-2">Interactive Mode</h4>
                    <p className="text-gray-600 mb-3">Prompts for project name if not provided</p>
                    <CodeBlock>npx quickdapp</CodeBlock>
                  </div>
                </div>
              </div>
            </div>
          </Section>

          {/* User Flow */}
          <Section
            id="user-flow"
            icon={<FaPlay className="w-6 h-6" />}
            title="User Flow (Step-by-Step)"
          >
            <div className="space-y-6">
              <p className="text-gray-600 mb-8">
                Here&apos;s what happens when you run QuickDapp CLI:
              </p>
              
              <div className="space-y-4">
                <TimelineStep
                  number={1}
                  title="Beautiful CLI Intro"
                  description="ASCII art with creator branding welcomes you to QuickDapp"
                />
                <TimelineStep
                  number={2}
                  title="Project Name"
                  description="Specify project name or use current directory"
                />
                <TimelineStep
                  number={3}
                  title="Package Manager Selection"
                  description="Choose between pnpm, npm, or yarn with descriptions"
                />
                <TimelineStep
                  number={4}
                  title="Directory Check"
                  description="Confirms if current directory is not empty"
                />
                <TimelineStep
                  number={5}
                  title="Template Cloning"
                  description="Downloads the latest template from GitHub"
                />
                <TimelineStep
                  number={6}
                  title="Dependencies Installation"
                  description="Installs all required packages using your chosen package manager"
                />
                <TimelineStep
                  number={7}
                  title="Smart Contract Setup"
                  description="Foundry installation and smart contract compilation"
                />
                <TimelineStep
                  number={8}
                  title="Auto-Build Process"
                  description="Builds contracts and Next.js application"
                />
                <TimelineStep
                  number={9}
                  title="Git Repository"
                  description="Creates a fresh git repository (detached from template)"
                />
                <TimelineStep
                  number={10}
                  title="Success Message"
                  description="Shows next steps and instructions to get started"
                  isLast
                />
              </div>
            </div>
          </Section>

          {/* Post-Installation Commands */}
          <Section
            id="post-install"
            icon={<FaTerminal className="w-6 h-6" />}
            title="Post-Installation Commands"
          >
            <div className="space-y-8">
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Navigation</h3>
                <CodeBlock title="Navigate to your project">cd my-awesome-dapp</CodeBlock>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Development Commands (pnpm)</h3>
                <div className="space-y-4">
                  <div className="grid gap-2">
                    <CodeBlock>pnpm start</CodeBlock>
                    <p className="text-sm text-gray-600">Starts production server on localhost:3000</p>
                  </div>
                  <div className="grid gap-2">
                    <CodeBlock>pnpm dev</CodeBlock>
                    <p className="text-sm text-gray-600">Starts development server with hot reload</p>
                  </div>
                  <div className="grid gap-2">
                    <CodeBlock>pnpm build</CodeBlock>
                    <p className="text-sm text-gray-600">Creates production build</p>
                  </div>
                  <div className="grid gap-2">
                    <CodeBlock>pnpm quickdapp-dev</CodeBlock>
                    <p className="text-sm text-gray-600">Compiles contracts + starts dev server with turbopack</p>
                  </div>
                  <div className="grid gap-2">
                    <CodeBlock>pnpm quickdapp-build</CodeBlock>
                    <p className="text-sm text-gray-600">Builds contracts + builds Next.js app</p>
                  </div>
                  <div className="grid gap-2">
                    <CodeBlock>pnpm quickdapp-test</CodeBlock>
                    <p className="text-sm text-gray-600">Tests contracts + lints Next.js code</p>
                  </div>
                  <div className="grid gap-2">
                    <CodeBlock>pnpm quickdapp-init</CodeBlock>
                    <p className="text-sm text-gray-600">Full setup: installs deps + builds + starts production</p>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Development Commands (npm)</h3>
                <div className="space-y-4">
                  <div className="grid gap-2">
                    <CodeBlock>npm start</CodeBlock>
                    <p className="text-sm text-gray-600">Starts production server on localhost:3000</p>
                  </div>
                  <div className="grid gap-2">
                    <CodeBlock>npm run dev</CodeBlock>
                    <p className="text-sm text-gray-600">Starts development server with hot reload</p>
                  </div>
                  <div className="grid gap-2">
                    <CodeBlock>npm run build</CodeBlock>
                    <p className="text-sm text-gray-600">Creates production build</p>
                  </div>
                  <div className="grid gap-2">
                    <CodeBlock>npm run quickdapp-dev</CodeBlock>
                    <p className="text-sm text-gray-600">Compiles contracts + starts dev server with turbopack</p>
                  </div>
                  <div className="grid gap-2">
                    <CodeBlock>npm run quickdapp-build</CodeBlock>
                    <p className="text-sm text-gray-600">Builds contracts + builds Next.js app</p>
                  </div>
                  <div className="grid gap-2">
                    <CodeBlock>npm run quickdapp-test</CodeBlock>
                    <p className="text-sm text-gray-600">Tests contracts + lints Next.js code</p>
                  </div>
                  <div className="grid gap-2">
                    <CodeBlock>npm run quickdapp-init</CodeBlock>
                    <p className="text-sm text-gray-600">Full setup: installs deps + builds + starts production</p>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Development Commands (yarn)</h3>
                <div className="space-y-4">
                  <div className="grid gap-2">
                    <CodeBlock>yarn start</CodeBlock>
                    <p className="text-sm text-gray-600">Starts production server on localhost:3000</p>
                  </div>
                  <div className="grid gap-2">
                    <CodeBlock>yarn dev</CodeBlock>
                    <p className="text-sm text-gray-600">Starts development server with hot reload</p>
                  </div>
                  <div className="grid gap-2">
                    <CodeBlock>yarn build</CodeBlock>
                    <p className="text-sm text-gray-600">Creates production build</p>
                  </div>
                  <div className="grid gap-2">
                    <CodeBlock>yarn quickdapp-dev</CodeBlock>
                    <p className="text-sm text-gray-600">Compiles contracts + starts dev server with turbopack</p>
                  </div>
                  <div className="grid gap-2">
                    <CodeBlock>yarn quickdapp-build</CodeBlock>
                    <p className="text-sm text-gray-600">Builds contracts + builds Next.js app</p>
                  </div>
                  <div className="grid gap-2">
                    <CodeBlock>yarn quickdapp-test</CodeBlock>
                    <p className="text-sm text-gray-600">Tests contracts + lints Next.js code</p>
                  </div>
                  <div className="grid gap-2">
                    <CodeBlock>yarn quickdapp-init</CodeBlock>
                    <p className="text-sm text-gray-600">Full setup: installs deps + builds + starts production</p>
                  </div>
                </div>
              </div>
            </div>
          </Section>

          {/* Environment Setup */}
          <Section
            id="environment"
            icon={<FaCog className="w-6 h-6" />}
            title="Environment Setup"
          >
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Copy Environment Template</h3>
                <CodeBlock>cp .env.local.example .env.local</CodeBlock>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Add Thirdweb API Keys</h3>
                <p className="text-gray-600 mb-4">
                  Add your Thirdweb API keys to <code className="bg-gray-100 px-2 py-1 rounded">.env.local</code>:
                </p>
                <CodeBlock title=".env.local">{`NEXT_PUBLIC_THIRDWEB_CLIENT_ID=your_client_id_here
THIRDWEB_SECRET_KEY=your_secret_key_here`}</CodeBlock>
                <div className="mt-4">
                  <a
                    href="https://thirdweb.com/dashboard"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                  >
                    <FaExternalLinkAlt className="w-4 h-4" />
                    Get API Keys from Thirdweb Dashboard
                  </a>
                </div>
              </div>
              
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h4 className="text-lg font-medium text-blue-900 mb-2">Package Manager Arguments</h4>
                <div className="space-y-2 text-blue-800">
                  <div className="flex items-start gap-2">
                    <CopyButton text="--pm pnpm" className="bg-blue-100 hover:bg-blue-200 text-blue-700" />
                    <span>Uses pnpm (fast, efficient, disk space saving)</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CopyButton text="--pm npm" className="bg-blue-100 hover:bg-blue-200 text-blue-700" />
                    <span>Uses npm (classic, most compatible)</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CopyButton text="--pm yarn" className="bg-blue-100 hover:bg-blue-200 text-blue-700" />
                    <span>Uses yarn (modern, good DX)</span>
                  </div>
                </div>
              </div>
            </div>
          </Section>

          {/* Smart Contract Commands */}
          <Section
            id="smart-contracts"
            icon={<FaCubes className="w-6 h-6" />}
            title="Smart Contract Commands"
          >
            <div className="space-y-6">
              <div className="space-y-4">
                <div className="grid gap-2">
                  <CodeBlock>cd contracts</CodeBlock>
                  <p className="text-sm text-gray-600">Navigate to contracts directory</p>
                </div>
                <div className="grid gap-2">
                  <CodeBlock>forge install</CodeBlock>
                  <p className="text-sm text-gray-600">Install contract dependencies</p>
                </div>
                <div className="grid gap-2">
                  <CodeBlock>forge build</CodeBlock>
                  <p className="text-sm text-gray-600">Compile smart contracts</p>
                </div>
                <div className="grid gap-2">
                  <CodeBlock>forge test</CodeBlock>
                  <p className="text-sm text-gray-600">Run contract tests</p>
                </div>
                <div className="grid gap-2">
                  <CodeBlock>forge script script/Counter.s.sol --rpc-url &lt;RPC_URL&gt; --broadcast</CodeBlock>
                  <p className="text-sm text-gray-600">Deploy contracts to blockchain</p>
                </div>
              </div>
            </div>
          </Section>

          {/* Features Overview */}
          <Section
            id="features"
            icon={<FaBolt className="w-6 h-6" />}
            title="Features Overview"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <FeatureCard
                icon={<FaPalette className="w-5 h-5" />}
                title="Modern UI/UX"
                description="Next.js 15 & Tailwind CSS for beautiful, responsive designs"
              />
              <FeatureCard
                icon={<FaLink className="w-5 h-5" />}
                title="Multi-Chain Support"
                description="Support for 80+ blockchains out of the box"
              />
              <FeatureCard
                icon={<FaRobot className="w-5 h-5" />}
                title="AI Web3 Assistant"
                description="Built-in chatbot to help with Web3 development"
              />
              <FeatureCard
                icon={<FaBolt className="w-5 h-5" />}
                title="Gasless Transactions"
                description="Thirdweb integration for seamless user experience"
              />
              <FeatureCard
                icon={<FaWrench className="w-5 h-5" />}
                title="Smart Contracts"
                description="Foundry-powered development environment"
              />
              <FeatureCard
                icon={<FaMobile className="w-5 h-5" />}
                title="Mobile Responsive"
                description="Optimized for all devices and screen sizes"
              />
              <FeatureCard
                icon={<FaCode className="w-5 h-5" />}
                title="TypeScript Ready"
                description="Fully typed for better developer experience"
              />
              <FeatureCard
                icon={<FaRocket className="w-5 h-5" />}
                title="Production Ready"
                description="Optimized builds and deployment configurations"
              />
            </div>
          </Section>

          {/* Contributing Guide */}
          <Section
            id="contributing"
            icon={<FaHeart className="w-6 h-6" />}
            title="Contributing Guide"
          >
            <div className="space-y-6">
              <p className="text-gray-600">
                We welcome contributions to QuickDapp! Here&apos;s how you can help make it better.
              </p>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                    <FaBug className="w-5 h-5 text-red-500" />
                    Reporting Bugs
                  </h3>
                  <p className="text-gray-600 mb-3">
                    Found a bug? Please report it on our GitHub repository with detailed information:
                  </p>
                  <ul className="list-disc list-inside space-y-1 text-gray-600 ml-4">
                    <li>Steps to reproduce the issue</li>
                    <li>Expected vs actual behavior</li>
                    <li>Environment details (OS, Node.js version, etc.)</li>
                    <li>Error logs or screenshots</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                    <FaLightbulb className="w-5 h-5 text-yellow-500" />
                    Feature Requests
                  </h3>
                  <p className="text-gray-600">
                    Have an idea for a new feature? Open an issue with the &quot;enhancement&quot; label and describe:
                  </p>
                  <ul className="list-disc list-inside space-y-1 text-gray-600 ml-4">
                    <li>The problem you&apos;re trying to solve</li>
                    <li>Your proposed solution</li>
                    <li>Alternative solutions considered</li>
                    <li>Additional context or examples</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                    <FaGithub className="w-5 h-5 text-green-500" />
                    Pull Request Process
                  </h3>
                  <ol className="list-decimal list-inside space-y-2 text-gray-600 ml-4">
                    <li>Fork the repository and create your branch from <code className="bg-gray-100 px-1 rounded">main</code></li>
                    <li>Make your changes and ensure tests pass</li>
                    <li>Update documentation if needed</li>
                    <li>Follow the existing code style and conventions</li>
                    <li>Write clear, descriptive commit messages</li>
                    <li>Submit your pull request with a detailed description</li>
                  </ol>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                    <FaTools className="w-5 h-5 text-blue-500" />
                    Development Setup
                  </h3>
                  <div className="space-y-3">
                    <CodeBlock title="Clone and setup">{`git clone https://github.com/moayaan1911/quickdapp.git
cd quickdapp-package
npm install
npm run build`}</CodeBlock>
                    <p className="text-gray-600">
                      Follow the development guidelines in the repository&apos;s CONTRIBUTING.md file.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <h4 className="text-lg font-medium text-green-900 mb-2">Code of Conduct</h4>
                <p className="text-green-800">
                  By participating in this project, you agree to abide by our Code of Conduct. 
                  Be respectful, inclusive, and collaborative in all interactions.
                </p>
              </div>
            </div>
          </Section>

          {/* Troubleshooting */}
          <Section
            id="troubleshooting"
            icon={<FaBug className="w-6 h-6" />}
            title="Troubleshooting"
          >
            <div className="space-y-6">
              <div className="space-y-6">
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <h3 className="text-lg font-semibold text-yellow-900 mb-3 flex items-center gap-2">
                    <FaNodeJs className="w-5 h-5" />
                    Node.js Version Requirements
                  </h3>
                  <p className="text-yellow-800 mb-2">QuickDapp requires Node.js 18.0.0 or higher.</p>
                  <CodeBlock>node --version</CodeBlock>
                  <p className="text-yellow-800 mt-2">
                    If you need to update Node.js, visit <a href="https://nodejs.org" className="underline">nodejs.org</a> or use a version manager like nvm.
                  </p>
                </div>
                
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <h3 className="text-lg font-semibold text-red-900 mb-3 flex items-center gap-2">
                    <FaExclamationTriangle className="w-5 h-5" />
                    Permission Errors
                  </h3>
                  <p className="text-red-800 mb-2">
                    If you encounter permission errors when installing globally:
                  </p>
                  <div className="space-y-2">
                    <CodeBlock>sudo npm install -g quickdapp</CodeBlock>
                    <p className="text-red-800 text-sm">
                      Or configure npm to use a different directory for global packages.
                    </p>
                  </div>
                </div>
                
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h3 className="text-lg font-semibold text-blue-900 mb-3 flex items-center gap-2">
                    <FaGlobe className="w-5 h-5" />
                    Network/Firewall Issues
                  </h3>
                  <p className="text-blue-800 mb-2">
                    If you&apos;re behind a corporate firewall or experiencing network issues:
                  </p>
                  <ul className="list-disc list-inside space-y-1 text-blue-800 ml-4">
                    <li>Configure npm proxy settings if needed</li>
                    <li>Try using a different registry: <code className="bg-blue-100 px-1 rounded">npm config set registry https://registry.npmjs.org/</code></li>
                    <li>Check if your firewall blocks GitHub access</li>
                  </ul>
                </div>
                
                <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                  <h3 className="text-lg font-semibold text-purple-900 mb-3 flex items-center gap-2">
                    <FaExclamationTriangle className="w-5 h-5" />
                    Build Failures
                  </h3>
                  <p className="text-purple-800 mb-2">
                    If builds fail, try these steps:
                  </p>
                  <ol className="list-decimal list-inside space-y-1 text-purple-800 ml-4">
                    <li>Clear npm cache: <code className="bg-purple-100 px-1 rounded">npm cache clean --force</code></li>
                    <li>Delete node_modules and reinstall: <code className="bg-purple-100 px-1 rounded">rm -rf node_modules package-lock.json && npm install</code></li>
                    <li>Check for Node.js/npm version compatibility</li>
                    <li>Ensure you have sufficient disk space</li>
                  </ol>
                </div>
              </div>
            </div>
          </Section>

          {/* API Reference */}
          <Section
            id="api"
            icon={<FaCode className="w-6 h-6" />}
            title="API Reference"
          >
            <div className="space-y-6">
              <p className="text-gray-600">
                Complete CLI options and flags available in QuickDapp:
              </p>
              
              <div className="space-y-4">
                <div className="bg-white border border-gray-200 rounded-lg p-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Command Syntax</h3>
                  <CodeBlock>quickdapp [project-name] [options]</CodeBlock>
                </div>
                
                <div className="space-y-4">
                  <div className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <CopyButton text="--help" />
                      <CopyButton text="-h" />
                    </div>
                    <p className="text-gray-600">Show help information and usage examples</p>
                  </div>
                  
                  <div className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <CopyButton text="--version" />
                      <CopyButton text="-v" />
                    </div>
                    <p className="text-gray-600">Display the current version of QuickDapp CLI</p>
                  </div>
                  
                  <div className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <CopyButton text="--pm <manager>" />
                    </div>
                    <p className="text-gray-600 mb-2">Choose package manager (pnpm, npm, yarn)</p>
                    <div className="space-y-1 text-sm text-gray-500">
                      <p>Examples:</p>
                      <ul className="list-disc list-inside ml-4">
                        <li><code className="bg-gray-100 px-1 rounded">--pm pnpm</code></li>
                        <li><code className="bg-gray-100 px-1 rounded">--pm npm</code></li>
                        <li><code className="bg-gray-100 px-1 rounded">--pm yarn</code></li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Section>

          {/* Creator Credits */}
          <Section
            id="credits"
            icon={<FaUser className="w-6 h-6" />}
            title="Creator Credits"
          >
            <div className="bg-gradient-to-br from-blue-50 to-purple-50 border border-blue-200 rounded-xl p-8 text-center">
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
              >
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  Built by Mohammad Ayaan Siddiqui
                </h3>
                <p className="text-gray-600 mb-6">
                  Full-stack developer passionate about Web3 and making blockchain development accessible to everyone.
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                  <a
                    href="https://moayaan.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                  >
                    <FaGlobe className="w-4 h-4" />
                    Website
                  </a>
                  <a
                    href="mailto:moayaan.eth@gmail.com"
                    className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
                  >
                    <FaEnvelope className="w-4 h-4" />
                    Email
                  </a>
                  <a
                    href="https://github.com/moayaan1911"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 bg-gray-800 hover:bg-gray-900 text-white rounded-lg transition-colors"
                  >
                    <FaGithub className="w-4 h-4" />
                    GitHub
                  </a>
                </div>
              </motion.div>
            </div>
          </Section>

          {/* Important Links */}
          <Section
            id="links"
            icon={<FaExternalLinkAlt className="w-6 h-6" />}
            title="Important Links"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <a
                href="https://github.com/moayaan1911/quickdapp"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-all duration-200"
              >
                <FaGithub className="w-6 h-6 text-gray-700" />
                <div>
                  <h3 className="font-semibold text-gray-900">Main Template Repository</h3>
                  <p className="text-sm text-gray-600">The core QuickDapp template</p>
                </div>
                <FaExternalLinkAlt className="w-4 h-4 text-gray-400 ml-auto" />
              </a>
              
              <a
                href="https://github.com/moayaan1911/quickdapp-package"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-all duration-200"
              >
                <FaGithub className="w-6 h-6 text-gray-700" />
                <div>
                  <h3 className="font-semibold text-gray-900">CLI Package Repository</h3>
                  <p className="text-sm text-gray-600">The npm package source code</p>
                </div>
                <FaExternalLinkAlt className="w-4 h-4 text-gray-400 ml-auto" />
              </a>
              
              <a
                href="https://thirdweb.com/dashboard"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-all duration-200"
              >
                <FaKey className="w-6 h-6 text-purple-600" />
                <div>
                  <h3 className="font-semibold text-gray-900">Thirdweb Dashboard</h3>
                  <p className="text-sm text-gray-600">Get your API keys</p>
                </div>
                <FaExternalLinkAlt className="w-4 h-4 text-gray-400 ml-auto" />
              </a>
              
              <a
                href="https://npmjs.com/package/quickdapp"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-all duration-200"
              >
                <FaDatabase className="w-6 h-6 text-red-600" />
                <div>
                  <h3 className="font-semibold text-gray-900">NPM Package</h3>
                  <p className="text-sm text-gray-600">View on npm registry</p>
                </div>
                <FaExternalLinkAlt className="w-4 h-4 text-gray-400 ml-auto" />
              </a>
            </div>
          </Section>
        </div>
      </main>

      {/* Scroll to Top Button */}
      <motion.button
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        onClick={scrollToTop}
        className="fixed bottom-8 right-8 p-3 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-lg transition-colors z-50"
      >
        <FaArrowUp className="w-5 h-5" />
      </motion.button>
    </div>
  );
}