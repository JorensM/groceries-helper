/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'background': "#FAF9F6",
        'foreground': '#111827',
        'destructive': '#ef4444',
        'primary': '#10b981',
        'accent': '#083344'
      }
    },
  },
  plugins: [],
}