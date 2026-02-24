/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        warm: {
          bg: '#FAF9F7',
          surface: '#F5F3EF',
          border: '#E8E5E0',
        },
        charcoal: '#2C2A26',
        accent: '#C45C3E',
        'accent-muted': '#D97A5F',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      maxWidth: {
        'app': '420px',
      },
      boxShadow: {
        'soft': '0 2px 12px rgba(44, 42, 38, 0.06)',
        'card': '0 4px 20px rgba(44, 42, 38, 0.08)',
      },
    },
  },
  plugins: [],
}
