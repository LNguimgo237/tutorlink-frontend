import { useAdminReports } from '../../hooks/useAdminReports';
import ReportKpiCard from '../../components/admin/ReportKpiCard';
import ReportPeriodSelector from '../../components/admin/ReportPeriodSelector';
import RevenueChart from '../../components/admin/RevenueChart';
import SubjectPerformanceTable from '../../components/admin/SubjectPerformanceTable';
import QuartierStatsTable from '../../components/admin/QuartierStatsTable';

const AdminReportsPage = () => {
  const {
    filters, setFilters,
    stats, chartData, subjectPerformance, quartierStats,
    handleExportCSV,
  } = useAdminReports();

  return (
    <div className="flex flex-col gap-6">

      {/* Titre + bouton export */}
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-green-900">
          Rapports & Statistiques
        </h2>
        <span className="text-sm text-gray-400">
          Période : {filters.period}
        </span>
      </div>

      {/* Sélecteur de période + filtres */}
      <ReportPeriodSelector
        filters={filters}
        onChange={setFilters}
        onExport={handleExportCSV}
      />

      {/* Grille KPI */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <ReportKpiCard
          label="Total réservations"
          value={stats.totalReservations.toLocaleString()}
          icon="📅"
          accent="border-green-700"
        />
        <ReportKpiCard
          label="Revenus totaux"
          value={`${stats.totalRevenus.toLocaleString()} F`}
          icon="💰"
          accent="border-yellow-500"
          sub="FCFA cumulés"
        />
        <ReportKpiCard
          label="Élèves actifs"
          value={stats.totalEleves.toLocaleString()}
          icon="👤"
          accent="border-blue-500"
        />
        <ReportKpiCard
          label="Satisfaction"
          value={`${stats.tauxSatisfaction}%`}
          icon="⭐"
          accent="border-orange-400"
          sub="taux satisfaction"
        />
      </div>

      {/* Ligne 2 KPI */}
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
        <ReportKpiCard
          label="Répétiteurs"
          value={stats.totalRepetiteurs.toLocaleString()}
          icon="🎓"
          accent="border-purple-500"
        />
        <ReportKpiCard
          label="Revenu moyen"
          value={`${stats.revenuMoyen.toLocaleString()} F`}
          icon="📊"
          accent="border-teal-500"
          sub="par réservation"
        />
        <ReportKpiCard
          label="Réserv. / jour"
          value={String(stats.reservationsParJour)}
          icon="🔥"
          accent="border-red-400"
          sub="moyenne quotidienne"
        />
      </div>

      {/* Graphiques */}
      <RevenueChart data={chartData} />

      {/* Tableaux performance */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <SubjectPerformanceTable data={subjectPerformance} />
        <QuartierStatsTable data={quartierStats} />
      </div>
    </div>
  );
};

export default AdminReportsPage;