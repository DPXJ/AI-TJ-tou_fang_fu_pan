/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        dark: {
          bg: '#0a0e27',
          surface: '#131b3d',
          card: '#1a2447',
          border: '#253159',
          text: '#e2e8f0',
          textSecondary: '#94a3b8',
          accent: '#3b82f6',
          accentHover: '#2563eb',
          danger: '#ef4444',
          success: '#10b981',
          warning: '#f59e0b',
        }
      }
    },
  },
  plugins: [],
}

