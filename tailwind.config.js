module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}", 
    "./app/**/*.{js,jsx,ts,tsx}", 
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        page: '#F0EAD6',       
        surface: '#FEF9E7',    
        dark: '#3E322B',       
        medium: '#8B7E74',     
        light: '#D4C5B9',      
        accent: '#D97B56',     
        mustard: '#EBBAB9',    
        yellow: '#F2CC8F',     
        green: '#83A686',      
        danger: '#C8553D',     
      },
      borderRadius: {
        '4xl': '32px',
      },
      // --- BU KISIM HATAYI ÇÖZER ---
      letterSpacing: {
        tighter: -0.5,
        tight: -0.25,
        normal: 0,
        wide: 0.5,
        wider: 1.5,
        widest: 3.0, // Piksel değeri
      }
    },
  },
  plugins: [],
}