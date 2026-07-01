type Props = {
  methode: 'mtn' | 'orange'
  onChange: (m: 'mtn' | 'orange') => void
}

const PaymentMethod = ({ methode, onChange }: Props) => {
  return (
    <div style={{ background: '#fff', border: '1px solid #CFE2F3', padding: 24, marginBottom: 24 }}>
      <h3 style={{ color: '#1A2744', marginBottom: 16 }}>💳 Moyen de paiement</h3>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 12 }}>
        {([['mtn', '📱 MTN Mobile Money'], ['orange', '🟠 Orange Money']] as const).map(([id, label]) => (
          <div
            key={id}
            onClick={() => onChange(id)}
            style={{
              padding: 14, textAlign: 'center', fontSize: 13, fontWeight: 600,
              border: `2px solid ${methode === id ? '#1A2744' : '#CFE2F3'}`,
              background: methode === id ? 'rgba(26,39,68,0.05)' : '#fff',
              color: methode === id ? '#1A2744' : '#333',
              cursor: 'pointer',
            }}
          >
            {label}
          </div>
        ))}
      </div>
      <p style={{ fontSize: 12, color: '#5B6B82' }}>
        Le paiement est débité uniquement après confirmation du répétiteur.
      </p>
    </div>
  )
}

export default PaymentMethod