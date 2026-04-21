'use client';
import React, { createContext, useContext, useState, useCallback } from 'react';
import Toast from './Toast';

type ToastType = 'success' | 'warning' | 'info' | 'error' | 'default';

interface ToastContextType {
  showToast: (message: string, type?: ToastType, duration?: number, action?: { label: string; onClick: () => void }) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toast, setToast] = useState<{ message: string; type: ToastType; show: boolean; duration: number; action?: { label: string; onClick: () => void } }>({
    message: '',
    type: 'default',
    show: false,
    duration: 5000,
  });

  const showToast = useCallback((message: string, type: ToastType = 'default', duration = 5000, action?: { label: string; onClick: () => void }) => {
    setToast({ message, type, show: true, duration, action });
  }, []);

  const handleClose = useCallback(() => {
    setToast((prev) => ({ ...prev, show: false }));
  }, []);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <Toast 
        show={toast.show}
        message={toast.message}
        type={toast.type}
        duration={toast.duration}
        action={toast.action}
        onClose={handleClose}
      />
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) throw new Error('useToast must be used within a ToastProvider');
  return context;
}
