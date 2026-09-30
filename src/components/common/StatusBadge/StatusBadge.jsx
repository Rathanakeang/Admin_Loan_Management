const STYLES = {
  PENDING: 'bg-amber-50 text-amber-800 ring-amber-200',
  APPROVED: 'bg-green-50 text-green-800 ring-green-200',
  REJECTED: 'bg-red-50 text-red-700 ring-red-200',
  DISBURSED: 'bg-blue-50 text-blue-800 ring-blue-200',
  ACTIVE: 'bg-green-50 text-green-800 ring-green-200',
  CLOSED: 'bg-slate-100 text-slate-600 ring-slate-200',
  OVERDUE: 'bg-red-50 text-red-700 ring-red-200',
  ON_TIME: 'bg-green-50 text-green-800 ring-green-200',
  LATE: 'bg-amber-50 text-amber-800 ring-amber-200',
  PROCESSING: 'bg-blue-50 text-blue-800 ring-blue-200',
  COMPLETED: 'bg-green-50 text-green-800 ring-green-200',
  FAILED: 'bg-red-50 text-red-700 ring-red-200',
}

const LABELS = {
  PENDING: 'Pending',
  APPROVED: 'Approved',
  REJECTED: 'Rejected',
  DISBURSED: 'Disbursed',
  ACTIVE: 'Active',
  CLOSED: 'Closed',
  OVERDUE: 'Overdue',
  ON_TIME: 'On time',
  LATE: 'Late',
  PROCESSING: 'Processing',
  COMPLETED: 'Completed',
  FAILED: 'Failed',
}

export default function StatusBadge({ status }) {
  if (!status) return <span className="text-sm text-muted">—</span>
  const tone = STYLES[status] || 'bg-slate-100 text-slate-600 ring-slate-200'
  const label = LABELS[status] || String(status).replaceAll('_', ' ')
  return (
    <span className={`inline-flex items-center rounded-md px-2 py-0.5 text-xs font-medium ring-1 ring-inset ${tone}`}>
      {label}
    </span>
  )
}
