import { Button } from "@/components/ui/button";
import { Home, MoveLeft } from "lucide-react";
import { motion } from "framer-motion";

export default function NotFoundPage() {
  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-white px-4 sm:px-8 py-16">
      {/* Decorative Background SVG */}
      <svg
        className="absolute top-0 left-0 w-full h-full opacity-10 z-0"
        viewBox="0 0 1024 1024"
        fill="none"
      >
        <circle cx="512" cy="512" r="512" fill="url(#grad)" />
        <defs>
          <linearGradient id="grad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#3b82f6" />
            <stop offset="100%" stopColor="#9333ea" />
          </linearGradient>
        </defs>
      </svg>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative z-10 bg-white -mt-10 shadow-xl rounded-2xl p-6 sm:p-10 w-full max-w-3xl text-center"
      >
        {/* Freepik Image */}
        <img
          src="https://img.freepik.com/free-vector/page-found-concept-illustration_114360-1869.jpg"
          alt="404 Illustration"
          className="mx-auto max-w-xs rounded-full overflow-hidden sm:max-w-sm pb-6 bg-gray-300"
        />

        {/* Title */}
        <motion.h1
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-3xl sm:text-5xl font-bold text-gray-800"
        >
          404 - Page Not Found
        </motion.h1>

        <p className="mt-4 text-gray-600 text-base sm:text-lg">
          Sorry, the page you’re looking for doesn’t exist or has been moved.
        </p>

        {/* Buttons */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button
            onClick={() => window.location.href = "/"}
            className="gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl text-base shadow-md"
          >
            <Home className="w-5 h-5" />
            Back Home
          </Button>

          <Button
            variant="outline"
            onClick={() => window.history.back()}
            className="gap-2 px-6 py-3 rounded-xl text-base border-gray-300 hover:border-gray-400"
          >
            <MoveLeft className="w-5 h-5" />
            Go Back
          </Button>
        </div>
      </motion.div>
    </div>
  );
}
