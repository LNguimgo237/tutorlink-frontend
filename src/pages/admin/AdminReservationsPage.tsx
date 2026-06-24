import { useAdminReservations } from '../../hooks/useAdminReservations';
import ReservationFilterBar from '../../components/admin/ReservationFilterBar';
import ReservationsTable from '../../components/admin/ReservationsTable';
import ReservationDetailsDrawer from '../../components/admin/ReservationDetailsDrawer';

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
        <h2 className="text-xl font-bold text-green-900">
          Gestion des réservations
        </h2>
        <span className="text-sm text-gray-500">
          {filtered.length} résultat(s)
        </span>
      </div>

      {/* Cartes statistiques rapides */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard label="Total" value={stats.total} color="bg-blue-50 text-blue-800" />
        <StatCard label="Confirmées" value={stats.confirmees} color="bg-green-50 text-green-800" />
        <StatCard label="Terminées" value={stats.terminees} color="bg-gray-50 text-gray-700" />
        <StatCard
          label="Revenu total"
          value={`${stats.revenuTotal.toLocaleString()} F`}
          color="bg-yellow-50 text-yellow-800"
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