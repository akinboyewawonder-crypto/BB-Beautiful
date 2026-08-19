import React from 'react';
import { useApp } from '../context/AppContext';
import { CheckCircle, AlertCircle, Info, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useApp();

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none">
      <AnimatePresence>
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.15 } }}
            className={`pointer-events-auto flex items-start gap-3 p-4 rounded-xl border shadow-xl backdrop-blur-md text-sm transition-all ${
              toast.type === 'success'
                ? 'bg-[#1E1B18]/95 text-[#FAF8F5] border-[#C8A97E]/40'
                : toast.type === 'error'
                ? 'bg-rose-950/95 text-rose-50 border-rose-800/60'
                : 'bg-[#2A2521]/95 text-[#FAF8F5] border-[#C8A97E]/20'
            }`}
          >
            {toast.type === 'success' && <CheckCircle className="w-5 h-5 text-[#C8A97E] shrink-0 mt-0.5" />}
            {toast.type === 'error' && <AlertCircle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />}
            {toast.type === 'info' && <Info className="w-5 h-5 text-[#D4AF37] shrink-0 mt-0.5" />}

            <div className="flex-1 font-medium leading-relaxed font-sans">{toast.message}</div>

            <button
              onClick={() => removeToast(toast.id)}
              className="text-[#FAF8F5]/60 hover:text-[#FAF8F5] p-0.5 transition-colors"
              aria-label="Close notification"
            >
              <X className="w-4 h-4" />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};
