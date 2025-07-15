module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{ts,tsx}"
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#A47C48', // brown
          dark: '#805F38'
        },
        beige: {
          50: '#F8F1E6',
          100: '#F5E9D3'
        },
        purple: '#6B5B95',
        navy: '#2C2C54'
      }
    }
  },
  plugins: [],
};
