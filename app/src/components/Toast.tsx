import { useUIStore } from '@/stores/uiStore';
import { CheckCircle, AlertCircle, Info, X } from 'lucide-react';

export default function Toast() {
  const toasts = useUIStore((s: UIState) => s.toasts);
  const removeToast = useUIStore((s: UIState) => s.removeToast);

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-4 right-4 z-[100] flex flex-col gap-2">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className="flex items-center gap-3 px-4 py-3 rounded-lg shadow-lg border-l-4 bg-white dark:bg-slate-800 dark:text-white min-w-[300px] max-w-[400px] animate-in slide-in-from-right-4 fade-in duration-300"
          style={{
            borderLeftColor:
              toast.type === 'success'
                ? '#10B981'
                : toast.type === 'error'
                ? '#EF4444'
                : '#2563EB',
          }}
        >
          {toast.type === 'success' && <CheckCircle className="w-5 h-5 text-emerald-500 shrink-0" />}
          {toast.type === 'error' && <AlertCircle className="w-5 h-5 text-red-500 shrink-0" />}
          {toast.type === 'info' && <Info className="w-5 h-5 text-blue-500 shrink-0" />}
          <span className="text-sm flex-1">{toast.message}</span>
          <button
            onClick={() => removeToast(toast.id)}
            className="shrink-0 p-1 hover:bg-gray-100 dark:hover:bg-slate-700 rounded"
          >
            <X className="w-4 h-4 text-gray-400" />
          </button>
        </div>
      ))}
    </div>
  );
}

interface UIState {
  toasts: { message: string; type: 'success' | 'error' | 'info'; id: number }[];
  removeToast: (id: number) => void;
}
