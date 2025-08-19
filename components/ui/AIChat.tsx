"use client";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { FiSend, FiCpu, FiUser, FiLoader } from "react-icons/fi";
import { useActiveAccount, useActiveWalletChain } from "thirdweb/react";
import ReactMarkdown from "react-markdown";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

interface ChatContext {
  from?: string;
  chain_ids?: number[];
}

export default function AIChat() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "assistant",
      content: "Hello! I'm your Web3 AI assistant. I can help you with blockchain queries, transaction analysis, token swaps, contract interactions, and more. What would you like to know?",
      timestamp: new Date()
    }
  ]);
  const [configError, setConfigError] = useState<string | null>(null);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [shouldAutoScroll, setShouldAutoScroll] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const account = useActiveAccount();
  const activeChain = useActiveWalletChain();

  const scrollToBottom = () => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    // Only auto-scroll when we explicitly want to (after sending/receiving messages)
    if (shouldAutoScroll) {
      scrollToBottom();
      setShouldAutoScroll(false);
    }
  }, [messages, shouldAutoScroll]);

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input.trim(),
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);
    setShouldAutoScroll(true);

    try {
      // Prepare context for the AI (wallet address, chain info, etc.)
      const context: ChatContext = {};
      
      if (account?.address) {
        context.from = account.address;
        // Use the connected chain ID, fallback to Ethereum mainnet if not available
        context.chain_ids = activeChain?.id ? [activeChain.id] : [1];
      }

      const response = await fetch("/api/ai-chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: [
            {
              role: "user",
              content: userMessage.content
            }
          ],
          context
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        // Show configuration error in UI if it's a config issue
        if (response.status === 500 && data.error && data.error.includes("credentials not configured")) {
          setConfigError(data.error);
        }
        throw new Error(data.error || "Failed to get AI response");
      }
      
      // Clear any previous config errors
      setConfigError(null);

      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: data.message,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, aiResponse]);
      setIsLoading(false);
      setShouldAutoScroll(true);
    } catch (error: unknown) {
      console.error("AI Chat error:", error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: error instanceof Error ? error.message : "Sorry, I encountered an error. Please make sure your Thirdweb credentials are configured correctly.",
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
      setIsLoading(false);
      setShouldAutoScroll(true);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-6">
          <div className="flex items-center justify-center mb-3">
            <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
              <FiCpu className="w-5 h-5 text-white" />
            </div>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">
            AI Web3 Assistant
          </h2>
          <p className="text-lg text-gray-600">
            Ask questions about blockchain, analyze transactions, or get help with Web3 development
          </p>
        </div>

        {/* Configuration Error Alert */}
        {configError && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl"
          >
            <div className="flex items-center">
              <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center mr-3">
                <span className="text-red-600 text-sm">⚠️</span>
              </div>
              <div>
                <h3 className="text-red-800 font-medium">Configuration Required</h3>
                <p className="text-red-700 text-sm mt-1">{configError}</p>
                <p className="text-red-600 text-xs mt-2">
                  Please check your .env.local file and add the required Thirdweb credentials.
                </p>
              </div>
            </div>
          </motion.div>
        )}

        <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
          {/* Chat Messages */}
          <div ref={chatContainerRef} className="h-80 overflow-y-auto p-4 space-y-3">
            <AnimatePresence>
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div className={`flex items-start space-x-3 max-w-xs sm:max-w-md ${message.role === "user" ? "flex-row-reverse space-x-reverse" : ""}`}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                      message.role === "user" 
                        ? "bg-blue-500" 
                        : "bg-gradient-to-r from-purple-500 to-pink-500"
                    }`}>
                      {message.role === "user" ? (
                        <FiUser className="w-4 h-4 text-white" />
                      ) : (
                        <FiCpu className="w-4 h-4 text-white" />
                      )}
                    </div>
                    <div className={`px-4 py-2 rounded-2xl ${
                      message.role === "user"
                        ? "bg-blue-500 text-white"
                        : "bg-gray-100 text-gray-900"
                    }`}>
                      {message.role === "assistant" ? (
                        <div className="text-sm [&>*]:mb-2 [&>*:last-child]:mb-0 [&_strong]:font-bold [&_em]:italic [&_code]:bg-gray-200 [&_code]:px-1 [&_code]:py-0.5 [&_code]:rounded [&_code]:text-xs">
                          <ReactMarkdown>{message.content}</ReactMarkdown>
                        </div>
                      ) : (
                        <p className="text-sm">{message.content}</p>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
            
            {isLoading && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex justify-start"
              >
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
                    <FiCpu className="w-4 h-4 text-white" />
                  </div>
                  <div className="bg-gray-100 px-4 py-2 rounded-2xl">
                    <div className="flex items-center space-x-2">
                      <FiLoader className="w-4 h-4 animate-spin text-gray-600" />
                      <span className="text-sm text-gray-600">Thinking...</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="border-t border-gray-200 p-4">
            <div className="flex items-center space-x-3">
              <div className="flex-1">
                <textarea
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyPress}
                  placeholder={account ? "Ask about your wallet, tokens, or any Web3 question..." : "Connect your wallet first to start chatting..."}
                  className="w-full px-4 py-2 border border-gray-300 rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100 disabled:text-gray-500 disabled:cursor-not-allowed"
                  rows={1}
                  disabled={isLoading || !account}
                />
              </div>
              <motion.button
                onClick={sendMessage}
                disabled={!input.trim() || isLoading || !account}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <FiSend className="w-5 h-5" />
              </motion.button>
            </div>
            
            <p className="text-xs text-gray-500 mt-2 text-center">
              {!account ? (
                <span className="text-amber-600 font-medium">
                  🔒 Please connect your wallet above to start chatting with the AI assistant
                </span>
              ) : (
                "💡 AI assistant ready! Ask about your wallet, tokens, DeFi, transactions, and more"
              )}
            </p>
          </div>
        </div>

        <div className="text-center mt-6">
          <p className="text-gray-500 text-sm">
            Powered by Thirdweb AI • Ask about tokens, transactions, DeFi, NFTs, and more
          </p>
        </div>
      </div>
    </section>
  );
}