import { SearchTutor } from '../../../types/search.types';

interface Props {
  tutor: SearchTutor;
  onViewProfile: (id: string) => void;
  onBook: (id: string) => void;
}

// Carte d'un répétiteur dans les résultats de recherche
const TutorSearchCard = ({ tutor: t, onViewProfile, onBook }: Props) => (
  <div className="bg-white rounded-xl shadow-sm overflow-hidden
                  hover:shadow-md transition-shadow border border-gray-100">

    {/* En-tête colorée */}
    <div className="bg-[#1a2744] p-4 flex items-center gap-3">

      {/* Avatar initiales */}
      <div className="w-14 h-14 rounded-full bg-yellow-400
                      flex items-center justify-center
                      text-gray-900 font-bold text-xl flex-shrink-0">
        {t.name.charAt(0)}
      </div>

      {/* Infos principales */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <h3 className="text-white font-bold text-base truncate">
            {t.name}
          </h3>
          {/* Badge vérifié */}
          {t.isVerified && (
            <span className="bg-blue-500 text-white text-xs
                             px-1.5 py-0.5 rounded font-bold
                             flex-shrink-0">
              ✓
            </span>
          )}
        </div>
        <p className="text-blue-200 text-xs">
          {t.subject} · {t.level}
        </p>
        {/* Tags matières supplémentaires */}
        <div className="flex gap-1 mt-1 flex-wrap">
          {t.subjects.slice(0, 2).map(s => (
            <span key={s}
              className="bg-blue-700 text-blue-100 text-xs
                         px-2 py-0.5 rounded-full">
              {s}
            </span>
          ))}
        </div>
      </div>

      {/* Prix */}
      <div className="text-right flex-shrink-0">
        <p className="text-yellow-400 font-bold text-lg">
          {t.hourlyPrice.toLocaleString()}
        </p>
        <p className="text-blue-300 text-xs">FCFA/h</p>
      </div>
    </div>

    {/* Corps */}
    <div className="p-4">

      {/* Quartier + note + sessions */}
      <div className="flex justify-between items-center mb-3">
        <span className="text-xs text-gray-500">
          📍 {t.quartier}
        </span>
        <div className="flex items-center gap-3">
          <span className="text-xs font-bold text-yellow-500">
            ★ {t.rating} ({t.reviewCount})
          </span>
          <span className="text-xs text-gray-400">
            📚 {t.totalSessions} cours
          </span>
        </div>
      </div>

      {/* Diplôme */}
      <p className="text-xs text-gray-400 mb-2">
        🎓 {t.diploma}
      </p>

      {/* Bio */}
      <p className="text-sm text-gray-600 leading-relaxed
                    line-clamp-2 mb-3">
        {t.bio}
      </p>

      {/* Disponibilité */}
      <div className="flex items-center gap-1 mb-4">
        <div className={`w-2 h-2 rounded-full
          ${t.isAvailable ? 'bg-green-400' : 'bg-gray-300'}`}
        />
        <span className={`text-xs font-medium
          ${t.isAvailable ? 'text-green-600' : 'text-gray-400'}`}>
          {t.isAvailable
            ? 'Disponible cette semaine'
            : 'Non disponible cette semaine'}
        </span>
      </div>

      {/* Boutons */}
      <div className="flex gap-2">
        <button
          onClick={() => onViewProfile(t.id)}
          className="flex-1 border border-gray-200 text-gray-600
                     text-sm py-2 rounded-lg hover:bg-gray-50
                     cursor-pointer transition-colors"
        >
          Voir profil
        </button>
        <button
          onClick={() => onBook(t.id)}
          disabled={!t.isAvailable}
          className="flex-1 bg-[#1a2744] hover:bg-blue-900
                     text-white font-bold text-sm py-2 rounded-lg
                     cursor-pointer transition-colors
                     disabled:opacity-40 disabled:cursor-not-allowed"
        >
          Réserver
        </button>
      </div>
    </div>
  </div>
);

export default TutorSearchCard;