import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowUp } from 'lucide-react';

import Header from './components/Header';
import Hero from './components/Hero';
import Features from './components/Features';
import Courses from './components/Courses';
import Competition from './components/Competition';
import LiveClasses from './components/LiveClasses';
import Testimonials from './components/Testimonials';
import ProblemsetPage from '../problemset/Problemset';
import Footer from './components/Footer';

function LandingPage() {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 200);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="relative min-h-screen bg-slate-50 text-slate-800"
    >
      <Header />
      <main>
        <Hero />
        <Features />
        <Courses />
        <Competition />
        <LiveClasses />
        <ProblemsetPage/>

      </main>
      <Footer />

      {showScrollTop && (
  <motion.button
    onClick={scrollToTop}
    whileHover={{
      scale: 1.1,
      boxShadow: '0 0 12px rgba(99, 102, 241, 0.6)', 
    }}
    whileTap={{ scale: 0.95 }}
    initial={{ opacity: 0, y: 50 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: 50 }}
    transition={{ duration: 0.4, type: 'spring', stiffness: 300 }}
    className="fixed bottom-6 right-6 z-50 w-12 h-12 rounded-full bg-indigo-600 text-white shadow-lg hover:bg-indigo-700 transition-colors duration-300"
    aria-label="Scroll to top"
  >
    <ArrowUp className="w-5 h-5 mx-auto" />
  </motion.button>
)}

    </motion.div>
  );
}

export default LandingPage;