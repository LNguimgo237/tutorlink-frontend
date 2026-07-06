import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

import { ThemeProvider } from './context/ThemeContext.tsx' // Ajustez le chemin

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider>
    <App />
    </ThemeProvider>
  </StrictMode>,
  )
  const savedTheme = localStorage.getItem('tutorlink-theme');
if (savedTheme) {
  const { state } = JSON.parse(savedTheme);
  if (state?.isDark) {
    document.documentElement.classList.add('dark');
  }
}

  

