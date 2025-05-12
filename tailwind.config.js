const plugin = require('tailwindcss/plugin');

module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#FF69B4', // Flamecases 粉色
        accent: '#FFD700', // Flamecases 黄色
        bgDark: '#1A1A2E', // 深色背景
      },
      screens: {
        xs: '400px',
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
      },
      fontSize: {
        base: ['1rem', { lineHeight: '1.5' }],
        lg: ['1.125rem', { lineHeight: '1.75' }],
      },
    },
  },
  plugins: [
    plugin(function ({ addBase, theme }) {
      addBase({
        html: { fontSize: theme('fontSize.base') },
        '@media (max-width: 400px)': {
          html: { fontSize: '0.875rem' },
        },
      });
    }),
  ],
}; 