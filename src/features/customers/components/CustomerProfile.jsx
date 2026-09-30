import InfoGrid from '@/components/common/InfoGrid/InfoGrid'
import { formatDate } from '@/utils/formatDate'

export default function CustomerProfile({ customer }) {
  if (!customer) return null
  return (
    <InfoGrid
      items={[
        { label: 'User ID', value: customer.userId || customer.id },
        { label: 'Name', value: customer.name },
        { label: 'Email', value: customer.email },
        { label: 'Phone', value: customer.phone || '—' },
        { label: 'Address', value: customer.address || '—' },
        { label: 'Date of birth', value: formatDate(customer.dateOfBirth) },
        { label: 'Hire date', value: formatDate(customer.hireDate) },
      ]}
    />
  )
}
