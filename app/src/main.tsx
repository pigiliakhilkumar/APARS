import { StrictMode, useEffect } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router'
import './index.css'
import App from './App.tsx'

function DarkModeInit() {
  useEffect(() => {
    const stored = localStorage.getItem('apars_dark_mode');
    if (stored !== null) {
      const mode = JSON.parse(stored);
      if (mode) {
        document.documentElement.classList.add('dark');
      }
    } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      document.documentElement.classList.add('dark');
    }
  }, []);
  return null;
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <DarkModeInit />
      <App />
    </BrowserRouter>
  </StrictMode>,
)
