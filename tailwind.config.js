module.exports = {
  darkMode: 'class',
  content: [
    "./App.{js,jsx,ts,tsx}", 
    "./app/**/*.{js,jsx,ts,tsx}", 
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        // --- LIGHT MODE (Gündüz - Krem & Espresso) ---
        page: '#F0EAD6',       // Arka plan: Antik Krem
        surface: '#FEF9E7',    // Kartlar: Açık Krem
        dark: '#3E322B',       // Ana Metin: Espresso
        medium: '#8B7E74',     // İkincil Metin: Vizon
        light: '#D4C5B9',      // Çizgiler: Sütlü Kahve
        
        // --- DARK MODE (Gece - Koyu Kahve & Eski Kağıt) ---
        // Tire (-) yerine camelCase veya düz isimlendirme bazen daha güvenlidir ama
        // NativeWind 'page-dark'ı 'bg-page-dark' olarak okur. Sorun yok.
        'page-dark': '#1F1B18',    // Arka plan: Çok Koyu Acı Kahve
        'surface-dark': '#2C2520', // Kartlar: Koyu Deri / Maun
        'text-light': '#E6DCCA',   // Metin: Eski Kağıt / Kemik Rengi
        'text-muted': '#A89B91',   // İkincil Metin: Kül Rengi
        'border-dark': '#443A33',  // Çizgiler: Koyu Ahşap

        // --- VURGULAR ---
        accent: '#D97B56',     // Yanık Turuncu
        mustard: '#EBBAB9',    // Gül Kurusu
        yellow: '#F2CC8F',     // Hardal
        green: '#83A686',      // Adaçayı
        danger: '#C8553D',     // Kiremit
      },
      borderRadius: {
        '4xl': '32px',
      },
      letterSpacing: {
        widest: 3.0,
      }
    },
  },
  plugins: [],
}