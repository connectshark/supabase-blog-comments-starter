module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: 'rgb(var(--color-primary) / <alpha-value>)',
        facebook: 'rgb(var(--color-facebook) / <alpha-value>)'
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms')
  ],
}
