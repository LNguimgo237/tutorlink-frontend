import axios from 'axios';

// ══════════════════════════════════════════════
// POINT DE CONNEXION BACKEND — MODIFIER ICI
// En développement local :
//   VITE_API_BASE_URL=http://localhost:3000/api
// En production :
//   VITE_API_BASE_URL=https://api.tutorlink.cm/api
// ══════════════════════════════════════════════
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Intercepteur REQUEST — injecte le token JWT automatiquement
api.interceptors.request.use(
  config => {
    // Récupère le token depuis localStorage
    const stored = localStorage.getItem('tutorlink-auth');
    if (stored) {
      try {
        const { state } = JSON.parse(stored);
        if (state?.token) {
          config.headers.Authorization = `Bearer ${state.token}`;
        }
      } catch {
        // Token corrompu — on ignore
      }
    }
    return config;
  },
  error => Promise.reject(error)
);

// Intercepteur RESPONSE — gère les erreurs globalement
api.interceptors.response.use(
  response => response,
  error => {
    // Token expiré → déconnexion automatique
    if (error.response?.status === 401) {
      localStorage.removeItem('tutorlink-auth');
      window.location.href = '/connexion';
    }
    // Serveur indisponible
    if (!error.response) {
      console.error('Serveur indisponible — vérifiez votre connexion');
    }
    return Promise.reject(error);
  }
);

export default api;