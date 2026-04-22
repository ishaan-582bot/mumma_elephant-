import React from 'react';
import { motion } from 'framer-motion';

interface TabContentProps {
  children: React.ReactNode;
  maxWidth?: 'max-w-2xl' | 'max-w-3xl' | 'max-w-4xl' | 'max-w-xl' | 'max-w-5xl' | 'max-w-full';
  dense?: boolean;
}

export const tabViewVariants = {
  container: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.05,
      },
    },
  },
  item: {
    hidden: { opacity: 0, y: 15 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.4, ease: [0.32, 0.72, 0, 1] as any }
    },
  },
};

export default function TabContent({
  children,
  maxWidth = 'max-w-2xl',
  dense = false,
}: TabContentProps) {
  return (
    <motion.div 
      variants={tabViewVariants.container}
      initial="hidden"
      animate="visible"
      className={`mx-auto w-full ${maxWidth} px-4 sm:px-8 lg:px-10 ${dense ? 'py-4 sm:py-6 lg:py-6' : 'py-6 sm:py-8 lg:py-10'}`}
    >
      {children}
    </motion.div>
  );
}
