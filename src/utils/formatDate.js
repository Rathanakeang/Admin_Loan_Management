import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'

dayjs.extend(relativeTime)

export function formatDate(value, pattern = 'DD MMM YYYY') {
  if (!value) return '—'
  const date = dayjs(value)
  if (!date.isValid()) return '—'
  return date.format(pattern)
}

export function formatDateTime(value) {
  return formatDate(value, 'DD MMM YYYY HH:mm')
}

export function formatRelative(value) {
  if (!value) return '—'
  const date = dayjs(value)
  if (!date.isValid()) return '—'
  return date.fromNow()
}
