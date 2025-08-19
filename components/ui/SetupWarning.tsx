"use client";
import { FiAlertTriangle, FiExternalLink } from "react-icons/fi";

export default function SetupWarning() {
  return (
    <section className="py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="relative bg-gradient-to-r from-yellow-50 to-orange-50 border-2 border-yellow-200 rounded-2xl p-6 shadow-lg overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-200 rounded-full -translate-y-16 translate-x-16 opacity-20" />
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-orange-200 rounded-full translate-y-12 -translate-x-12 opacity-20" />
          
          <div className="relative z-10">
            <div className="flex items-center justify-center w-16 h-16 bg-yellow-100 rounded-full mb-6 mx-auto">
              <FiAlertTriangle className="w-8 h-8 text-yellow-600" />
            </div>

            <h3 className="text-xl sm:text-2xl font-bold text-center text-gray-900 mb-3">
              ⚠️ Setup Required
            </h3>

            <div className="text-center space-y-4">
              <p className="text-lg text-gray-700 leading-relaxed">
                Before you can use QuickDapp&apos;s full potential, you need to configure your Thirdweb credentials.
              </p>
              
              <div className="bg-white/60 rounded-lg p-4 border border-yellow-200">
                <p className="text-gray-800 font-medium mb-2">
                  Follow these simple steps:
                </p>
                <ol className="text-left text-gray-700 space-y-2 max-w-md mx-auto">
                  <li className="flex items-start">
                    <span className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-semibold mr-3 mt-0.5 flex-shrink-0">1</span>
                    <span>Visit the Thirdweb Dashboard below</span>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-semibold mr-3 mt-0.5 flex-shrink-0">2</span>
                    <span>Get your Client ID and Secret Key</span>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-semibold mr-3 mt-0.5 flex-shrink-0">3</span>
                    <span>Create <code className="bg-gray-200 px-1 rounded text-sm">.env.local</code> and add your keys</span>
                  </li>
                </ol>
              </div>

              <div className="pt-4">
                <a
                  href="https://thirdweb.com/dashboard"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 group"
                >
                  <span className="mr-2">Go to Thirdweb Dashboard</span>
                  <FiExternalLink className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}