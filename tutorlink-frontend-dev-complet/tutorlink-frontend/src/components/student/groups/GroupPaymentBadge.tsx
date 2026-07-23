import { GroupPaymentStatus } from '../../../types/studentGroup.types';

interface Props { status: GroupPaymentStatus; }

// Badge statut paiement mensuel
const config: Record<GroupPaymentStatus, {
  label: string; className: string;
}> = {
  a_jour:     { label: '✅ À jour',      className: 'bg-green-100 text-green-700' },
  en_retard:  { label: '⚠️ En retard',  className: 'bg-red-100 text-red-700' },
  en_attente: { label: '⏳ En attente', className: 'bg-orange-100 text-orange-700' },
};

const GroupPaymentBadge = ({ status }: Props) => {
  const { label, className } = config[status];
  return (
    <span className={`${className} text-xs font-bold
                     px-2 py-1 rounded-full`}>
      {label}
    </span>
  );
};

export default GroupPaymentBadge;