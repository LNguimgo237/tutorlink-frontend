import { useNavigate } from 'react-router-dom';
import { useStudentGroups } from '../../hooks/useStudentGroups';
import MyGroupCard from '../../components/student/groups/MyGroupCard';
import SuggestedGroupCard from '../../components/student/groups/SuggestedGroupCard';
import GroupPaymentModal from '../../components/student/groups/GroupPaymentModal';

const StudentGroupsPage = () => {
  const navigate = useNavigate();
  const {
    myGroups, suggestedGroups, stats,
    payingGroupId, setPayingGroupId,
    handlePay, handleLeave,
    handleViewGroup, handleJoinSuggested,
  } = useStudentGroups();

  // Groupe en cours de paiement
  const payingGroup = myGroups.find(g => g.id === payingGroupId);

  return (
    <div className="flex flex-col gap-6">

      {/* Titre */}
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-xl font-bold text-gray-800">
            👥 Mes groupes de répétition
          </h2>
          <p className="text-gray-400 text-sm mt-1">
            Gérez vos inscriptions et paiements mensuels.
          </p>
        </div>
        {/* Bouton rejoindre un groupe */}
        <button
          onClick={() => navigate('/groupes')}
          className="bg-[#1a2744] hover:bg-blue-900 text-white
                     font-bold px-4 py-2.5 rounded-xl text-sm
                     cursor-pointer transition-colors"
        >
          + Rejoindre un groupe
        </button>
      </div>

      {/* Cartes statistiques */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          {
            value: stats.totalGroups,
            label: 'Groupes actifs',
            color: 'bg-blue-50 text-blue-800',
          },
          {
            value: `${stats.monthlyTotal.toLocaleString()} F`,
            label: 'Total / mois',
            color: 'bg-yellow-50 text-yellow-800',
          },
          {
            value: `${stats.totalSessions}`,
            label: 'Séances / semaine',
            color: 'bg-green-50 text-green-800',
          },
          {
            value: stats.enRetard,
            label: 'Paiement(s) en retard',
            color: stats.enRetard > 0
              ? 'bg-red-50 text-red-800'
              : 'bg-gray-50 text-gray-600',
          },
        ].map(s => (
          <div key={s.label}
            className={`${s.color} rounded-xl p-4 text-center`}>
            <p className="text-2xl font-bold">{s.value}</p>
            <p className="text-xs font-medium mt-1">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Alerte paiements en retard */}
      {stats.enRetard > 0 && (
        <div className="bg-red-50 border border-red-200 rounded-xl
                        px-5 py-4 flex items-center gap-3">
          <span className="text-2xl">⚠️</span>
          <div>
            <p className="font-bold text-red-700 text-sm">
              {stats.enRetard} paiement(s) en retard
            </p>
            <p className="text-red-500 text-xs mt-0.5">
              Régularisez vos paiements pour garder accès à vos groupes.
            </p>
          </div>
        </div>
      )}

      {/* Mes groupes */}
      {myGroups.length === 0 ? (
        <div className="bg-white rounded-xl shadow-sm p-12 text-center">
          <p className="text-4xl mb-4">👥</p>
          <h3 className="font-bold text-gray-700 text-lg mb-2">
            Vous n'êtes inscrit dans aucun groupe
          </h3>
          <p className="text-gray-400 text-sm mb-6">
            Rejoignez un groupe pour bénéficier de tarifs réduits
            et d'une émulation collective.
          </p>
          <button
            onClick={() => navigate('/groupes')}
            className="bg-[#1a2744] hover:bg-blue-900 text-white
                       font-bold px-6 py-2.5 rounded-xl
                       cursor-pointer transition-colors"
          >
            Découvrir les groupes
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {myGroups.map(group => (
            <MyGroupCard
              key={group.id}
              group={group}
              onViewGroup={handleViewGroup}
              onPay={id => setPayingGroupId(id)}
              onLeave={handleLeave}
            />
          ))}
        </div>
      )}

      {/* Groupes suggérés */}
      {suggestedGroups.length > 0 && (
        <div>
          <h3 className="font-bold text-gray-700 mb-3">
            💡 Groupes suggérés pour vous
          </h3>
          <div className="flex flex-col gap-3">
            {suggestedGroups.map(group => (
              <SuggestedGroupCard
                key={group.id}
                group={group}
                onJoin={handleJoinSuggested}
              />
            ))}
          </div>
        </div>
      )}

      {/* Modal paiement */}
      {payingGroup && (
        <GroupPaymentModal
          group={payingGroup}
          onPay={handlePay}
          onClose={() => setPayingGroupId(null)}
        />
      )}
    </div>
  );
};

export default StudentGroupsPage;