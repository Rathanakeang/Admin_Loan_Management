import { Alert } from 'antd'
import LinkButton from '@/components/common/LinkButton/LinkButton'
import Input from '@/components/common/Input/Input'
import Pagination from '@/components/common/Pagination/Pagination'
import PageToolbar from '@/components/common/PageToolbar/PageToolbar'
import PanelCard from '@/components/common/PanelCard/PanelCard'
import CustomerTable from '@/features/customers/components/CustomerTable'
import { useCustomers } from '@/features/customers/hooks/useCustomers'
import { useAuth } from '@/features/auth/hooks/useAuth'
import { getErrorMessage } from '@/services/api/apiClient'
import { PERMISSIONS } from '@/utils/permissions'

export default function CustomerList() {
  const customers = useCustomers()
  const { hasPermission } = useAuth()

  return (
    <div>
      <PageToolbar
        title="Customers"
        description="Search borrower records by user ID, email, or name."
        actions={hasPermission(PERMISSIONS.CUSTOMER_MANAGE) ? (
          <LinkButton to="/customers/new">New customer</LinkButton>
        ) : null}
      />
      <PanelCard>
        <div className="mb-4 max-w-md">
          <Input
            placeholder="Search by user ID, email, or name"
            value={customers.searchInput}
            onChange={(event) => customers.setSearchInput(event.target.value)}
            aria-label="Search customers"
          />
        </div>
        {customers.isError && (
          <Alert type="error" showIcon className="mb-4" message={getErrorMessage(customers.error)} />
        )}
        <CustomerTable items={customers.items} loading={customers.isLoading} />
        <Pagination
          total={customers.total}
          page={customers.page}
          pageSize={customers.pageSize}
          onChange={customers.onChange}
        />
      </PanelCard>
    </div>
  )
}
