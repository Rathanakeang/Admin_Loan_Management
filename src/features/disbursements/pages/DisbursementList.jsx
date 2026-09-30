import { Alert } from 'antd'
import LinkButton from '@/components/common/LinkButton/LinkButton'
import Pagination from '@/components/common/Pagination/Pagination'
import PageToolbar from '@/components/common/PageToolbar/PageToolbar'
import PanelCard from '@/components/common/PanelCard/PanelCard'
import DisbursementTable from '@/features/disbursements/components/DisbursementTable'
import { useDisbursements } from '@/features/disbursements/hooks/useDisbursements'
import { useAuth } from '@/features/auth/hooks/useAuth'
import { getErrorMessage } from '@/services/api/apiClient'
import { PERMISSIONS } from '@/utils/permissions'

export default function DisbursementList() {
  const disbursements = useDisbursements()
  const { hasPermission } = useAuth()
  return (
    <div>
      <PageToolbar
        title="Disbursements"
        description="Funds released against approved applications."
        actions={hasPermission(PERMISSIONS.DISBURSEMENT_MANAGE) ? (
          <LinkButton to="/disbursements/new">Record disbursement</LinkButton>
        ) : null}
      />
      <PanelCard>
        {disbursements.isError && <Alert type="error" showIcon className="mb-4" message={getErrorMessage(disbursements.error)} />}
        <DisbursementTable items={disbursements.items} loading={disbursements.isLoading} />
        <Pagination total={disbursements.total} page={disbursements.page} pageSize={disbursements.pageSize} onChange={disbursements.onChange} />
      </PanelCard>
    </div>
  )
}
