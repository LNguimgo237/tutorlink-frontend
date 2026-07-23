import adminApi from './adminApi';
import { ReportFilters } from '../types/adminReports.types';

// ⚠️ BACKEND REQUIS — ces appels seront actifs quand l'API est prête
const adminReportsService = {

  // GET /admin/reports/stats — chiffres clés de la période
  getStats: async (filters: ReportFilters) => {
    const res = await adminApi.get('/reports/stats', { params: filters });
    return res.data;
  },

  // GET /admin/reports/chart — données pour les graphiques
  getChartData: async (filters: ReportFilters) => {
    const res = await adminApi.get('/reports/chart', { params: filters });
    return res.data;
  },

  // GET /admin/reports/subjects — performance par matière
  getSubjectPerformance: async (filters: ReportFilters) => {
    const res = await adminApi.get('/reports/subjects', { params: filters });
    return res.data;
  },

  // GET /admin/reports/quartiers — stats par quartier
  getQuartierStats: async (filters: ReportFilters) => {
    const res = await adminApi.get('/reports/quartiers', { params: filters });
    return res.data;
  },

  // GET /admin/reports/export?format=csv — export CSV
  exportCSV: async (filters: ReportFilters) => {
    const res = await adminApi.get('/reports/export', {
      params: { ...filters, format: 'csv' },
      responseType: 'blob',   // fichier binaire
    });
    return res.data;
  },
};

export default adminReportsService;