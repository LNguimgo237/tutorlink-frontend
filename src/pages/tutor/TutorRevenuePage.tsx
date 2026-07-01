import { useTutorRevenue } from '../../hooks/useTutorRevenue';
import RevenuePeriodSelector from '../../components/tutor/revenue/RevenuePeriodSelector';
import RevenueStatsCards from '../../components/tutor/revenue/RevenueStatsCards';
import RevenueBarChart from '../../components/tutor/revenue/RevenueBarChart';
import RevenueTransactionsTable from '../../components/tutor/revenue/RevenueTransactionsTable';

const TutorRevenuePage = () => {
  const {
    period, setPeriod,
    stats, chartData, transactions,
    handleExportCSV,
  } = useTutorRevenue();

  return (
    <div className="flex flex-col gap-6">

      {/* Titre */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-gray-800">
            💰 Mes revenus
          </h2>
          <p className="text-gray-400 text-sm mt-1">
            Suivi de vos versements TutorLink.
          </p>
        </div>
        {/* Info commission */}
        <div className="bg-yellow-50 border border-yellow-200
                        rounded-xl px-4 py-2 text-xs text-yellow-700">
          💡 Commission TutorLink : <strong>10%</strong> sur chaque versement
        </div>
      </div>

      {/* Sélecteur période + export */}
      <RevenuePeriodSelector
        period={period}
        onChange={setPeriod}
        onExport={handleExportCSV}
      />

      {/* Cartes statistiques */}
      <RevenueStatsCards stats={stats} />

      {/* Graphique */}
      <RevenueBarChart data={chartData} />

      {/* Tableau transactions */}
      <RevenueTransactionsTable transactions={transactions} />
    </div>
  );
};

export default TutorRevenuePage;