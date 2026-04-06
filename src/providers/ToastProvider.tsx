import React, { useState, useCallback, useEffect } from 'react';
import { ToastContext, ToastContextValue } from './useToast';
import './ToastProvider.css';

interface ToastData {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  title: string;
  message?: string;
  duration: number;
  dismissible: boolean;
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
  };
}

function Toast({ toast, onDismiss }: { toast: ToastData; onDismiss: (id: string) => void }) {
  useEffect(() => {
    if (toast.duration > 0) {
      const timer = setTimeout(() => onDismiss(toast.id), toast.duration);
      return () => clearTimeout(timer);
    }
  }, [toast.id, toast.duration, onDismiss]);

  return (
    <div className={`xtoast xtoast--${toast.type}`} role="alert">
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
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

  const clearAllToasts = useCallback(() => {
    setToasts([]);
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
