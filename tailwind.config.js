// tailwind.config.js
module.exports = {
    content: ["./src/**/*.{js,jsx,ts,tsx}"],
    theme: {
      extend: {},
    },
    plugins: [require("daisyui")],
    daisyui: {
      themes: [
        {
          clubTheme: {
            primary: "#a48663",       // boutons, accents
            secondary: "#d6b68b",     // survols, éléments complémentaires
            accent: "#3a2c23",        // éléments d'action ou highlights
            neutral: "#3a2c23",       // fonds sombres
            "base-100": "#e7e2db",    // fond principal clair
            info: "#93c5fd",
            success: "#86efac",
            warning: "#fde68a",
            error: "#fca5a5",
          },
        },
      ],
    },
  }
  