module.exports = {
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}',  // Make sure this includes your components and pages
  ],
  theme: {
    extend: {
      colors: {
        'python-blue': '#306998',
        'python-yellow': '#FFD43B',
        'python-dark': '#646464',
        'python-light': '#F8F8F2',
        'code-bg': '#282C34',
      },
      light: {
        'bg-primary': '#FFFFFF',         // Light background
        'bg-secondary4': '#F0F0F0',      // Light gray section
        'bg-secondary3': '#F5F5F5',      // Ligh ter gray
        'bg-secondary2': '#FAFAFA',      // Very light gray
        'bg-secondary1': '#F7F7F7',      // Soft light area
        'text-color': '#0A0A0C',         // Dark text
        'text-muted': '#666666',         // Muted gray text
        'bg-overlay': 'rgba(255, 255, 255, 0.8)',  // Light overlay
        'gray-border': 'rgba(150, 150, 150, 0.4)', // Subtle border
      },

      fontFamily: {
        mono: ['Menlo', 'Monaco', 'Courier New', 'monospace'],
        urbanist: ['Urbanist', 'sans-serif'],
        charmonman: ['Charmonman', 'cursive'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-in': 'slideIn 0.3s ease-out',
        'bounce-slow': 'bounce 3s infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideIn: {
          '0%': { transform: 'translateX(-10px)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
};
