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
import { formatDate } from '@/utils/formatDate'
import { DAY_SLOT, REPORT_RANGE } from '@/utils/constants'

const columns = [
  { title: 'Name', dataIndex: 'customerName', render: (value, record) => value || record.name },
  { title: 'Amount', dataIndex: 'amount', align: 'right', render: (value) => <Money value={value} /> },
  { title: 'Status', dataIndex: 'status', render: (value) => <StatusBadge status={value} /> },
  { title: 'Date', dataIndex: 'createdAt', render: (value) => formatDate(value) },
]

export default function LoanReport() {
  const [filters, setFilters] = useState({
    range: REPORT_RANGE.YEAR,
    date: dayjs(),
    slot: DAY_SLOT.FULL,
    months: [],
  })
  const params = toReportParams(filters)
  const query = useQuery({
    queryKey: ['reports', 'loans', params],
    queryFn: () => reportService.loans(params),
  })

  return (
    <div>
      <PageToolbar title="Loan applications" description="Applications recorded in the selected period." />
      <ReportFilter value={filters} onChange={setFilters} />
      <PanelCard>
        {query.isError && <Alert type="error" showIcon className="mb-4" message={getErrorMessage(query.error)} />}
        <p className="mt-0 text-sm text-muted">Total loan applications: <strong className="text-ink tabular-nums">{query.data?.total ?? 0}</strong></p>
        <ReportTable columns={columns} items={query.data?.items} loading={query.isLoading} emptyText="No loan applications in this period" />
      </PanelCard>
    </div>
  )
}
