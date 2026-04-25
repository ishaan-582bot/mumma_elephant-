'use client';
import React from 'react';
import { motion } from 'framer-motion';

export const tabViewVariants = {
  container: {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.08, delayChildren: 0.05 },
    },
  },
  item: {
    hidden: { opacity: 0, y: 16, scale: 0.98 },
    show: {
      opacity: 1, y: 0, scale: 1,
      transition: { type: 'spring', stiffness: 400, damping: 30 },
    },
  },
};

interface TabContentProps {
  children: React.ReactNode;
  maxWidth?: string;
}

export default function TabContent({ children, maxWidth = 'max-w-3xl' }: TabContentProps) {
  return (
    <motion.div
      variants={tabViewVariants.container}
      initial="hidden"
      animate="show"
      className={`${maxWidth} mx-auto w-full`}
    >
      {children}
    </motion.div>
  );
}
