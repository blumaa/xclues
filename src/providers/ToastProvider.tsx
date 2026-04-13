import React, { useState, useCallback, useEffect, useRef } from 'react';
import { ToastContext, ToastContextValue } from './useToast';
import './ToastProvider.css';

interface ToastData {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  title: string;
  message?: string;
  duration: number;
  dismissible: boolean;
  exiting: boolean;
}

interface ToastProviderProps {
  children?: React.ReactNode;
}

let idCounter = 0;
function generateUniqueId(): string {
  idCounter += 1;
  return `toast-${idCounter}`;
}

function createToastData(
  type: 'success' | 'error' | 'warning' | 'info',
  title: string,
  message?: string
): ToastData {
  const durationMap = {
    success: 5000,
    error: 0,
    warning: 7000,
    info: 5000,
  };

  return {
    id: generateUniqueId(),
    type,
    title,
    message,
    duration: durationMap[type],
    dismissible: true,
    exiting: false,
  };
}

const TOAST_ICONS: Record<ToastData['type'], string> = {
  success: '\u2713',
  error: '\u2715',
  warning: '!',
  info: 'i',
};

const EXIT_DURATION = 300; // matches --xclues-duration-normal (0.3s)

function Toast({ toast, onDismiss }: { toast: ToastData; onDismiss: (id: string) => void }) {
  useEffect(() => {
    if (toast.duration > 0) {
      const timer = setTimeout(() => onDismiss(toast.id), toast.duration);
      return () => clearTimeout(timer);
    }
  }, [toast.id, toast.duration, onDismiss]);

  const className = [
    'xtoast',
    `xtoast--${toast.type}`,
    toast.exiting ? 'xtoast--exiting' : '',
  ].filter(Boolean).join(' ');

  return (
    <div className={className} role="alert">
      <div className="xtoast__icon" aria-hidden="true">
        {TOAST_ICONS[toast.type]}
      </div>
      <div className="xtoast__content">
        <span className="xtoast__title">{toast.title}</span>
        {toast.message && <span className="xtoast__message">{toast.message}</span>}
      </div>
      {toast.dismissible && (
        <button className="xtoast__close" onClick={() => onDismiss(toast.id)} aria-label="Dismiss">
          &times;
        </button>
      )}
    </div>
  );
}

export function ToastProvider({ children }: ToastProviderProps) {
  const [toasts, setToasts] = useState<ToastData[]>([]);
  const exitTimers = useRef<Map<string, ReturnType<typeof setTimeout>>>(new Map());

  // Clean up exit timers on unmount
  useEffect(() => {
    const timers = exitTimers.current;
    return () => {
      timers.forEach((timer) => clearTimeout(timer));
    };
  }, []);

  const showSuccess = useCallback((title: string, message?: string) => {
    const newToast = createToastData('success', title, message);
    setToasts((prev) => [...prev, newToast]);
  }, []);

  const showError = useCallback((title: string, message?: string) => {
    const newToast = createToastData('error', title, message);
    setToasts((prev) => [...prev, newToast]);
  }, []);

  const showWarning = useCallback((title: string, message?: string) => {
    const newToast = createToastData('warning', title, message);
    setToasts((prev) => [...prev, newToast]);
  }, []);

  const showInfo = useCallback((title: string, message?: string) => {
    const newToast = createToastData('info', title, message);
    setToasts((prev) => [...prev, newToast]);
  }, []);

  const dismissToast = useCallback((id: string) => {
    // Phase 1: mark as exiting (triggers slide-out animation)
    setToasts((prev) =>
      prev.map((toast) =>
        toast.id === id ? { ...toast, exiting: true } : toast
      )
    );

    // Phase 2: remove from DOM after animation completes
    const timer = setTimeout(() => {
      setToasts((prev) => prev.filter((toast) => toast.id !== id));
      exitTimers.current.delete(id);
    }, EXIT_DURATION);

    exitTimers.current.set(id, timer);
  }, []);

  const clearAllToasts = useCallback(() => {
    // Mark all as exiting, then remove after animation
    setToasts((prev) => prev.map((toast) => ({ ...toast, exiting: true })));
    const timer = setTimeout(() => {
      setToasts([]);
    }, EXIT_DURATION);
    exitTimers.current.set('clear-all', timer);
  }, []);

  const value: ToastContextValue = {
    showSuccess,
    showError,
    showWarning,
    showInfo,
    dismissToast,
    clearAllToasts,
  };

  const visibleToasts = toasts.slice(-5);

  return (
    <ToastContext.Provider value={value}>
      {children}
      {visibleToasts.length > 0 && (
        <div className="xtoast-container">
          {visibleToasts.map((toast) => (
            <Toast key={toast.id} toast={toast} onDismiss={dismissToast} />
          ))}
        </div>
      )}
    </ToastContext.Provider>
  );
}
