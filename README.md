# 🚀 QuickDapp - Web3 dApp Starter Template

**Next.js + Foundry + Thirdweb + AI ready** - Your complete Web3 dApp starter template with smart contracts, wallet connectivity, and AI assistant.

## ✨ Features

🔐 **Secure** - Enterprise-grade security with Thirdweb  
🚀 **Fast** - Built with Next.js 15 and Turbopack  
⛽ **Gasless** - Account abstraction with gas sponsoring  
🌟 **Multi-chain** - Support for 50+ blockchain networks  
🤖 **AI Assistant** - Thirdweb AI integration for Web3 queries  
⚡ **Modern Stack** - TypeScript, Tailwind CSS, Motion animations

## 🏗️ Project Structure

```
quickdapp/
├── app/                          # Next.js App Router
│   ├── api/ai-chat/             # AI chat API endpoint
│   ├── globals.css              # Global styles with Tailwind
│   ├── layout.tsx               # Root layout with metadata
│   └── page.tsx                 # Main landing page
├── components/
│   ├── ui/                      # Reusable UI components
│   │   ├── HeroSection.tsx      # Hero with typewriter effect
│   │   ├── SetupWarning.tsx     # Configuration instructions
│   │   ├── AIChat.tsx           # AI assistant chat interface
│   │   ├── DemoSocialCreator.tsx # Video, social links, creator info
│   │   ├── Navbar.tsx           # Fixed navigation bar
│   │   └── BackgroundParticles.tsx # Animated background
│   └── ConnectWallet.tsx        # Multi-chain wallet connector
├── contracts/                   # Foundry smart contracts
│   ├── src/                     # Solidity source files
│   ├── test/                    # Contract tests
│   ├── script/                  # Deployment scripts
│   └── foundry.toml            # Foundry configuration
├── public/                      # Static assets
└── .env.example                # Environment variables template
```

## 🚀 Quick Start

### Prerequisites

