/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  // Active le dark mode via la classe CSS "dark" posee sur <html>
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#2563eb',
          dark:    '#1d4ed8',
          light:   '#eff6ff',
        },
        accent:  '#f59e0b',
        navy:    '#1a2744',
        // Couleur dediee a l'assistant IA — distincte du bleu primaire
        // utilisee pour les avatars, bulles et badges du chat IA
        'ai-from': '#8b5cf6',  // violet-500
        'ai-to':   '#4f46e5',  // indigo-600
        'text-dark':  '#0f172a',
        'text-mid':   '#334155',
        'text-light': '#64748b',
        'bg-light':   '#f0f7ff',
        'border-col': '#e2e8f0',
      },
      fontFamily: {
        heading: ['Sora', 'sans-serif'],
        body:    ['DM Sans', 'sans-serif'],
      },
      borderRadius: {
        card: '14px',
        sm:   '8px',
      },
      boxShadow: {
        card:      '0 4px 24px rgba(37, 99, 235, 0.08)',
        'card-md': '0 8px 40px rgba(37, 99, 235, 0.13)',
      },
      height:  { navbar: '72px' },
      spacing: { navbar: '72px' },
    },
  },
  plugins: [],
}
