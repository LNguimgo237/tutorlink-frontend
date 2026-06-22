import { useAdminStats } from '../../hooks/useAdminStats';
import AdminKpiCard from '../../components/admin/AdminKpiCard';
import ReservationsChart from '../../components/admin/ReservationsChart';
import PopularSubjectsPanel from '../../components/admin/PopularSubjectsPanel';
import ModerationAlerts from '../../components/admin/ModerationAlerts';
import RecentRegistrationsTable from '../../components/admin/RecentRegistrationsTable';

const AdminDashboardPage = () => {
  const { stats, monthlyData, alerts, recentRegistrations, loading } = useAdminStats();

  if (loading) return (
    <div style={{ display: 'flex', justifyContent: 'center', paddingTop: 80 }}>
      <p style={{ color: '#888' }}>Chargement du tableau de bord...</p>
    </div>
  );

  return (
    <div>
      <h2 style={{ color: '#1B4332', marginBottom: 24 }}>Vue d'ensemble</h2>

      {/* Grille KPI — 3 cartes par ligne */}
      <div style={{ display: 'flex', gap: 16, marginBottom: 24, flexWrap: 'wrap' }}>
        <AdminKpiCard label="Utilisateurs" value={stats.totalUsers.toLocaleString()} icon="👤" accent="#2196F3" />
        <AdminKpiCard label="Répétiteurs" value={stats.totalTutors.toLocaleString()} icon="🎓" accent="#1B4332" />
        <AdminKpiCard label="Réservations" value={stats.totalReservations.toLocaleString()} icon="📅" accent="#E9A319" />
      </div>
      <div style={{ display: 'flex', gap: 16, marginBottom: 24, flexWrap: 'wrap' }}>
        <AdminKpiCard label="Revenus (FCFA)" value={stats.totalRevenue.toLocaleString()} icon="💰" accent="#9C27B0" />
        <AdminKpiCard label="En attente validation" value={String(stats.pendingValidations)} icon="⏳" accent="#FF5722" sub="répétiteurs" />
        <AdminKpiCard label="Sessions aujourd'hui" value={String(stats.activeSessionsToday)} icon="🟢" accent="#00BCD4" />
      </div>

      {/* Graphique + Matières */}
      <div style={{ display: 'flex', gap: 16, marginBottom: 24 }}>
        <div style={{ flex: 2 }}><ReservationsChart data={monthlyData} /></div>
        <div style={{ flex: 1 }}><PopularSubjectsPanel /></div>
      </div>

      {/* Alertes + Inscriptions récentes */}
      <div style={{ display: 'flex', gap: 16 }}>
        <div style={{ flex: 1 }}><ModerationAlerts alerts={alerts} /></div>
        <div style={{ flex: 2 }}><RecentRegistrationsTable data={recentRegistrations} /></div>
      </div>
    </div>
  );
};

export default AdminDashboardPage;