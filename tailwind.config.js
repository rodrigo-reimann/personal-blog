/** @type {import('tailwindcss').Config} */
module.exports = {
  // Here, we set darkMode to 'class' to enable dark mode using the class attribute. 
  // This means that when dark mode is enabled, the dark class will be added to the html element, 
  // and we can use this class to apply different styles for dark mode.
  darkMode: 'class',
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};
