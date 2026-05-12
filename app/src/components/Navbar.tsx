import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useUIStore } from '@/stores/uiStore';
import {
  FlaskConical,
  Home,
  Microscope,
  FileText,
  Users,
  Mail,
  Code,
  HelpCircle,
  Moon,
  Sun,
  Menu,
  X,
} from 'lucide-react';

const NAV_LINKS = [
  { to: '/', label: 'Home', icon: Home },
  { to: '/analyze', label: 'Analyze', icon: Microscope },
  { to: '/documentation', label: 'Docs', icon: FileText },
  { to: '/about', label: 'About', icon: Users },
  { to: '/contact', label: 'Contact', icon: Mail },
  { to: '/api-docs', label: 'API', icon: Code },
  { to: '/help', label: 'Help', icon: HelpCircle },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const darkMode = useUIStore((s: UIState) => s.darkMode);
  const toggleDarkMode = useUIStore((s: UIState) => s.toggleDarkMode);
  const location = useLocation();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2.5 shrink-0">
            <div className="w-9 h-9 rounded-lg bg-blue-600 flex items-center justify-center">
              <FlaskConical className="w-5 h-5 text-white" />
            </div>
            <div className="flex items-baseline gap-1">
              <span className="text-xl font-bold text-slate-800 dark:text-white tracking-tight">
                APARS
              </span>
              <span className="hidden sm:inline text-[10px] font-medium text-blue-600 dark:text-blue-400 uppercase tracking-wider">
                Protein Analysis
              </span>
            </div>
          </Link>

          <div className="hidden lg:flex items-center gap-1">
            {NAV_LINKS.map((link) => {
              const isActive = location.pathname === link.to;
              return (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? 'text-blue-600 bg-blue-50 dark:bg-blue-900/20 dark:text-blue-400'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50 dark:text-slate-300 dark:hover:text-white dark:hover:bg-slate-800'
                  }`}
                >
                  <link.icon className="w-4 h-4" />
                  {link.label}
                </Link>
              );
            })}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-lg text-slate-500 hover:text-slate-900 hover:bg-slate-100 dark:text-slate-400 dark:hover:text-white dark:hover:bg-slate-800 transition-colors"
              aria-label="Toggle dark mode"
            >
              {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>

            <Link
              to="/analyze"
              className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors"
            >
              <Microscope className="w-4 h-4" />
              Analyze
            </Link>

            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden p-2 rounded-lg text-slate-500 hover:text-slate-900 hover:bg-slate-100 dark:text-slate-400 dark:hover:text-white dark:hover:bg-slate-800"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {mobileOpen && (
        <div className="lg:hidden border-t border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900">
          <div className="px-4 py-3 space-y-1">
            {NAV_LINKS.map((link) => {
              const isActive = location.pathname === link.to;
              return (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={() => setMobileOpen(false)}
                  className={`flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? 'text-blue-600 bg-blue-50 dark:bg-blue-900/20 dark:text-blue-400'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50 dark:text-slate-300 dark:hover:text-white dark:hover:bg-slate-800'
                  }`}
                >
                  <link.icon className="w-4 h-4" />
                  {link.label}
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </nav>
  );
}

interface UIState {
  darkMode: boolean;
  toggleDarkMode: () => void;
}
