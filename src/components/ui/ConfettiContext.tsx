'use client';
import React, { createContext, useContext, useState, useCallback } from 'react';
import ConfettiEffect from './ConfettiEffect';

interface ConfettiContextType {
  triggerConfetti: () => void;
}

const ConfettiContext = createContext<ConfettiContextType | undefined>(undefined);

export function ConfettiProvider({ children }: { children: React.ReactNode }) {
  const [trigger, setTrigger] = useState(false);

  const triggerConfetti = useCallback(() => {
    setTrigger(true);
    // Reset trigger quickly so it can be re-triggered if needed
    setTimeout(() => setTrigger(false), 100);
  }, []);

  return (
    <ConfettiContext.Provider value={{ triggerConfetti }}>
      {children}
      <ConfettiEffect trigger={trigger} />
    </ConfettiContext.Provider>
  );
}

export function useConfetti() {
  const context = useContext(ConfettiContext);
  if (!context) throw new Error('useConfetti must be used within a ConfettiProvider');
  return context;
}
