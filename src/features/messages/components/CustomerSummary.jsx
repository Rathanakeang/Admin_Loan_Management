import { formatDate } from '@/utils/formatDate'

export default function CustomerSummary({ customer }) {
  if (!customer) return null
  const items = [
    { label: 'Phone', value: customer.phone || '—' },
    { label: 'Address', value: customer.address || '—' },
    { label: 'Date of birth', value: formatDate(customer.dateOfBirth) },
    { label: 'Hire date', value: formatDate(customer.hireDate) },
  ]
  return (
    <dl className="mb-4 grid grid-cols-1 gap-3 border-b border-line pb-4 sm:grid-cols-2">
      {items.map((item) => (
        <div key={item.label}>
          <dt className="text-xs font-medium text-muted">{item.label}</dt>
          <dd className="mt-1 mb-0 text-sm text-ink">{item.value}</dd>
        </div>
      ))}
    </dl>
  )
}
