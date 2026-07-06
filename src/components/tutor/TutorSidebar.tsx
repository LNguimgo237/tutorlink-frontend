import { NavLink, useNavigate } from 'react-router-dom';

const links = [
  { label: '📊 Tableau de bord',    path: '/repetiteur/dashboard' },
  { label: '📅 Mes disponibilités', path: '/repetiteur/disponibilites' },
  { label: '📩 Demandes reçues',    path: '/repetiteur/demandes' },
  { label: '👥 Mes groupes',        path: '/repetiteur/mes-groupes' },
  { label: '💬 Messagerie',         path: '/repetiteur/messagerie' },
  { label: '⭐ Mes avis',           path: '/repetiteur/avis' },
  { label: '💰 Mes revenus',        path: '/repetiteur/revenus' },
  { label: '⚙️ Paramètres',         path: '/repetiteur/parametres' },
  { label: '💳 Mon abonnement', path: '/repetiteur/abonnement' },
];

const TutorSidebar = () => {
  const navigate = useNavigate();

  return (
    <aside className="w-56 bg-[#1a2744] min-h-screen flex flex-col flex-shrink-0">

      {/* Profil répétiteur */}
      <div className="p-5 border-b border-blue-800">
        <div className="w-12 h-12 rounded-full bg-yellow-400
                        flex items-center justify-center text-xl mb-3">
          👨‍🏫
        </div>
        <p className="text-white font-bold text-sm">M. Kamga Eric</p>
        <p className="text-blue-300 text-xs">Répétiteur · Mathématiques</p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-4">
        {links.map(link => (
          <NavLink
            key={link.path}
            to={link.path}
            style={({ isActive }) => ({
              display: 'block',
              padding: '10px 20px',
              fontSize: 13,
              textDecoration: 'none',
              color: isActive ? '#E9A319' : 'white',
              background: isActive ? 'rgba(233,163,25,0.1)' : 'transparent',
              borderLeft: isActive ? '3px solid #E9A319' : '3px solid transparent',
            })}
          >
            {link.label}
          </NavLink>
        ))}
      </nav>

      {/* Boutons bas */}
      <div className="p-4 border-t border-blue-800 flex gap-2">
        <button
          onClick={() => navigate('/repetiteur/messagerie')}
          className="flex-1 bg-blue-700 hover:bg-blue-600
                     text-white text-xs font-bold py-2 rounded-lg
                     cursor-pointer transition-colors"
        >
          💬 Messages
        </button>
        <button
          onClick={() => {/* logout */}}
          className="flex-1 bg-yellow-400 hover:bg-yellow-500
                     text-gray-900 text-xs font-bold py-2 rounded-lg
                     cursor-pointer transition-colors"
        >
          Déconnexion
        </button>
      </div>
    </aside>
  );
};

export default TutorSidebar;