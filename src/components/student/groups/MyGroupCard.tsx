import { StudentGroupItem } from '../../../types/studentGroup.types';
import GroupPaymentBadge from './GroupPaymentBadge';

interface Props {
  group: StudentGroupItem;
  onViewGroup: (id: string) => void;
  onPay: (id: string) => void;
  onLeave: (id: string) => void;
}

// Carte d'un groupe auquel l'élève est inscrit
const MyGroupCard = ({ group: g, onViewGroup, onPay, onLeave }: Props) => {
  const placePct = (g.currentMembers / g.maxMembers) * 100;

  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden
                    border border-gray-100 hover:shadow-md transition-shadow">

      {/* En-tête */}
      <div className="bg-[#1a2744] p-4">
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-3">
            {/* Avatar groupe */}
            <div className="w-12 h-12 rounded-full bg-yellow-400
                            flex items-center justify-center
                            text-2xl flex-shrink-0">
              👥
            </div>
            <div>
              <h3 className="text-white font-bold text-sm leading-tight">
                {g.name}
              </h3>
              <p className="text-blue-200 text-xs">
                {g.subject} · {g.level}
              </p>
            </div>
          </div>
          {/* Note */}
          <span className="text-yellow-400 text-xs font-bold">
            ★ {g.rating}
          </span>
        </div>
      </div>

      {/* Corps */}
      <div className="p-4 flex flex-col gap-3">

        {/* Infos rapides */}
        <div className="grid grid-cols-2 gap-2 text-xs text-gray-500">
          <span>👨‍🏫 {g.tutorName}</span>
          <span>📍 {g.quartier}</span>
          <span>📅 {g.nextSession}</span>
          <span>💰 {g.monthlyPrice.toLocaleString()} F/mois</span>
        </div>

        {/* Thèmes */}
        <div className="flex flex-wrap gap-1">
          {g.themes.slice(0, 3).map(theme => (
            <span key={theme}
              className="bg-gray-100 text-gray-600 text-xs
                         px-2 py-0.5 rounded-full">
              {theme}
            </span>
          ))}
          {g.themes.length > 3 && (
            <span className="text-xs text-gray-400">
              +{g.themes.length - 3}
            </span>
          )}
        </div>

        {/* Places */}
        <div>
          <div className="flex justify-between text-xs mb-1">
            <span className="text-gray-500">
              {g.currentMembers}/{g.maxMembers} membres
            </span>
            <span className="text-gray-400">
              Inscrit le {g.joinedAt}
            </span>
          </div>
          <div className="bg-gray-100 rounded-full h-1.5">
            <div
              className="bg-blue-600 h-1.5 rounded-full"
              style={{ width: `${placePct}%` }}
            />
          </div>
        </div>

        {/* Séances hebdomadaires */}
        <div className="flex gap-1 flex-wrap">
          {g.sessions.map((s, i) => (
            <span key={i}
              className="bg-blue-50 text-blue-700 text-xs
                         font-medium px-2 py-1 rounded-lg border
                         border-blue-100">
              {s.day} · {s.startTime}-{s.endTime}
            </span>
          ))}
        </div>

        {/* Paiement */}
        <div className="flex justify-between items-center
                        bg-gray-50 rounded-lg p-2">
          <div>
            <p className="text-xs text-gray-400">Statut paiement</p>
            <p className="text-xs text-gray-500">
              Dernier : {g.lastPaymentDate}
            </p>
          </div>
          <GroupPaymentBadge status={g.paymentStatus} />
        </div>

        {/* Boutons */}
        <div className="flex gap-2 pt-1">
          {/* Voir détail */}
          <button
            onClick={() => onViewGroup(g.id)}
            className="flex-1 border border-gray-200 text-gray-600
                       text-xs py-2 rounded-lg hover:bg-gray-50
                       cursor-pointer transition-colors"
          >
            👁 Voir détail
          </button>

          {/* Payer si en retard */}
          {g.paymentStatus === 'en_retard' && (
            <button
              onClick={() => onPay(g.id)}
              className="flex-1 bg-yellow-400 hover:bg-yellow-500
                         text-gray-900 font-bold text-xs py-2
                         rounded-lg cursor-pointer transition-colors"
            >
              💰 Payer
            </button>
          )}

          {/* Quitter */}
          <button
            onClick={() => {
              if (window.confirm(
                `Quitter "${g.name}" ? Cette action est irréversible.`
              )) onLeave(g.id);
            }}
            className="border border-red-200 text-red-500 text-xs
                       py-2 px-3 rounded-lg hover:bg-red-50
                       cursor-pointer transition-colors"
          >
            Quitter
          </button>
        </div>
      </div>
    </div>
  );
};

export default MyGroupCard;