/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    './index.html'
  ],
  theme: {
    extend: {},
    colors: {
      'transparent': 'transparent',
      'c-body': 'var(--body-color)',
      'c-container': 'var(--container-color)',
      'c-title': 'var(--title-color)',
    }
  },
  plugins: [],
}

