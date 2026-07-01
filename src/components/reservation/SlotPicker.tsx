type Props = {
  creneauSelectionne: string | null
  onSelect: (id: string, label: string) => void
}

const semaine = [
  { jour: 'Lun', creneaux: [{ id: 'Lun-16h-18h', label: '16h-18h', dispo: true }, { id: 'Lun-18h-20h', label: '18h-20h', dispo: false }] },
  { jour: 'Mar', creneaux: [{ id: 'Mar-16h-18h', label: '16h-18h', dispo: false }, { id: 'Mar-18h-20h', label: '18h-20h', dispo: true }] },
  { jour: 'Mer', creneaux: [{ id: 'Mer-14h-16h', label: '14h-16h', dispo: true }, { id: 'Mer-16h-18h', label: '16h-18h', dispo: true }] },
  { jour: 'Jeu', creneaux: [{ id: 'Jeu-x', label: '—', dispo: false }, { id: 'Jeu-17h-19h', label: '17h-19h', dispo: true }] },
  { jour: 'Ven', creneaux: [{ id: 'Ven-15h-17h', label: '15h-17h', dispo: true }, { id: 'Ven-17h-19h', label: '17h-19h', dispo: false }] },
  { jour: 'Sam', creneaux: [{ id: 'Sam-09h-11h', label: '09h-11h', dispo: true }, { id: 'Sam-14h-16h', label: '14h-16h', dispo: true }] },
  { jour: 'Dim', creneaux: [{ id: 'Dim-x1', label: '—', dispo: false }, { id: 'Dim-x2', label: '—', dispo: false }] },
]

const SlotPicker = ({ creneauSelectionne, onSelect }: Props) => {
  return (
    <div style={{ background: '#fff', border: '1px solid #CFE2F3', padding: 24, marginBottom: 24 }}>
      <h3 style={{ color: '#1A2744', marginBottom: 16 }}>📅 Choisissez un créneau disponible</h3>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 8 }}>
        {semaine.map((jour) => (
          <div key={jour.jour}>
            <div style={{ textAlign: 'center', fontSize: 11, textTransform: 'uppercase', letterSpacing: 1, color: '#5B6B82', fontWeight: 600, marginBottom: 8 }}>
              {jour.jour}
            </div>
            {jour.creneaux.map((c) => {
              const sel = creneauSelectionne === c.id
              return (
                <div
                  key={c.id}
                  onClick={() => c.dispo && onSelect(c.id, `${jour.jour} · ${c.label}`)}
                  style={{
                    textAlign: 'center', fontSize: 11, fontWeight: 600,
                    padding: '8px 4px', marginBottom: 6, border: '1px solid',
                    cursor: c.dispo ? 'pointer' : 'default',
                    opacity: !c.dispo ? 0.35 : 1,
                    background: sel ? '#1A2744' : c.dispo ? 'rgba(25,118,210,0.1)' : '#E3F2FD',
                    borderColor: sel ? '#1A2744' : c.dispo ? '#1565C0' : '#CFE2F3',
                    color: sel ? '#fff' : c.dispo ? '#1565C0' : '#5B6B82',
                  }}
                >
                  {c.label}
                </div>
              )
            })}
          </div>
        ))}
      </div>
    </div>
  )
}

export default SlotPicker