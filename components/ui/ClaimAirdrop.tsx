"use client";
import { useState } from "react";
import { motion } from "motion/react";
import { FiGift, FiLoader, FiCheck, FiAlertCircle } from "react-icons/fi";
import { useActiveAccount } from "thirdweb/react";
import { prepareContractCall, sendTransaction } from "thirdweb";
import { simpleUSDContract } from "@/lib/contracts";

export default function ClaimAirdrop() {
  const account = useActiveAccount();
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  // Only render if wallet is connected
  if (!account) return null;

  const handleClaimAirdrop = async () => {
    if (!account) return;

    setIsLoading(true);
    setStatus("idle");
    setErrorMessage("");

    try {
      // Prepare the contract call
      const transaction = prepareContractCall({
        contract: simpleUSDContract,
        method: "function claimAirdrop()",
        params: [],
      });

      // Send transaction
      const result = await sendTransaction({
        transaction,
        account,
      });

      console.log("Airdrop claimed successfully:", result);
      setStatus("success");
    } catch (error: unknown) {
      console.error("Error claiming airdrop:", error);
      setStatus("error");
      setErrorMessage(
        error instanceof Error ? error.message : "Failed to claim airdrop"
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-6 border border-purple-200">
          <div className="text-center">
            <div className="flex items-center justify-center mb-4">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                <FiGift className="w-6 h-6 text-white" />
              </div>
            </div>

            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              Claim Your Airdrop
            </h3>

            <p className="text-gray-600 mb-6">
              Get your free SimpleUSD tokens! One-time claim available for
              connected wallets.
            </p>

            {/* Status Messages */}
            {status === "success" && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="mb-4 p-3 bg-green-50 border border-green-200 rounded-xl flex items-center justify-center">
                <FiCheck className="w-5 h-5 text-green-600 mr-2" />
                <span className="text-green-800 font-medium">
                  Airdrop claimed successfully!
                </span>
              </motion.div>
            )}

            {status === "error" && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl">
                <div className="flex items-center justify-center mb-1">
                  <FiAlertCircle className="w-5 h-5 text-red-600 mr-2" />
                  <span className="text-red-800 font-medium">Claim Failed</span>
                </div>
                <p className="text-red-700 text-sm">{errorMessage}</p>
              </motion.div>
            )}

            {/* Claim Button */}
            <motion.button
              onClick={handleClaimAirdrop}
              disabled={isLoading || status === "success"}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`px-8 py-3 rounded-xl font-semibold text-white shadow-lg transition-all duration-300 ${
                isLoading
                  ? "bg-gray-400 cursor-not-allowed"
                  : status === "success"
                  ? "bg-green-500 cursor-not-allowed"
                  : "bg-gradient-to-r from-purple-500 to-pink-500 hover:shadow-xl"
              }`}>
              {isLoading ? (
                <div className="flex items-center">
                  <FiLoader className="w-5 h-5 animate-spin mr-2" />
                  Claiming...
                </div>
              ) : status === "success" ? (
                <div className="flex items-center">
                  <FiCheck className="w-5 h-5 mr-2" />
                  Claimed!
                </div>
              ) : (
                <div className="flex items-center cursor-pointer">
                  <FiGift className="w-5 h-5 mr-2" />
                  Claim Airdrop
                </div>
              )}
            </motion.button>

            <p className="text-xs text-gray-500 mt-4">
              💡 Make sure you&apos;re connected to Sepolia testnet
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
