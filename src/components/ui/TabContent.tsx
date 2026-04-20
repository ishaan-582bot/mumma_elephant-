import React from 'react';

interface TabContentProps {
  children: React.ReactNode;
  maxWidth?: 'max-w-2xl' | 'max-w-3xl' | 'max-w-4xl' | 'max-w-xl' | 'max-w-5xl' | 'max-w-full';
  dense?: boolean;
}

export default function TabContent({
  children,
  maxWidth = 'max-w-2xl',
  dense = false,
}: TabContentProps) {
  return (
    <div className={`mx-auto w-full ${maxWidth} px-4 sm:px-6 ${dense ? 'py-4 lg:py-6' : 'py-6 lg:py-8'}`}>
      {children}
    </div>
  );
}
