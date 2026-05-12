import { create } from 'zustand';

interface Toast {
  message: string;
  type: 'success' | 'error' | 'info';
  id: number;
}

interface UIState {
  darkMode: boolean;
  sidebarOpen: boolean;
  toasts: Toast[];
  activeTab: string;
  toggleDarkMode: () => void;
  setSidebarOpen: (open: boolean) => void;
  setActiveTab: (tab: string) => void;
  showToast: (message: string, type: 'success' | 'error' | 'info') => void;
  removeToast: (id: number) => void;
  initializeDarkMode: () => void;
}

let toastIdCounter = 0;

export const useUIStore = create<UIState>((set, get) => ({
  darkMode: false,
  sidebarOpen: false,
  toasts: [],
  activeTab: 'overview',

  toggleDarkMode: () => {
    const newMode = !get().darkMode;
    set({ darkMode: newMode });
    localStorage.setItem('apars_dark_mode', JSON.stringify(newMode));
    if (newMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  },

  setSidebarOpen: (open: boolean) => set({ sidebarOpen: open }),
  setActiveTab: (tab: string) => set({ activeTab: tab }),

  showToast: (message: string, type: 'success' | 'error' | 'info') => {
    const id = ++toastIdCounter;
    set((state: UIState) => ({
      toasts: [...state.toasts, { message, type, id }],
    }));
    setTimeout(() => {
      get().removeToast(id);
    }, 4000);
  },

  removeToast: (id: number) =>
    set((state: UIState) => ({
      toasts: state.toasts.filter((t: Toast) => t.id !== id),
    })),

  initializeDarkMode: () => {
    const stored = localStorage.getItem('apars_dark_mode');
    if (stored !== null) {
      const mode = JSON.parse(stored);
      set({ darkMode: mode });
      if (mode) {
        document.documentElement.classList.add('dark');
      }
    } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      set({ darkMode: true });
      document.documentElement.classList.add('dark');
    }
  },
}));
