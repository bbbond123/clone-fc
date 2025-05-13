const plugin = require('tailwindcss/plugin')

module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        globalBg: '#15172c', // 全局背景色
        primary: '#8792f1', // 蓝色
        accent: '#7349ca', //  紫色
        bgDark: '#1c203c', //  深色背景
        btn: '#4b56bc', // 按钮颜色
        inactiveText: '#9ca1c7', // 灰色 文字按钮
        activeText: '#ffffff', // 白色 文字按钮
        highlight: '#432ac0', // 幸运开箱高亮颜色
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
      boxShadow: {
        'weapon-highlight': '0 0 55px 30px #432ac0',
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
      })
    }),
    plugin(function({ addComponents, theme }) {
      addComponents({
        '.weapon-highlight': {
          '&::before': {
            content: '""',
            position: 'absolute',
            top: '50%',
            left: '50%',
            width: '2px',
            height: '2px',
            borderRadius: '50%',
            transform: 'translate(-50%, -50%)',
            background: 'rgba(67, 42, 192, 0.3)',
            boxShadow: '0 0 55px 30px #432ac0',
          }
        }
      })
    })
  ],
}
