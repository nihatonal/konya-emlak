/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}"  // shadcn bileşenleri için ekleyin],
  ],
  theme: {
    extend: {
      backgroundImage: {
        'danger-gradient': "linear-gradient(-45deg, var(--color_danger) 0% 50%, #fff 50% 100%)",
      },
      colors: {
        bvs: {
          lightGreen: '#E8E9E2',  // En açık ton
          softGreen: '#D8DCCB',  // Hafif açık yeşil
          green: '#AFC4A0',  // Orta-açık yeşil
          midGreen: '#739978',  // Orta yeşil
          darkGreen: '#48684D',  // Koyu yeşil
          deepGreen: '#1C2B1F',  // En koyu yeşil
          accentGold: '#D4AF37',   // Yatırım, değer vurgusu
          soilBrown: '#8B5C2C',   // Doğal, toprak etkisi
          dropBack: "#17212F", //arkafonlar icin
          danger: "#F56960"
        },
      },
    },
  },

  plugins: [],
}

