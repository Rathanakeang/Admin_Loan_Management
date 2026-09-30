import { useState } from 'react'
import { Alert } from 'antd'
import { useQuery } from '@tanstack/react-query'
import dayjs from 'dayjs'
import PageToolbar from '@/components/common/PageToolbar/PageToolbar'
import PanelCard from '@/components/common/PanelCard/PanelCard'
import ReportFilter from '@/features/reports/components/ReportFilter'
import ReportTable from '@/features/reports/components/ReportTable'
import { reportService, toReportParams } from '@/features/reports/services/reportService'
import { getErrorMessage } from '@/services/api/apiClient'
import { formatDate } from '@/utils/formatDate'
import { DAY_SLOT, REPORT_RANGE } from '@/utils/constants'

const columns = [
  { title: 'User ID', dataIndex: 'userId', render: (value, record) => value || record.id },
  { title: 'Name', dataIndex: 'name' },
  { title: 'Email', dataIndex: 'email' },
  { title: 'Registered', dataIndex: 'createdAt', render: (value) => formatDate(value) },
]

export default function CustomerReport() {
  const [filters, setFilters] = useState({
    range: REPORT_RANGE.MONTH,
    date: dayjs(),
    slot: DAY_SLOT.FULL,
    months: [],
  })
  const params = toReportParams(filters)
  const query = useQuery({
    queryKey: ['reports', 'customers', params],
    queryFn: () => reportService.customers(params),
  })

  return (
    <div>
      <PageToolbar title="Customer report" description="Customers registered in the selected period." />
      <ReportFilter value={filters} onChange={setFilters} />
      <PanelCard>
        {query.isError && <Alert type="error" showIcon className="mb-4" message={getErrorMessage(query.error)} />}
        <ReportTable columns={columns} items={query.data?.items} loading={query.isLoading} emptyText="No customers in this period" />
      </PanelCard>
    </div>
  )
}
