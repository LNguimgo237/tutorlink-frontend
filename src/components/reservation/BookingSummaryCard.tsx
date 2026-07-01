type Props = {
  creneauLabel: string
  duree: string
  message: string
  paiement: string
  total: number
  pretAConfirmer: boolean
  onConfirmer: () => void
}

const BookingSummaryCard = ({ creneauLabel, duree, message, paiement, total, pretAConfirmer, onConfirmer }: Props) => {
  return (
    <div style={{ background: '#fff', border: '2px solid #CFE2F3', padding: 24, marginTop: 8 }}>
      <h3 style={{ color: '#1A2744', marginBottom: 16 }}>🧾 Récapitulatif</h3>

      {[
        { label: 'Répétiteur', value: 'M. Kamga Eric' },
        { label: 'Matière', value: 'Mathématiques' },
        { label: 'Créneau', value: creneauLabel || '—' },
        { label: 'Durée', value: duree },
        { label: 'Paiement', value: paiement === 'mtn' ? 'MTN Mobile Money' : 'Orange Money' },
      ].map((ligne) => (
        <div key={ligne.label} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', fontSize: 14, borderBottom: '1px solid #CFE2F3' }}>
          <span style={{ color: '#5B6B82' }}>{ligne.label}</span>
          <span style={{ fontWeight: 500 }}>{ligne.value}</span>
        </div>
      ))}

      {message && (
        <div style={{ padding: '8px 0', fontSize: 14, borderBottom: '1px solid #CFE2F3' }}>
          <span style={{ color: '#5B6B82' }}>Message : </span>
          <span style={{ fontStyle: 'italic' }}>{message}</span>
        </div>
      )}

      <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: 14, fontFamily: 'Georgia', fontSize: 22, fontWeight: 700, color: '#1A2744' }}>
        <span>Total</span>
        <span>{total.toLocaleString('fr-FR')} FCFA</span>
      </div>

      <button
        onClick={onConfirmer}
        disabled={!pretAConfirmer}
        style={{
          width: '100%', marginTop: 16, padding: 14, fontWeight: 700, fontSize: 15, border: 'none',
          background: pretAConfirmer ? '#E9A319' : '#ccc',
          color: pretAConfirmer ? '#1A2744' : '#888',
          cursor: pretAConfirmer ? 'pointer' : 'not-allowed',
        }}
      >
        {pretAConfirmer ? '✅ Confirmer la réservation' : 'Complétez les champs requis'}
      </button>
    </div>
  )
}

export default BookingSummaryCard