/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [
    // Import daisyui plugin
    // eslint-disable-next-line no-undef
    require("daisyui")
  ],
}
