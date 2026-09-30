import { useState } from 'react'
import { Alert } from 'antd'
import { useQuery } from '@tanstack/react-query'
import dayjs from 'dayjs'
import PageToolbar from '@/components/common/PageToolbar/PageToolbar'
import PanelCard from '@/components/common/PanelCard/PanelCard'
import Money from '@/components/common/Money/Money'
import StatusBadge from '@/components/common/StatusBadge/StatusBadge'
import ReportFilter from '@/features/reports/components/ReportFilter'
import ReportTable from '@/features/reports/components/ReportTable'
import { reportService, toReportParams } from '@/features/reports/services/reportService'
import { getErrorMessage } from '@/services/api/apiClient'
import { formatDateTime } from '@/utils/formatDate'
import { DAY_SLOT, REPORT_RANGE } from '@/utils/constants'

const columns = [
  { title: 'Customer', dataIndex: 'customerName' },
  { title: 'Amount', dataIndex: 'amount', align: 'right', render: (value) => <Money value={value} /> },
  { title: 'Status', dataIndex: 'status', render: (value) => <StatusBadge status={value || 'ON_TIME'} /> },
  { title: 'Paid at', dataIndex: 'paidAt', render: (value) => formatDateTime(value) },
]

export default function RepaymentReport() {
  const [filters, setFilters] = useState({
    range: REPORT_RANGE.MONTH,
    date: dayjs(),
    slot: DAY_SLOT.FULL,
    months: [],
  })
  const params = toReportParams(filters)
  const query = useQuery({
    queryKey: ['reports', 'repayments', params],
    queryFn: () => reportService.repayments(params),
  })

  return (
    <div>
      <PageToolbar title="Payment report" description="Repayments in the selected period." />
      <ReportFilter value={filters} onChange={setFilters} showMonths={false} />
      <PanelCard>
        {query.isError && <Alert type="error" showIcon className="mb-4" message={getErrorMessage(query.error)} />}
        <ReportTable columns={columns} items={query.data?.items} loading={query.isLoading} emptyText="No payments in this period" />
      </PanelCard>
    </div>
  )
}
