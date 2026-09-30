import { useState } from 'react'
import { Alert } from 'antd'
import { useQuery } from '@tanstack/react-query'
import dayjs from 'dayjs'
import Loading from '@/components/common/Loading/Loading'
import Money from '@/components/common/Money/Money'
import PageToolbar from '@/components/common/PageToolbar/PageToolbar'
import PanelCard from '@/components/common/PanelCard/PanelCard'
import ReportFilter from '@/features/reports/components/ReportFilter'
import { reportService, toReportParams } from '@/features/reports/services/reportService'
import { getErrorMessage } from '@/services/api/apiClient'
import { DAY_SLOT, REPORT_RANGE } from '@/utils/constants'

export default function PortfolioReport() {
  const [filters, setFilters] = useState({
    range: REPORT_RANGE.MONTH,
    date: dayjs(),
    slot: DAY_SLOT.FULL,
    months: [],
  })
  const params = toReportParams(filters)
  const query = useQuery({
    queryKey: ['reports', 'portfolio', params],
    queryFn: () => reportService.portfolio(params),
  })
  const data = query.data || {}

  const cards = [
    { label: 'Outstanding principal', value: <Money value={data.outstandingPrincipal} /> },
    { label: 'Active loans', value: data.activeLoans ?? 0 },
    { label: 'Overdue loans', value: data.overdueLoans ?? 0 },
    { label: 'Collected this period', value: <Money value={data.collected} /> },
  ]

  return (
    <div>
      <PageToolbar title="Portfolio report" description="Balances and collections for the selected period." />
      <ReportFilter value={filters} onChange={setFilters} showSlots={false} />
      <PanelCard>
        {query.isLoading && <Loading />}
        {query.isError && <Alert type="error" showIcon message={getErrorMessage(query.error)} />}
        {query.isSuccess && (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {cards.map((card) => (
              <article key={card.label} className="rounded-lg border border-line bg-canvas px-4 py-3">
                <p className="m-0 text-sm text-muted">{card.label}</p>
                <p className="mt-2 mb-0 text-xl font-semibold tabular-nums text-ink">{card.value}</p>
              </article>
            ))}
          </div>
        )}
      </PanelCard>
    </div>
  )
}
