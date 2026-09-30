import { formatCurrency } from '@/utils/formatCurrency'

export default function Money({ value }) {
  return <span className="tabular-nums text-ink">{formatCurrency(value)}</span>
}
