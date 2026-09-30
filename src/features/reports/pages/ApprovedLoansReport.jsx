import { useState } from 'react'
import { Alert } from 'antd'
import { useQuery } from '@tanstack/react-query'
import dayjs from 'dayjs'
import PageToolbar from '@/components/common/PageToolbar/PageToolbar'
import PanelCard from '@/components/common/PanelCard/PanelCard'
import Money from '@/components/common/Money/Money'
import ReportFilter from '@/features/reports/components/ReportFilter'
import ReportTable from '@/features/reports/components/ReportTable'
import { reportService, toReportParams } from '@/features/reports/services/reportService'
import { getErrorMessage } from '@/services/api/apiClient'
import { formatDateTime } from '@/utils/formatDate'
import { DAY_SLOT, REPORT_RANGE } from '@/utils/constants'

const columns = [
  { title: 'Customer', dataIndex: 'customerName', render: (value, record) => value || record.name },
  { title: 'Amount', dataIndex: 'amount', align: 'right', render: (value) => <Money value={value} /> },
  { title: 'Approved at', dataIndex: 'approvedAt', render: (value, record) => formatDateTime(value || record.createdAt) },
]

export default function ApprovedLoansReport() {
  const [filters, setFilters] = useState({
    range: REPORT_RANGE.DAY,
    date: dayjs(),
    slot: DAY_SLOT.FULL,
    months: [],
  })
  const params = toReportParams(filters)
  const query = useQuery({
    queryKey: ['reports', 'approved', params],
    queryFn: () => reportService.approved(params),
  })

  return (
    <div>
      <PageToolbar title="Approved loans" description="Loans approved in the selected period." />
      <ReportFilter value={filters} onChange={setFilters} showMonths={false} />
      <PanelCard>
        {query.isError && <Alert type="error" showIcon className="mb-4" message={getErrorMessage(query.error)} />}
        <ReportTable columns={columns} items={query.data?.items} loading={query.isLoading} emptyText="No loans approved in this period" />
      </PanelCard>
    </div>
  )
}
