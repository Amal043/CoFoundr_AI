"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, AlertCircle, Info, X } from "lucide-react";

interface Toast {
  id: string;
  message: string;
  type: "info" | "success" | "warning" | "error";
}

interface ToastContextType {
  toast: (message: string, type?: "info" | "success" | "warning" | "error") => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) throw new Error("useToast must be used within ToastProvider");
  return context;
}

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const toast = (message: string, type: "info" | "success" | "warning" | "error" = "success") => {
    const id = Math.random().toString(36).substring(2, 9);
    const newToast: Toast = { id, message, type };

    setToasts((prev) => [...prev, newToast]);

    // Automatically remove after 3.5 seconds
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3500);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const icons = {
    info: <Info className="size-4.5 text-blue-300" />,
    success: <CheckCircle2 className="size-4.5 text-emerald-300" />,
    warning: <AlertCircle className="size-4.5 text-amber-300" />,
    error: <AlertCircle className="size-4.5 text-rose-300" />,
  };

  const borderColors = {
    info: "border-blue-500/25 bg-blue-950/15",
    success: "border-emerald-500/25 bg-emerald-950/15",
    warning: "border-amber-500/25 bg-amber-950/15",
    error: "border-rose-500/25 bg-rose-950/15",
  };

  return (
    <ToastContext.Provider value={{ toast }}>
      {children}

      {/* Floating Notifications Drawer */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3.5 w-full max-w-sm pointer-events-none">
        <AnimatePresence>
          {toasts.map((t) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{ type: "spring", damping: 20, stiffness: 260 }}
              className={`flex items-start justify-between gap-3.5 rounded-2xl border p-4.5 shadow-2xl backdrop-blur-xl pointer-events-auto ${borderColors[t.type]}`}
            >
              <span className="mt-0.5 shrink-0">{icons[t.type]}</span>
              <p className="flex-1 text-xs font-semibold leading-5 text-slate-200">{t.message}</p>
              <button
                onClick={() => removeToast(t.id)}
                className="text-slate-500 hover:text-white transition shrink-0 mt-0.5"
                aria-label="Close notification"
              >
                <X className="size-3.5" />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
}
