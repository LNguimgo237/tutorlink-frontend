type Props = {
  message: string
  onChange: (message: string) => void
}

const MessageToTutor = ({ message, onChange }: Props) => {
  return (
    <div style={{ background: '#fff', border: '1px solid #CFE2F3', padding: 24, marginBottom: 24 }}>
      <h3 style={{ color: '#1A2744', marginBottom: 16 }}>💬 Message pour le répétiteur (optionnel)</h3>
      <textarea
        rows={3}
        value={message}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Ex : nous aimerions revoir les intégrales avant le BAC blanc."
        style={{ width: '100%', padding: '10px 12px', border: '1px solid #CFE2F3', resize: 'none', fontSize: 14, fontFamily: 'inherit' }}
      />
      <p style={{ fontSize: 12, color: '#5B6B82', marginTop: 6 }}>{message.length}/300 caractères</p>
    </div>
  )
}

export default MessageToTutor