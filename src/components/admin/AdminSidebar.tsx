 const links = [
  { group: 'Pilotage', items: ['Vue d\'ensemble', 'Rapports & stats'] },
  { group: 'Gestion', items: ['Utilisateurs', 'Répétiteurs', 'Réservations'] },
];

const AdminSidebar = () => (
  <aside style={{ width: 240, background: '#1A1A1A', color: 'white', minHeight: '100vh', padding: '24px 0' }}>
    {links.map((g) => (
      <div key={g.group} style={{ marginBottom: 24 }}>
        <div style={{ fontSize: 11, color: '#888', padding: '0 20px 8px', textTransform: 'uppercase' }}>
          {g.group}
        </div>
        {g.items.map((item) => (
          <div key={item} style={{ padding: '10px 20px', fontSize: 14, cursor: 'pointer' }}>
            {item}
          </div>
        ))}
      </div>
    ))}
  </aside>
);

export default AdminSidebar;