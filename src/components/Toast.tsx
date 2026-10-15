'use client';

import { CheckCircle2, Info, AlertTriangle } from 'lucide-react';
import { useApp } from '@/context/AppContext';

export default function ToastContainer() {
  const { toasts } = useApp();

  const icons = {
    success: <CheckCircle2 size={18} className="text-neon-cyan flex-shrink-0" />,
    info: <Info size={18} className="text-neon-purple flex-shrink-0" />,
    warning: <AlertTriangle size={18} className="text-yellow-400 flex-shrink-0" />,
  };

  return (
    <div className="toast-container">
      {toasts.map((toast) => (
        <div key={toast.id} className={`toast ${toast.type}`}>
          {icons[toast.type]}
          <span>{toast.message}</span>
        </div>
      ))}
    </div>
  );
}