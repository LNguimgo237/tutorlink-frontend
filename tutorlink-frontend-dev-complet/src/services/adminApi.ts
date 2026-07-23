import axios from 'axios';

const adminApi = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL + '/admin',
});

adminApi.interceptors.request.use((config) => {
  const raw = localStorage.getItem('tutorlink-admin-auth'); // clé du store Zustand
  if (raw) {
    try {
      const parsed = JSON.parse(raw);
      if (parsed?.state?.adminToken) {
        config.headers.Authorization = `Bearer ${parsed.state.adminToken}`;
      }
    } catch {
      /* clé corrompue, on ignore */
    }
  }
  return config;
});

export default adminApi;