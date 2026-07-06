import { useAdminReservations } from '../../hooks/useAdminReservations';
import ReservationFilterBar from '../../components/admin/ReservationFilterBar';
import ReservationsTable from '../../components/admin/ReservationsTable';
import ReservationDetailsDrawer from '../../components/admin/ReservationDetailsDrawer';
import ReservationsChart from '../../components/admin/ReservationsChart';
const AdminReservationsPage = () => {
  const {
    filtered, filters, setFilters, stats,
    selectedReservation, setSelectedReservation,
    handleComplete, handleCancel,
  } = useAdminReservations();

  return (
    <div className="flex flex-col gap-6">

      {/* Titre + stats rapides */}
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-blue-900">
          Gestion des réservations
        </h2>
        <span className="text-sm text-gray-500">
          {filtered.length} résultat(s)
        </span>
      </div>
      {/*statistique*/}
<div className="grid grid-cols-2 md:grid-cols-3 gap-3">
     <StatCard
  label="Total"
  value={stats.total}
  color="bg-blue-50 text-blue-700"
/>

<StatCard
  label="Confirmées"
  value={stats.confirmees}
  color="bg-blue-50 text-blue-700"
/>

<StatCard
  label="Terminées"
  value={stats.terminees}
  color="bg-blue-50 text-blue-800"
/>

</div>
      {/* Barre de filtres */}
      <ReservationFilterBar filters={filters} onChange={setFilters} />

      {/* Tableau des réservations */}
      <ReservationsTable
        reservations={filtered}
        onSelect={setSelectedReservation}
        onComplete={handleComplete}
      />

      {/* Drawer détail — s'ouvre au clic sur Détail */}
      {selectedReservation && (
        <ReservationDetailsDrawer
          reservation={selectedReservation}
          onClose={() => setSelectedReservation(null)}
          onCancel={handleCancel}
        />
      )}
    </div>
  );
};

// Carte stat réutilisable
const StatCard = ({ label, value, color }: {
  label: string; value: string | number; color: string
}) => (
  <div className={`${color} rounded-xl p-4 text-center`}>
    <div className="text-2xl font-bold">{value}</div>
    <div className="text-xs font-medium mt-1">{label}</div>
  </div>
);

export default AdminReservationsPage;