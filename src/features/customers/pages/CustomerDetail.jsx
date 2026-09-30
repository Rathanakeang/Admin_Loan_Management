import { Alert } from 'antd'
import { useParams } from 'react-router-dom'
import LinkButton from '@/components/common/LinkButton/LinkButton'
import Loading from '@/components/common/Loading/Loading'
import PageToolbar from '@/components/common/PageToolbar/PageToolbar'
import PanelCard from '@/components/common/PanelCard/PanelCard'
import CustomerProfile from '@/features/customers/components/CustomerProfile'
import { useCustomer } from '@/features/customers/hooks/useCustomers'
import { useAuth } from '@/features/auth/hooks/useAuth'
import { getErrorMessage } from '@/services/api/apiClient'
import { PERMISSIONS } from '@/utils/permissions'

export default function CustomerDetail() {
  const { id } = useParams()
  const customer = useCustomer(id)
  const { hasPermission } = useAuth()

  if (customer.isLoading) return <Loading />
  if (customer.isError) return <Alert type="error" showIcon message={getErrorMessage(customer.error)} />

  return (
    <div>
      <PageToolbar
        title={customer.data?.name || 'Customer'}
        description="Customer information"
        actions={hasPermission(PERMISSIONS.CUSTOMER_MANAGE) ? (
          <LinkButton to={`/customers/${id}/edit`}>Edit</LinkButton>
        ) : null}
      />
      <PanelCard>
        <CustomerProfile customer={customer.data} />
      </PanelCard>
    </div>
  )
}
