const subjects = [
  { name: 'Mathématiques', pct: 87, color: '#1B4332' },
  { name: 'Physique-Chimie', pct: 72, color: '#E9A319' },
  { name: 'Anglais', pct: 65, color: '#2196F3' },
  { name: 'Français', pct: 54, color: '#9C27B0' },
  { name: 'SVT', pct: 41, color: '#FF5722' },
];

const PopularSubjectsPanel = () => (
  <div style={{
    background: 'white', borderRadius: 10, padding: 24,
    boxShadow: '0 2px 8px rgba(0,0,0,0.07)',
  }}>
    <h3 style={{ color: '#1B4332', marginBottom: 20, fontSize: 15 }}>
      📚 Matières populaires
    </h3>
    {subjects.map(s => (
      <div key={s.name} style={{ marginBottom: 14 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, marginBottom: 4 }}>
          <span>{s.name}</span>
          <span style={{ fontWeight: 'bold' }}>{s.pct}%</span>
        </div>
        {/* Barre de fond */}
        <div style={{ background: '#f0f0f0', borderRadius: 4, height: 8 }}>
          {/* Barre de progression */}
          <div style={{
            width: `${s.pct}%`, background: s.color,
            height: 8, borderRadius: 4,
            transition: 'width 0.6s ease',
          }} />
        </div>
      </div>
    ))}
  </div>
);

export default PopularSubjectsPanel;