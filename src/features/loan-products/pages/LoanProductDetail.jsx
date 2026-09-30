import { Alert } from 'antd'
import { useParams } from 'react-router-dom'
import LinkButton from '@/components/common/LinkButton/LinkButton'
import Loading from '@/components/common/Loading/Loading'
import InfoGrid from '@/components/common/InfoGrid/InfoGrid'
import Money from '@/components/common/Money/Money'
import PageToolbar from '@/components/common/PageToolbar/PageToolbar'
import PanelCard from '@/components/common/PanelCard/PanelCard'
import { useLoanProduct } from '@/features/loan-products/hooks/useLoanProducts'
import { useAuth } from '@/features/auth/hooks/useAuth'
import { getErrorMessage } from '@/services/api/apiClient'
import { PERMISSIONS } from '@/utils/permissions'

export default function LoanProductDetail() {
  const { id } = useParams()
  const product = useLoanProduct(id)
  const { hasPermission } = useAuth()

  if (product.isLoading) return <Loading />
  if (product.isError) return <Alert type="error" showIcon message={getErrorMessage(product.error)} />

  const record = product.data || {}
  return (
    <div>
      <PageToolbar
        title={record.name || 'Loan product'}
        description="Product terms"
        actions={hasPermission(PERMISSIONS.PRODUCT_MANAGE) ? (
          <LinkButton to={`/loan-products/${id}/edit`}>Edit</LinkButton>
        ) : null}
      />
      <PanelCard>
        <InfoGrid
          items={[
            { label: 'Interest rate', value: record.interestRate == null ? '—' : `${record.interestRate}%` },
            { label: 'Minimum amount', value: <Money value={record.minAmount} /> },
            { label: 'Maximum amount', value: <Money value={record.maxAmount} /> },
            { label: 'Loan term', value: `${record.minTermMonths ?? '—'}–${record.maxTermMonths ?? '—'} months` },
          ]}
        />
      </PanelCard>
    </div>
  )
}
