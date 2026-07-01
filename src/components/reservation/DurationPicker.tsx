type Props = {
  duree: string
  onChange: (duree: string) => void
}

const options = ['1h', '1h30', '2h']

const DurationPicker = ({ duree, onChange }: Props) => {
  return (
    <div style={{ background: '#fff', border: '1px solid #CFE2F3', padding: 24, marginBottom: 24 }}>
      <h3 style={{ color: '#1A2744', marginBottom: 16 }}>⏱️ Durée souhaitée</h3>
      <div style={{ display: 'flex', gap: 12 }}>
        {options.map((option) => (
          <button
            key={option}
            onClick={() => onChange(option)}
            style={{
              padding: '10px 24px', fontSize: 14, fontWeight: 600, border: '2px solid',
              cursor: 'pointer',
              background: duree === option ? '#1A2744' : '#fff',
              borderColor: duree === option ? '#1A2744' : '#CFE2F3',
              color: duree === option ? '#fff' : '#1A2744',
            }}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  )
}

export default DurationPicker