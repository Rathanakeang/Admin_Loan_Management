import LoanChart from '@/features/dashboard/components/LoanChart'

export default function PaymentChart({ labels = [], values = [], loading = false }) {
  return <LoanChart title="Payments" labels={labels} values={values} loading={loading} />
}
