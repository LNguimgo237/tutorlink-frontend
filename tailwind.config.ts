export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // Avant
        // primary: '#1B4332',  vert foncé
        // secondary: '#E9A319', or

        // Après — bleu éducatif moderne
        primary: '#1565C0',    // bleu vif profond
        secondary: '#E9A319',  // or (on garde)
        'primary-dark': '#0D47A1',   // bleu très foncé (hover)
        'primary-light': '#1976D2',  // bleu clair (accents)
        'primary-bg': '#E3F2FD',     // fond bleu très léger
      },
    },
  },
  plugins: [],
};