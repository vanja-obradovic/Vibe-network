/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors:{
        text:{
          white:"#FDFFFF",
          muted:"#38414D"
        },
        action:{
          active:"#9FA6C9",
          inactive:"#576578",
          primary:"#3672E9",
          secondary:"#232743",
          disabled:"#A1A8DE",
        },
        panels:{
          background:"#272B4A",
          highlight:"#313759",
          highlight2:"#3F466D)",
          dark:"#14182B",
        },
        page:{
          background:"#E6EDF2",
          black_background:"#0D0E14",
        },
        supplementary:{
          green:"#4A9252",
          grey:"#424866",
          orange:"#E88225",
          red:"#E84525",
          blue:"#57A1F7",
          turqouise:"#2E90A5",
        }
      }

    },
  },
  plugins: [],
};
