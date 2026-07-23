import { useStudentPayments } from '../../hooks/useStudentPayments';
import PaymentFilterBar from '../../components/student/payments/PaymentFilterBar';
import PaymentsTable from '../../components/student/payments/PaymentsTable';
import PaymentMethodCard from '../../components/student/payments/PaymentMethodCard';
import AddPaymentMethodModal from '../../components/student/payments/AddPaymentMethodModal';

const StudentPaymentsPage = () => {
  const {
    filteredPayments, filters, setFilters, stats,
    paymentMethods, showAddMethod, setShowAddMethod,
    handleSetDefault, handleRemoveMethod,
    handleAddMethod, handleDownloadReceipt,
  } = useStudentPayments();

  return (
    <div className="flex flex-col gap-6">

      {/* Titre */}
      <div>
        <h2 className="text-xl font-bold text-gray-800">
          💰 Mes paiements
        </h2>
        <p className="text-gray-400 text-sm mt-1">
          Historique de vos transactions Mobile Money.
        </p>
      </div>

      {/* Cartes statistiques */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          {
            value: `${stats.totalSpent.toLocaleString()} F`,
            label: 'Dépensé ce mois',
            color: 'bg-blue-50 text-blue-800',
          },
          {
            value: stats.totalTransactions,
            label: 'Transactions réussies',
            color: 'bg-green-50 text-green-800',
          },
          {
            value: `${stats.pendingAmount.toLocaleString()} F`,
            label: 'Montant en attente',
            color: 'bg-orange-50 text-orange-800',
          },
          {
            value: `${stats.averagePerCourse.toLocaleString()} F`,
            label: 'Moyenne / cours',
            color: 'bg-yellow-50 text-yellow-800',
          },
        ].map(s => (
          <div key={s.label}
            className={`${s.color} rounded-xl p-4 text-center`}>
            <p className="text-2xl font-bold">{s.value}</p>
            <p className="text-xs font-medium mt-1">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Moyens de paiement */}
      <div>
        <div className="flex justify-between items-center mb-3">
          <h3 className="font-bold text-gray-700">
            📱 Mes moyens de paiement
          </h3>
          <button
            onClick={() => setShowAddMethod(true)}
            className="bg-[#1a2744] hover:bg-blue-900 text-white
                       text-xs font-bold px-4 py-2 rounded-lg
                       cursor-pointer transition-colors"
          >
            + Ajouter
          </button>
        </div>

        <div className="flex flex-col gap-3">
          {paymentMethods.map(method => (
            <PaymentMethodCard
              key={method.id}
              method={method}
              onSetDefault={handleSetDefault}
              onRemove={handleRemoveMethod}
            />
          ))}
        </div>
      </div>

      {/* Historique des transactions */}
      <div>
        <h3 className="font-bold text-gray-700 mb-3">
          📋 Historique des transactions
        </h3>

        {/* Filtres */}
        <PaymentFilterBar filters={filters} onChange={setFilters} />

        {/* Tableau */}
        <div className="mt-4">
          <PaymentsTable
            payments={filteredPayments}
            onDownloadReceipt={handleDownloadReceipt}
          />
        </div>
      </div>

      {/* Modal ajout moyen de paiement */}
      {showAddMethod && (
        <AddPaymentMethodModal
          onAdd={handleAddMethod}
          onClose={() => setShowAddMethod(false)}
        />
      )}
    </div>
  );
};

export default StudentPaymentsPage;