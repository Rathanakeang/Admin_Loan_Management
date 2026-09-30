import EmptyState from '@/components/common/EmptyState/EmptyState'
import Loading from '@/components/common/Loading/Loading'
import PanelCard from '@/components/common/PanelCard/PanelCard'

export default function LoanChart({ title = 'Total diagram', labels = [], values = [], loading = false }) {
  const max = Math.max(...values, 0)

  return (
    <PanelCard>
      <h2 className="m-0 text-lg font-semibold text-ink">{title}</h2>
      {loading && <Loading />}
      {!loading && labels.length === 0 && <EmptyState description="No chart data for this period" />}
      {!loading && labels.length > 0 && (
        <div className="mt-4 flex h-56 items-end gap-2" aria-label={title}>
          {labels.map((label, index) => {
            const value = values[index] || 0
            const height = max > 0 ? Math.max((value / max) * 100, 4) : 4
            return (
              <div key={`${label}-${index}`} className="flex h-full min-w-0 flex-1 flex-col items-center">
                <div className="flex w-full flex-1 items-end justify-center">
                  <div
                    className="w-full max-w-7 rounded-t-md bg-brand"
                    style={{ height: `${height}%` }}
                    title={`${label}: ${value}`}
                  />
                </div>
                <span className="mt-2 text-center text-xs text-muted">{label}</span>
              </div>
            )
          })}
        </div>
      )}
    </PanelCard>
  )
}