- **Node.js** (v18 or higher)
- **npm** or **yarn** or **pnpm**
- **Foundry** - [Install here](https://book.getfoundry.sh/getting-started/installation)
- **Thirdweb Account** - [Get API keys](https://thirdweb.com/dashboard)

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/moayaan1911/quickdapp.git
   cd quickdapp
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables**

   ```bash
   cp .env.example .env.local
   ```

   Edit `.env.local` and add your Thirdweb credentials:

   ```env
   NEXT_PUBLIC_THIRDWEB_CLIENT_ID=your_client_id_here
   THIRDWEB_SECRET_KEY=your_secret_key_here
   ```

4. **Build smart contracts**

   ```bash
   cd contracts
   forge build
   cd ..
   ```

5. **Start development server**
   ```bash
   npm run dev
   ```

Visit [http://localhost:3000](http://localhost:3000) to see your dApp! 🎉

## 📜 QuickDapp Scripts

QuickDapp includes custom scripts for streamlined development:

### `npm run quickdapp-build`

**Build everything** - Compiles smart contracts and builds Next.js app

```bash
npm run quickdapp-build
```

_Equivalent to: `forge build` + `next build`_

### `npm run quickdapp-dev`

**Start development** - Compiles contracts and starts dev server

```bash
npm run quickdapp-dev
```

_Equivalent to: `forge compile` + `next dev --turbopack`_

### `npm run quickdapp-test`

**Run all tests** - Tests contracts and lints frontend code

```bash
npm run quickdapp-test
```

_Equivalent to: `forge test` + `next lint`_

### `npm run quickdapp-clean`

**Clean build artifacts** - Removes all build files

```bash
npm run quickdapp-clean
```

_Equivalent to: `forge clean` + removes `.next` and `out` directories_

## ⚙️ Configuration

### Thirdweb Setup

1. Visit [Thirdweb Dashboard](https://thirdweb.com/dashboard)
2. Create a new project
3. Copy your **Client ID** and **Secret Key**
4. Add them to your `.env.local` file

### Smart Contracts

The `contracts/` directory contains a complete Foundry setup:

- **`src/`** - Your Solidity contracts
- **`test/`** - Contract unit tests
- **`script/`** - Deployment scripts
- **`foundry.toml`** - Foundry configuration

### Wallet Configuration

QuickDapp supports 50+ blockchain networks out of the box:

- **Mainnets**: Ethereum, Polygon, BSC, Arbitrum, Optimism, Base, Avalanche
- **Testnets**: Sepolia, Mumbai, BSC Testnet, Arbitrum Sepolia, Base Sepolia
- **Layer 2s**: Polygon zkEVM, Linea, Scroll, Mantle

Add more chains in `components/ConnectWallet.tsx`.

## 🤖 AI Assistant

The AI assistant is powered by **Thirdweb AI** and can help with:

- 🔍 **Blockchain Queries** - Check balances, transaction history
- 📊 **Token Analysis** - Get token information and prices
- 🔄 **DeFi Operations** - Swap tokens, interact with protocols
- 📝 **Smart Contracts** - Deploy and interact with contracts
- 🖼️ **NFT Operations** - Mint, transfer, and analyze NFTs

### AI Features

- **Context-Aware** - Automatically includes your wallet address and chain info
- **Multi-Chain** - Works across all supported blockchain networks
- **Secure** - API calls made through secure backend endpoint
- **Real-Time** - Live chat interface with message history

## 🎨 UI Components

### Hero Section

- **Typewriter animation** for "QuickDapp" title
- **Tech stack badges** highlighting key technologies
- **Gradient text effects** and smooth animations

### AI Chat Interface

- **Real-time messaging** with loading states
- **Wallet integration** for personalized responses
- **Error handling** with configuration guidance
- **Responsive design** for all screen sizes

### Wallet Connection

- **50+ blockchain networks** with automatic switching
- **Dynamic theming** based on connection status
- **Account abstraction** with gas sponsoring
- **ENS support** for readable addresses

### Social Integration

- **GitHub repository** linking
- **Creator support** via Buy Me Coffee
- **Professional profile** with contact information
- **Demo video** showcase

## 🛠️ Development

### Adding New Components

Create components in `components/ui/` directory:

```tsx
// components/ui/MyComponent.tsx
"use client";
import { motion } from "motion/react";

export default function MyComponent() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="p-4">
      {/* Your component content */}
    </motion.div>
  );
}
```

### Smart Contract Development

1. **Create contract** in `contracts/src/`
2. **Write tests** in `contracts/test/`
3. **Compile** with `forge build`
4. **Test** with `forge test`
5. **Deploy** with `forge script`

### Environment Variables

Required environment variables:

```env
# Thirdweb Configuration
NEXT_PUBLIC_THIRDWEB_CLIENT_ID=your_client_id_here
THIRDWEB_SECRET_KEY=your_secret_key_here
```

## 📚 Tech Stack

### Frontend

- **⚡ Next.js 15** - React framework with App Router
- **🎨 Tailwind CSS** - Utility-first CSS framework
- **✨ Motion** - Animation library (Framer Motion v12)
- **🔷 TypeScript** - Type-safe JavaScript
- **🎯 React Icons** - Comprehensive icon library

### Web3

- **🌐 Thirdweb v5** - Web3 development platform
- **⚡ Ethers.js v6** - Ethereum JavaScript library
- **🔗 Multi-chain** - 50+ blockchain networks
- **🤖 Thirdweb AI** - AI assistant for Web3

### Smart Contracts

- **⚒️ Foundry** - Fast Solidity development framework
- **📝 Solidity** - Smart contract programming language
- **🧪 Forge** - Testing and deployment tools

### Development

- **📦 npm/yarn/pnpm** - Package management
- **🔧 ESLint** - Code linting and formatting
- **🏗️ Turbopack** - Fast bundler for development

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## ⭐ Support

If you found this helpful, please give it a ⭐ on GitHub and consider buying me a coffee!
