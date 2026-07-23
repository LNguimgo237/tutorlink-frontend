import { AdminUserItem } from '../../types/adminUser.types';

interface Props {
  user: AdminUserItem;
  onSuspend: (id: string) => void;
  onValidate: (id: string) => void;
  onDelete: (id: string) => void;
  onDetail: (user: AdminUserItem) => void;
}

const UserActionsMenu = ({ user, onDelete, onDetail }: Props) => (
  <div style={{ display: 'flex', gap: 6 }}>
    {/* Voir détails */}
    <button onClick={() => onDetail(user)} style={btnStyle('#2196F3')}>
      👁 Détail
    </button>


    {/* Supprimer */}
    <button onClick={() => {
      if (window.confirm(`Supprimer ${user.name} ?`)) onDelete(user.id);
    }} style={btnStyle('#D32F2F')}>
      🗑 Suppr.
    </button>
  </div>
);

// Style réutilisable pour les boutons
const btnStyle = (bg: string): React.CSSProperties => ({
  background: bg, color: 'white', border: 'none',
  borderRadius: 6, padding: '4px 10px', fontSize: 11,
  cursor: 'pointer', fontWeight: 'bold',
});

export default UserActionsMenu;