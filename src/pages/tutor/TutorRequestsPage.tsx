import { useCourseRequests } from '../../hooks/useCourseRequests';
import RequestFilterBar from '../../components/tutor/requests/RequestFilterBar';
import RequestCard from '../../components/tutor/requests/RequestCard';
import RequestDetailDrawer from '../../components/tutor/requests/RequestDetailDrawer';

const TutorRequestsPage = () => {
  const {
    filteredRequests, filters, setFilters, stats,
    selectedRequest, setSelectedRequest,
    handleAccept, handleRefuse,
  } = useCourseRequests();

  return (
    <div className="flex flex-col gap-6">

      {/* Titre */}
      <div>
        <h2 className="text-xl font-bold text-gray-800">
          📩 Demandes reçues
        </h2>
        <p className="text-gray-400 text-sm mt-1">
          Gérez les demandes de cours de vos élèves.
        </p>
      </div>

      {/* Cartes stats rapides */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'En attente', value: stats.enAttente, color: 'bg-orange-50 text-orange-800' },
          { label: 'Acceptées',  value: stats.acceptees, color: 'bg-green-50 text-green-800' },
          { label: 'Refusées',   value: stats.refusees,  color: 'bg-red-50 text-red-800' },
          {
            label: 'Montant accepté',
            value: `${stats.totalMontant.toLocaleString()} F`,
            color: 'bg-blue-50 text-blue-800',
          },
        ].map(s => (
          <div key={s.label} className={`${s.color} rounded-xl p-4 text-center`}>
            <p className="text-2xl font-bold">{s.value}</p>
            <p className="text-xs font-medium mt-1">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Filtres */}
      <RequestFilterBar filters={filters} onChange={setFilters} />

      {/* Liste des demandes en grille */}
      {filteredRequests.length === 0 ? (
        <div className="bg-white rounded-xl shadow-sm p-12 text-center">
          <p className="text-gray-300 text-lg">Aucune demande trouvée</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {filteredRequests.map(r => (
            <RequestCard
              key={r.id}
              request={r}
              onAccept={handleAccept}
              onRefuse={handleRefuse}
              onDetail={setSelectedRequest}
            />
          ))}
        </div>
      )}

      {/* Drawer détail */}
      {selectedRequest && (
        <RequestDetailDrawer
          request={selectedRequest}
          onClose={() => setSelectedRequest(null)}
          onAccept={handleAccept}
          onRefuse={handleRefuse}
        />
      )}
    </div>
  );
};

export default TutorRequestsPage;