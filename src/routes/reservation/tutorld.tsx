import { useState } from 'react'
import { useParams } from 'react-router-dom'
import TutorSummary from '@/components/reservation/TutorSummary'
import SlotPicker from '@/components/reservation/SlotPicker'
import DurationPicker from '@/components/reservation/DurationPicker'
import MessageToTutor from '@/components/reservation/MessageToTutor'
import PaymentMethod from '@/components/reservation/PaymentMethod'
import BookingSummaryCard from '@/components/reservation/BookingSummaryCard'

const ReservationPage = () => {
  const { tutorId } = useParams()

  const [creneauId, setCreneauId] = useState<string | null>(null)
  const [creneauLabel, setCreneauLabel] = useState<string>('')
  const [duree, setDuree] = useState<string>('2h')
  const [matiere, setMatiere] = useState<string>('Mathématiques')
  const [message, setMessage] = useState<string>('')
  const [paiement, setPaiement] = useState<'mtn' | 'orange'>('mtn')

  const tarifHeure = 2000
  const heures = duree === '1h' ? 1 : duree === '1h30' ? 1.5 : 2
  const total = tarifHeure * heures
  const pretAConfirmer = !!creneauId && !!paiement

  return (
    <div style={{ background: '#E3F2FD', minHeight: '100vh' }}>
      <div style={{
        maxWidth: 1280,
        margin: '0 auto',
        padding: '40px 32px',
        display: 'grid',
        gridTemplateColumns: '320px 1fr',
        gap: 28,
        alignItems: 'start'
      }}>

        {/* COLONNE GAUCHE : récap sticky */}
        <TutorSummary
          creneauLabel={creneauLabel}
          duree={duree}
          total={total}
          pretAConfirmer={pretAConfirmer}
          onConfirmer={() => alert('Réservation confirmée ! 🎉')}
        />

        {/* COLONNE DROITE : formulaire */}
        <div>
          <SlotPicker
            creneauSelectionne={creneauId}
            onSelect={(id, label) => {
              setCreneauId(id)
              setCreneauLabel(label)
            }}
          />
          <DurationPicker duree={duree} onChange={setDuree} />
          <MessageToTutor message={message} onChange={setMessage} />
          <PaymentMethod methode={paiement} onChange={setPaiement} />
          <BookingSummaryCard
            creneauLabel={creneauLabel}
            duree={duree}
            message={message}
            paiement={paiement}
            total={total}
            pretAConfirmer={pretAConfirmer}
            onConfirmer={() => alert('Réservation confirmée ! 🎉')}
          />
        </div>

      </div>
    </div>
  )
}

export default ReservationPage