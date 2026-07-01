type Props = {
  creneauLabel: string
  duree: string
  total: number
  pretAConfirmer: boolean
  onConfirmer: () => void
}

const TutorSummary = ({ creneauLabel, duree, total, pretAConfirmer, onConfirmer }: Props) => {
  return (
    <div style={{ background: '#fff', border: '1px solid #CFE2F3', padding: 24, position: 'sticky', top: 20 }}>
      <div style={{ background: 'linear-gradient(135deg, #1565C0, #1A2744)', margin: '-24px -24px 16px -24px', padding: 24, display: 'flex', gap: 14, alignItems: 'center', color: '#fff' }}>
        <div style={{ width: 56, height: 56, background: '#E9A319', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 28 }}>👨🏿‍🏫</div>
        <div>
          <div style={{ fontFamily: 'Georgia', fontSize: 18, fontWeight: 700 }}>M. Kamga Eric</div>
          <div style={{ fontSize: 13, opacity: 0.85 }}>Mathématiques · Terminale C/D</div>
        </div>
      </div>

      {[
        { label: '📍 Lieu', value: 'Centre Dschang' },
        { label: '⭐ Note', value: '4.9 (87 avis)' },
        { label: '🕑 Créneau', value: creneauLabel || 'Non choisi' },
        { label: '⏱️ Durée', value: duree },
      ].map((ligne) => (
        <div key={ligne.label} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', fontSize: 14, borderBottom: '1px solid #CFE2F3' }}>
          <span style={{ color: '#5B6B82' }}>{ligne.label}</span>
          <span>{ligne.value}</span>
        </div>
      ))}

      <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: 14, fontFamily: 'Georgia', fontSize: 20, fontWeight: 700, color: '#1A2744' }}>
        <span>Total</span>
        <span>{total.toLocaleString('fr-FR')} FCFA</span>
      </div>

      <button
        onClick={onConfirmer}
        disabled={!pretAConfirmer}
        style={{
          width: '100%', marginTop: 16, padding: 12, fontWeight: 600, fontSize: 14, border: 'none',
          background: pretAConfirmer ? '#1A2744' : '#ccc',
          color: pretAConfirmer ? '#fff' : '#888',
          cursor: pretAConfirmer ? 'pointer' : 'not-allowed',
        }}
      >
        ✅ Confirmer la réservation
      </button>
    </div>
  )
}

export default TutorSummary