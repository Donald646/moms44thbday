'use client';

import Image from "next/image";
import { useState, useEffect, useMemo, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Move animation variants outside component to prevent recreating on each render
const decorationAnimations = {
  topLeft: {
    rotate: [0, 10, -10, 0],
    scale: [1, 1.1, 1],
    transition: { duration: 4, repeat: Infinity }
  },
  topRight: {
    y: [-10, 10, -10],
    rotate: [0, 15, 0],
    transition: { duration: 3, repeat: Infinity }
  },
  bottomLeft: {
    scale: [1, 1.2, 1],
    transition: { duration: 2.5, repeat: Infinity }
  },
  bottomRight: {
    rotate: [-15, 15, -15],
    transition: { duration: 2, repeat: Infinity }
  }
};

const titleAnimations = {
  main: {
    y: [-2, 2, -2],
    transition: { duration: 3, repeat: Infinity }
  },
  sub: {
    scale: [1, 1.02, 1],
    transition: { duration: 2.5, repeat: Infinity, delay: 0.5 }
  }
};

export default function Home() {
  const [currentPage, setCurrentPage] = useState(0);
  const [currentReason, setCurrentReason] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  const reasons = useMemo(() => [
    {
      text: "You are the epitome of beauty",
      image: "/photos/photo.jpeg"
    },
    {
      text: "You gave birth to three beautiful children",
      image: "/photos/IMG_7136.jpeg"
    },
    {
      text: "You are what it means to be hard working and inspire us to do the same",
      image: "/photos/DSC07537.JPG"
    },
    {
      text: "You taught us nothing else matters as long as we believe in ourselves",
      image: "/photos/IMG_9049.JPG"
    },
    {
      text: "You taught us how to forgive",
      image: "/photos/IMG_5984.PNG"
    },
    {
      text: "You taught us how to never give up",
      image: "/photos/IMG_5428.jpeg"
    },
    {
      text: "You care for us",
      image: "/photos/IMG_7836.JPG"
    },
    {
      text: "You always make sure we have the best things in life",
      image: "/photos/IMG_4261.jpeg"
    },
    {
      text: "You always make sure we are happy",
      image: "/photos/IMG_4510.JPEG"
    },
    {
      text: "You showed us what it means to be loved unconditionally",
      image: "/photos/IMG_4609.JPG"
    },
    {
      text: "You accepted our faults and who we are",
      image: "/photos/IMG_7823.jpeg"
    },
    {
      text: "You encourage us to try new things",
      image: "/photos/DSC08902.JPG"
    }
  ], []);

  const totalPages = 5;

  useEffect(() => {
    setIsLoaded(true);
    const timer = setTimeout(() => {
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 3000);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  const nextReason = useCallback(() => {
    setCurrentReason((prev) => (prev + 1) % reasons.length);
  }, [reasons.length]);

  const triggerConfetti = useCallback(() => {
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 3000);
  }, []);

  const nextPage = useCallback(() => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(prev => prev + 1);
    }
  }, [currentPage, totalPages]);

  const prevPage = useCallback(() => {
    if (currentPage > 0) {
      setCurrentPage(prev => prev - 1);
    }
  }, [currentPage]);

  const handleStartCelebration = useCallback(() => {
    setCurrentPage(1);
  }, []);

  // Memoized animation variants
  const pageVariants = useMemo(() => ({
    enter: { x: '100%', opacity: 0 },
    center: { x: 0, opacity: 1 },
    exit: { x: '-100%', opacity: 0 }
  }), []);

  const pageTransition = useMemo(() => ({
    type: "tween" as const,
    ease: "anticipate",
    duration: 0.5
  }), []);

  const confettiVariants = useMemo(() => ({
    hidden: { y: -100, opacity: 0, rotate: 0, scale: 0 },
    visible: {
      y: [0, -50, typeof window !== 'undefined' ? window.innerHeight + 100 : 800],
      opacity: [0, 1, 1, 0],
      rotate: [0, 180, 360, 540],
      scale: [0, 1, 1, 0.5],
      transition: { 
        duration: 3, 
        ease: "easeOut",
        times: [0, 0.1, 0.9, 1]
      }
    }
  }), []);

  // Memoized page components
  const WelcomePage = useMemo(() => {
    const Component = () => (
      <div className="min-h-screen flex flex-col items-center justify-center p-4 sm:p-8 bg-gradient-to-br from-pink-400 via-rose-400 to-purple-500 text-white relative overflow-hidden">
        {/* Background decorations - memoized positions */}
        <motion.div
          className="absolute top-10 left-4 sm:top-20 sm:left-20 text-2xl sm:text-4xl"
          animate={decorationAnimations.topLeft}
        >
          ✨
        </motion.div>
        <motion.div
          className="absolute top-20 right-4 sm:top-32 sm:right-16 text-xl sm:text-3xl"
          animate={decorationAnimations.topRight}
        >
          💖
        </motion.div>
        <motion.div
          className="absolute bottom-20 left-4 sm:bottom-32 sm:left-16 text-xl sm:text-3xl"
          animate={decorationAnimations.bottomLeft}
        >
          🎂
        </motion.div>
        <motion.div
          className="absolute bottom-10 right-4 sm:bottom-20 sm:right-20 text-2xl sm:text-4xl"
          animate={decorationAnimations.bottomRight}
        >
          🎈
        </motion.div>

        <motion.div
          className="text-center z-10 max-w-lg mx-auto"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <motion.h1
            className="text-4xl sm:text-6xl md:text-7xl font-black mb-4 sm:mb-6 drop-shadow-lg"
            animate={titleAnimations.main}
          >
            Happy 44th
          </motion.h1>
          <motion.h2
            className="text-3xl sm:text-5xl md:text-6xl font-black mb-6 sm:mb-8 drop-shadow-lg"
            animate={titleAnimations.sub}
          >
            Birthday!
          </motion.h2>
          <motion.p
            className="text-lg sm:text-xl md:text-2xl mb-8 sm:mb-12 opacity-90 px-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.9 }}
            transition={{ delay: 1 }}
          >
            A special birthday experience for the most amazing mom ✨
          </motion.p>
          <motion.button
            onClick={handleStartCelebration}
            className="bg-white text-purple-600 px-6 sm:px-8 py-3 sm:py-4 rounded-full text-lg sm:text-xl font-bold shadow-xl transform transition-all duration-200 hover:scale-105 active:scale-95"
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.95 }}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ 
              type: "spring",
              stiffness: 200,
              delay: 1.5 
            }}
          >
            Start the Celebration! 🎉
          </motion.button>
        </motion.div>
      </div>
    );
    Component.displayName = 'WelcomePage';
    return Component;
  }, [handleStartCelebration]);

  const PhotoPage = useMemo(() => {
    const Component = () => (
      <div className="min-h-screen flex flex-col items-center justify-center p-4 sm:p-8 bg-gradient-to-br from-pink-50 to-purple-100">
        <motion.h2
          className="text-3xl sm:text-4xl md:text-5xl font-black text-transparent bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text mb-6 sm:mb-8 text-center"
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          The Birthday Star ⭐
        </motion.h2>
        
        <div className="relative mb-6 sm:mb-8">
          <motion.div
            className="absolute -inset-4 sm:-inset-6 bg-gradient-to-r from-pink-400 to-purple-500 rounded-full blur-xl opacity-30"
            animate={{ 
              scale: [1, 1.05, 1],
              rotate: [0, 180, 360]
            }}
            transition={{ duration: 8, repeat: Infinity }}
          />
          <motion.div
            className="relative bg-white p-3 sm:p-4 rounded-full shadow-2xl"
            initial={{ scale: 0, rotate: -45 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ 
              type: "spring", 
              stiffness: 100, 
              delay: 0.3 
            }}
            whileHover={{ scale: 1.02 }}
          >
            <Image
              src="/mom.JPG"
              alt="Beautiful mom"
              width={250}
              height={250}
              className="rounded-full object-cover border-4 border-pink-200 w-48 h-48 sm:w-64 sm:h-64"
              priority
            />
            <motion.div
              className="absolute -top-2 -right-2 text-2xl sm:text-3xl"
              animate={{ 
                rotate: [0, 10, -10, 0],
                scale: [1, 1.1, 1]
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              👑
            </motion.div>
            <motion.div
              className="absolute -bottom-2 -left-2 text-xl sm:text-2xl"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1.8, repeat: Infinity }}
            >
              💎
            </motion.div>
          </motion.div>
        </div>

        <motion.p
          className="text-lg sm:text-xl text-gray-700 text-center max-w-md px-4"
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          Look at this beautiful, amazing person who brings so much joy to our lives! ✨
        </motion.p>
      </div>
    );
    Component.displayName = 'PhotoPage';
    return Component;
  }, []);

  const VideosPage = useMemo(() => {
    const Component = () => (
      <div className="min-h-screen flex flex-col items-center justify-center p-4 sm:p-8 bg-gradient-to-br from-purple-50 to-blue-100">
        <motion.h2
          className="text-3xl sm:text-4xl md:text-5xl font-black text-transparent bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text mb-6 sm:mb-8 text-center"
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          A Walk Down Memory Lane 🎬
        </motion.h2>

        <div className="w-full max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
          {[1, 2, 3].map((videoNum, index) => (
            <motion.div
              key={videoNum}
              className="relative bg-white/90 backdrop-blur-sm p-3 sm:p-4 rounded-2xl shadow-xl border border-purple-200"
              initial={{ y: 50, opacity: 0, scale: 0.9 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              transition={{ 
                type: "spring", 
                stiffness: 200, 
                delay: 0.3 + index * 0.1 
              }}
              whileHover={{ scale: 1.02 }}
            >
              <motion.div
                className="absolute -inset-2 bg-gradient-to-r from-purple-400 to-blue-400 rounded-2xl blur-sm opacity-20"
                animate={{ 
                  scale: [1, 1.02, 1],
                  opacity: [0.2, 0.3, 0.2]
                }}
                transition={{ duration: 3, repeat: Infinity, delay: index * 0.5 }}
              />
              <video
                className="relative w-full h-48 sm:h-56 md:h-64 lg:h-72 xl:h-80 object-contain rounded-xl shadow-lg bg-black"
                controls
                autoPlay
                loop
                preload="metadata"
                poster={`/photos/photo.jpeg`}
              >
                <source src={`/videos/vid${videoNum}.mp4`} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
              <motion.div
                className="absolute -top-2 -right-2 text-xl sm:text-2xl bg-white/90 rounded-full p-1"
                animate={{ 
                  rotate: [0, 5, -5, 0],
                  scale: [1, 1.1, 1]
                }}
                transition={{ duration: 2, repeat: Infinity, delay: index * 0.3 }}
              >
                🎥
              </motion.div>
            </motion.div>
          ))}
        </div>

        <motion.p
          className="text-lg sm:text-xl text-gray-700 text-center max-w-2xl mt-6 sm:mt-8 px-4"
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          Precious moments captured in time, showing all the joy and love you bring to our lives! 💕
        </motion.p>
      </div>
    );
    Component.displayName = 'VideosPage';
    return Component;
  }, []);

  const ReasonsPage = useMemo(() => {
    const Component = () => (
      <div className="min-h-screen flex flex-col items-center justify-center p-4 sm:p-8 bg-gradient-to-br from-rose-50 to-pink-100">
        <motion.h2
          className="text-3xl sm:text-4xl md:text-5xl font-black text-transparent bg-gradient-to-r from-rose-600 to-pink-600 bg-clip-text mb-6 sm:mb-8 text-center"
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          Why We Love You 💕
        </motion.h2>

        <div className="w-full max-w-4xl mx-auto mb-6 sm:mb-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentReason}
              className="bg-white/90 backdrop-blur-sm p-4 sm:p-6 md:p-8 rounded-2xl sm:rounded-3xl shadow-xl border border-pink-200 mx-4"
              initial={{ x: 50, opacity: 0, scale: 0.9 }}
              animate={{ x: 0, opacity: 1, scale: 1 }}
              exit={{ x: -50, opacity: 0, scale: 0.9 }}
              transition={{ 
                type: "spring", 
                stiffness: 200, 
                damping: 25 
              }}
            >
              <div className="flex flex-col lg:flex-row items-center gap-4 sm:gap-6 lg:gap-8">
                {/* Image */}
                <motion.div
                  className="w-full lg:w-1/2 flex-shrink-0"
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  <div className="relative">
                    <motion.div
                      className="absolute -inset-2 bg-gradient-to-r from-pink-400 to-rose-400 rounded-xl blur-sm opacity-30"
                      animate={{ 
                        scale: [1, 1.02, 1],
                        opacity: [0.3, 0.5, 0.3]
                      }}
                      transition={{ duration: 3, repeat: Infinity }}
                    />
                    <Image
                      src={reasons[currentReason].image}
                      alt={`Memory for: ${reasons[currentReason].text}`}
                      width={300}
                      height={300}
                      className="relative rounded-xl object-contain w-full h-48 sm:h-56 md:h-64 lg:h-72 xl:h-80 shadow-lg border-2 border-pink-100 bg-white"
                    />
                  </div>
                </motion.div>
                
                {/* Text */}
                <div className="w-full lg:w-1/2 flex items-center justify-center px-2 sm:px-4">
                  <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-700 text-center leading-relaxed font-medium">
                    <span className="text-pink-500 text-xl sm:text-2xl md:text-3xl lg:text-4xl">&ldquo;</span>
                    {reasons[currentReason].text}
                    <span className="text-rose-500 text-xl sm:text-2xl md:text-3xl lg:text-4xl">&rdquo;</span>
                  </p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 items-center">
          <motion.button
            onClick={() => {
              nextReason();
              triggerConfetti();
            }}
            className="bg-gradient-to-r from-pink-500 to-rose-500 text-white px-6 py-3 rounded-full font-bold shadow-lg active:scale-95 transition-transform"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.95 }}
          >
            Next Reason 💖
          </motion.button>
          <div className="bg-white/80 px-4 py-2 rounded-full shadow-md">
            <span className="text-gray-700 font-bold text-sm sm:text-base">
              {currentReason + 1} of {reasons.length}
            </span>
          </div>
        </div>
      </div>
    );
    Component.displayName = 'ReasonsPage';
    return Component;
  }, [currentReason, reasons, nextReason, triggerConfetti]);

  const CelebrationPage = useMemo(() => {
    const Component = () => (
      <div className="min-h-screen flex flex-col items-center justify-center p-4 sm:p-8 bg-gradient-to-br from-yellow-100 via-pink-100 to-purple-100 relative overflow-hidden">
        <motion.h2
          className="text-3xl sm:text-4xl md:text-5xl font-black text-transparent bg-gradient-to-r from-yellow-500 via-pink-500 to-purple-500 bg-clip-text mb-6 sm:mb-8 text-center"
          animate={{ 
            scale: [1, 1.02, 1],
            rotate: [-1, 1, -1] 
          }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          Let&apos;s Celebrate! 🎉
        </motion.h2>

        <motion.div
          className="text-center mb-6 sm:mb-8 max-w-4xl mx-auto px-4"
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <motion.h3
            className="text-xl sm:text-2xl md:text-3xl font-bold text-purple-600 mb-4"
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.5 }}
          >
            Happy Birthday Mommy! ❤️
          </motion.h3>
          <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-700 leading-relaxed mb-4 px-2">
            May 30th marks another year where the world was changed for the better. Today we celebrate not just another day where a beautiful Mom was brought into this earth, but celebrate the lessons you have taught us, the love you brought into this world, and the sacrifices you have made to be where you are today.
          </p>
          <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-700 font-semibold px-2">
            Thank you for being the best Mom in the whole world. We don&apos;t know what we would do without you. We love you very much ❤️
          </p>
        </motion.div>

        <motion.button
          onClick={triggerConfetti}
          className="bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-500 text-white px-6 sm:px-8 md:px-12 py-3 sm:py-4 md:py-6 rounded-full text-lg sm:text-xl md:text-2xl font-bold shadow-2xl mb-6 sm:mb-8 active:scale-95 transition-transform"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.95 }}
          animate={{
            boxShadow: [
              "0 10px 30px rgba(0,0,0,0.2)",
              "0 15px 40px rgba(0,0,0,0.3)",
              "0 10px 30px rgba(0,0,0,0.2)"
            ]
          }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          🎊 Celebrate! 🎊
        </motion.button>

        <motion.div
          className="flex flex-wrap justify-center gap-2 sm:gap-3 md:gap-4 text-2xl sm:text-3xl md:text-4xl px-4"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          {['🎂', '🎈', '🎁', '✨', '🌟', '💐', '🎊', '🥳'].map((emoji, i) => (
            <motion.span
              key={i}
              animate={{ 
                y: [-2, 2, -2],
                rotate: [-5, 5, -5]
              }}
              transition={{
                duration: 2 + i * 0.1,
                repeat: Infinity,
                delay: i * 0.1
              }}
            >
              {emoji}
            </motion.span>
          ))}
        </motion.div>

        {/* Floating elements */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {[...Array(4)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute text-2xl sm:text-3xl opacity-30"
              style={{
                left: `${20 + i * 20}%`,
                top: `${20 + (i % 2) * 40}%`
              }}
              animate={{
                y: [-15, 15, -15],
                rotate: [0, 180, 360],
                scale: [1, 1.2, 1]
              }}
              transition={{
                duration: 4 + i * 0.5,
                repeat: Infinity,
                delay: i * 0.3
              }}
            >
              {['🎈', '🎂', '🎁', '✨'][i]}
            </motion.div>
          ))}
        </div>
      </div>
    );
    Component.displayName = 'CelebrationPage';
    return Component;
  }, [triggerConfetti]);

  const pages = useMemo(() => [WelcomePage, PhotoPage, VideosPage, ReasonsPage, CelebrationPage], [WelcomePage, PhotoPage, VideosPage, ReasonsPage, CelebrationPage]);
  const CurrentPageComponent = pages[currentPage];

  return (
    <div className="min-h-screen bg-gray-50 relative">
      {/* Confetti */}
      <AnimatePresence>
        {showConfetti && (
          <div className="fixed inset-0 overflow-hidden pointer-events-none z-50">
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute text-xl sm:text-2xl"
                style={{
                  left: `${Math.random() * 100}%`,
                  color: ['#ff69b4', '#ff1493', '#9370db', '#ba55d3', '#ff6347', '#ffd700'][Math.floor(Math.random() * 6)]
                }}
                variants={confettiVariants}
                initial="hidden"
                animate="visible"
                exit="hidden"
                transition={{ delay: i * 0.1 }}
              >
                {['🎉', '🎊', '✨', '💖', '🌟', '🎈'][Math.floor(Math.random() * 6)]}
              </motion.div>
            ))}
          </div>
        )}
      </AnimatePresence>

      {/* Main content */}
      <motion.div
        className="relative"
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoaded ? 1 : 0 }}
        transition={{ duration: 0.5 }}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPage}
            variants={pageVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={pageTransition}
          >
            <CurrentPageComponent />
          </motion.div>
        </AnimatePresence>
      </motion.div>

      {/* Navigation - only show after welcome page */}
      {currentPage > 0 && (
        <motion.div
          className="fixed bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2 sm:gap-4 z-40 px-4"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <motion.button
            onClick={prevPage}
            disabled={currentPage === 0}
            className="bg-white/95 backdrop-blur-sm text-gray-700 px-3 sm:px-4 py-2 rounded-full font-bold shadow-lg disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base active:scale-95 transition-transform"
            whileHover={{ scale: currentPage > 0 ? 1.02 : 1 }}
            whileTap={{ scale: 0.95 }}
          >
            ← Back
          </motion.button>
          
          <div className="bg-white/95 backdrop-blur-sm px-3 sm:px-4 py-2 rounded-full shadow-lg">
            <span className="text-gray-700 font-bold text-sm sm:text-base">
              {currentPage} of {totalPages - 1}
            </span>
          </div>

          <motion.button
            onClick={nextPage}
            disabled={currentPage === totalPages - 1}
            className="bg-white/95 backdrop-blur-sm text-gray-700 px-3 sm:px-4 py-2 rounded-full font-bold shadow-lg disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base active:scale-95 transition-transform"
            whileHover={{ scale: currentPage < totalPages - 1 ? 1.02 : 1 }}
            whileTap={{ scale: 0.95 }}
          >
            Next →
          </motion.button>
        </motion.div>
      )}

      {/* Page indicators - only show after welcome page */}
      {currentPage > 0 && (
        <motion.div
          className="fixed top-4 right-4 flex gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          {[...Array(totalPages - 1)].map((_, i) => (
            <motion.div
              key={i}
              className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full cursor-pointer transition-colors ${
                i === currentPage - 1 ? 'bg-pink-500' : 'bg-white/60'
              }`}
              onClick={() => setCurrentPage(i + 1)}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
            />
          ))}
        </motion.div>
      )}
    </div>
  );
}
