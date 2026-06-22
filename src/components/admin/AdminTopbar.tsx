import { useAdminAuthStore } from '@/store/adminAuthStore';

const AdminTopbar = () => {
  const { adminLogout } = useAdminAuthStore();
  return (
    <header style={{
      height: 60, background: '#1B4332', color: 'white',
      display: 'flex', alignItems: 'center',
      justifyContent: 'space-between', padding: '0 24px'
    }}>
      <span style={{ fontWeight: 'bold', color: '#E9A319' }}>
        TutorLink — Admin
      </span>
      <button onClick={adminLogout} style={{
        background: '#E9A319', border: 'none', borderRadius: 6,
        padding: '6px 16px', cursor: 'pointer', fontWeight: 'bold'
      }}>
        Déconnexion
      </button>
    </header>
  );
};

export default AdminTopbar;