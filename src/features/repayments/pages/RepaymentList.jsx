import { Alert } from 'antd'
import LinkButton from '@/components/common/LinkButton/LinkButton'
import Pagination from '@/components/common/Pagination/Pagination'
import PageToolbar from '@/components/common/PageToolbar/PageToolbar'
import PanelCard from '@/components/common/PanelCard/PanelCard'
import RepaymentTable from '@/features/repayments/components/RepaymentTable'
import { useRepayments } from '@/features/repayments/hooks/useRepayments'
import { useAuth } from '@/features/auth/hooks/useAuth'
import { getErrorMessage } from '@/services/api/apiClient'
import { PERMISSIONS } from '@/utils/permissions'

export default function RepaymentList() {
  const repayments = useRepayments()
  const { hasPermission } = useAuth()
  return (
    <div>
      <PageToolbar
        title="Repayments"
        description="Recorded payments against loans."
        actions={hasPermission(PERMISSIONS.REPAYMENT_RECORD) ? (
          <LinkButton to="/repayments/record">Record payment</LinkButton>
        ) : null}
      />
      <PanelCard>
        {repayments.isError && <Alert type="error" showIcon className="mb-4" message={getErrorMessage(repayments.error)} />}
        <RepaymentTable items={repayments.items} loading={repayments.isLoading} />
        <Pagination total={repayments.total} page={repayments.page} pageSize={repayments.pageSize} onChange={repayments.onChange} />
      </PanelCard>
    </div>
  )
}
