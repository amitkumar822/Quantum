import React, { useEffect, useState } from "react";
import { Menu, X, User, LogIn } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSelector } from "react-redux";
import { Link } from "react-router";
import { motion, AnimatePresence } from "framer-motion";
import { Rocket } from "lucide-react";
import Logout from "@/components/Logout";

const Header = () => {
  const { isAuthenticated, role } = useSelector((state) => state.auth);

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogOut = () => {
    localStorage.clear();
    window.location.reload();
  };

  return (
    <header
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled ? "bg-white shadow-md py-2" : "bg-transparent py-4"
      }`}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex justify-between items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Link to="/" className="flex items-center">
              <Rocket className="h-8 w-8 text-primary" />
              <span className="ml-2 text-2xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
                Quantum
              </span>
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {["Home", "Services", "About", "Work", "Contact"].map((item) => (
              <Link
                to={
                  item.toLowerCase() === "home" ? "/" : `/${item.toLowerCase()}`
                }
                key={item}
              >
                <motion.span
                  whileHover={{ scale: 1.05, color: "#6D28D9" }}
                  className="font-medium text-gray-700 hover:text-primary transition-colors"
                >
                  {item}
                </motion.span>
              </Link>
            ))}
          </nav>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="hidden md:block"
          >
            <div className="hidden md:flex items-center space-x-1">
              {isAuthenticated ? (
                <>
                  <Logout />
                  <Link to="/dashboard">
                    <Button>Dashboard</Button>
                  </Link>
                </>
              ) : (
                <>
                  <Link to="/login">
                    <Button
                      variant="ghost"
                      className="text-white hover:text-white/60 bg-blue-600 hover:bg-blue-700 ease-in-out duration-300 cursor-pointer"
                    >
                      <LogIn className="w-4 h-4 mr-2" />
                      Login
                    </Button>
                  </Link>
                  <Link to="/register">
                    <Button className=" hover:bg-gray-100 cursor-pointer bg-gradient-to-r from-primary to-purple-600 text-white">
                      <User className="w-4 h-4 mr-2" />
                      Sign Up
                    </Button>
                  </Link>
                </>
              )}
            </div>
          </motion.div>

          {/* Mobile menu button */}
          <button
            className="md:hidden focus:outline-none"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <div
              className={`w-6 flex flex-col gap-1 transition-all ${
                isMenuOpen ? "transform rotate-90" : ""
              }`}
            >
              <span
                className={`h-0.5 w-full bg-gray-700 transition-all ${
                  isMenuOpen ? "transform rotate-45 translate-y-1.5" : ""
                }`}
              ></span>
              <span
                className={`h-0.5 w-full bg-gray-700 transition-all ${
                  isMenuOpen ? "opacity-0" : ""
                }`}
              ></span>
              <span
                className={`h-0.5 w-full bg-gray-700 transition-all ${
                  isMenuOpen ? "transform -rotate-45 -translate-y-1.5" : ""
                }`}
              ></span>
            </div>
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden overflow-hidden bg-white"
          >
            <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
              {["Home", "Services", "About", "Work", "Contact"].map((item) => (
                <motion.a
                  key={item}
                  whileHover={{ scale: 1.05, color: "#6D28D9" }}
                  className="font-medium text-gray-700 hover:text-primary transition-colors"
                  href={`#${item.toLowerCase()}`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item}
                </motion.a>
              ))}
              <>
                {isAuthenticated ? (
                  <>
                    <Logout />

                    <Button>Dashboard</Button>
                  </>
                ) : (
                  <>
                    <Link to="/login">
                      <Button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        variant="ghost"
                        className="text-white w-full hover:text-white/60 bg-blue-600 hover:bg-blue-700 ease-in-out duration-300 cursor-pointer"
                      >
                        <LogIn className="w-4 h-4 mr-2" />
                        Login
                      </Button>
                    </Link>
                    <Link to="/register">
                      <Button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="w-full hover:bg-gray-100 cursor-pointer bg-gradient-to-r from-primary to-purple-600 text-white"
                      >
                        <User className="w-4 h-4 mr-2" />
                        Sign Up
                      </Button>
                    </Link>
                  </>
                )}
              </>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
