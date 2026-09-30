import { Alert } from 'antd'
import LinkButton from '@/components/common/LinkButton/LinkButton'
import Input from '@/components/common/Input/Input'
import Pagination from '@/components/common/Pagination/Pagination'
import PageToolbar from '@/components/common/PageToolbar/PageToolbar'
import PanelCard from '@/components/common/PanelCard/PanelCard'
import LoanProductTable from '@/features/loan-products/components/LoanProductTable'
import { useLoanProducts } from '@/features/loan-products/hooks/useLoanProducts'
import { useAuth } from '@/features/auth/hooks/useAuth'
import { getErrorMessage } from '@/services/api/apiClient'
import { PERMISSIONS } from '@/utils/permissions'

export default function LoanProductList() {
  const products = useLoanProducts()
  const { hasPermission } = useAuth()

  return (
    <div>
      <PageToolbar
        title="Loan products"
        description="Interest, amount limits, and term for each product."
        actions={hasPermission(PERMISSIONS.PRODUCT_MANAGE) ? (
          <LinkButton to="/loan-products/new">New loan product</LinkButton>
        ) : null}
      />
      <PanelCard>
        <div className="mb-4 max-w-md">
          <Input
            placeholder="Search products"
            aria-label="Search loan products"
            value={products.searchInput}
            onChange={(event) => products.setSearchInput(event.target.value)}
          />
        </div>
        {products.isError && <Alert type="error" showIcon className="mb-4" message={getErrorMessage(products.error)} />}
        <LoanProductTable items={products.items} loading={products.isLoading} />
        <Pagination total={products.total} page={products.page} pageSize={products.pageSize} onChange={products.onChange} />
      </PanelCard>
    </div>
  )
}
