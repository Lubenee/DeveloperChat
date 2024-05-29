/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      boxShadow: {
        "4xl":
          "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
      },
      colors: {
        'purple-700': '#6B46C1', // Custom purple color
        'blue-200': '#EBF8FF', // Custom blue color
      },

      margin: {
        '1': '0.25rem',
        '2': '0.5rem',
        '3': '0.75rem',
        '4': '1rem',
        '5': '1.25rem',
        '6': '1.5rem',
        '8': '2rem',
        '10': '2.5rem',
        '12': '3rem',
        '16': '4rem',
        '20': '5rem',
        '24': '6rem',
        '32': '8rem',
      },
      scrollbar: ['rounded'],
    },
  },
  variants: {
    scrollbar: ['rounded'],
  },
  plugins: [
    function ({ addUtilities, theme, e }) {
      const values = theme('margin');
      const utilities = Object.entries(values).reduce((acc, [key, value]) => {
        acc[`.mh-${e(key)}`] = { marginLeft: value, marginRight: value };
        acc[`.mv-${e(key)}`] = { marginTop: value, marginBottom: value };
        return acc;
      }, {});

      addUtilities(utilities, ['responsive', 'hover']);
    },
    function ({ addUtilities }) {
      const newUtilities = {
        '.scrollbar-thin': {
          'scrollbar-width': 'thin',
        },
        '.scrollbar-thumb-purple-700': {
          'scrollbar-color': '#6B46C1 #EBF8FF',
        },
        '.scrollbar-track-blue-200': {
          'background': '#EBF8FF',
        },
        '.scrollbar-thumb': {
          'scrollbar-color': '#888 #f1f1f1',
        },
        '.scrollbar-thumb:hover': {
          'scrollbar-color': '#555 #f1f1f1',
        },
        '.scrollbar-track': {
          'background': '#f1f1f1',
        },
      }

      addUtilities(newUtilities, ['responsive', 'hover'])
    },
  ],
};
