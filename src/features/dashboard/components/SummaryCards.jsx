import {
  TeamOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
  ClockCircleOutlined,
  ExclamationCircleOutlined,
} from '@ant-design/icons'

const cards = [
  { key: 'totalUsersApplied', label: 'Users applied', hint: 'Submitted applications', icon: TeamOutlined, tone: 'text-muted bg-canvas' },
  { key: 'loansApproved', label: 'Approved', hint: 'Approved loans', icon: CheckCircleOutlined, tone: 'text-green-700 bg-green-50' },
  { key: 'loansRejected', label: 'Rejected', hint: 'Declined applications', icon: CloseCircleOutlined, tone: 'text-red-700 bg-red-50' },
  { key: 'onTimePayments', label: 'On-time payments', hint: 'Paid on schedule', icon: ClockCircleOutlined, tone: 'text-muted bg-canvas' },
  { key: 'latePayments', label: 'Late payments', hint: 'Paid after the due date', icon: ExclamationCircleOutlined, tone: 'text-amber-700 bg-amber-50' },
]

export default function SummaryCards({ summary }) {
  return (
    <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-5">
      {cards.map((card) => {
        const Icon = card.icon
        return (
          <article key={card.key} className="rounded-xl border border-line bg-white px-5 py-4">
            <div className="flex items-start justify-between gap-3">
              <p className="m-0 text-sm text-muted">{card.label}</p>
              <span className={`grid h-8 w-8 place-items-center rounded-lg text-sm ${card.tone}`}>
                <Icon />
              </span>
            </div>
            <p className="mt-3 mb-1 text-[28px] font-semibold leading-none tabular-nums text-ink">
              {summary?.[card.key] ?? '—'}
            </p>
            <p className="m-0 text-xs text-subtle">{card.hint}</p>
          </article>
        )
      })}
    </div>
  )
}
