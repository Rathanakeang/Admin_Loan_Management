import { getCollection, getResource } from '@/services/api/apiClient'
import { endpoints } from '@/services/api/apiEndpoints'
import { REPORT_RANGE } from '@/utils/constants'

export function toReportParams(filters) {
  return {
    range: filters.range,
    date: filters.date?.format?.('YYYY-MM-DD'),
    slot: filters.range === REPORT_RANGE.DAY ? filters.slot : undefined,
    year: filters.date?.year?.(),
    months: filters.months?.length ? filters.months.join(',') : undefined,
  }
}

function pick(raw, keys) {
  for (const key of keys) {
    if (raw && raw[key] != null) return raw[key]
  }
  return undefined
}

export const reportService = {
  async overview(params) {
    const raw = await getResource(endpoints.reports.overview, params)
    return {
      totalUsersApplied: pick(raw, ['totalUsersApplied', 'totalApplications']),
      loansApproved: pick(raw, ['loansApproved', 'approved']),
      loansRejected: pick(raw, ['loansRejected', 'rejected']),
      onTimePayments: pick(raw, ['onTimePayments', 'onTime']),
      latePayments: pick(raw, ['latePayments', 'late']),
    }
  },
  loans(params) {
    return getCollection(endpoints.reports.loans, params)
  },
  approved(params) {
    return getCollection(endpoints.reports.approved, params)
  },
  rejected(params) {
    return getCollection(endpoints.reports.rejected, params)
  },
  repayments(params) {
    return getCollection(endpoints.reports.repayments, params)
  },
  customers(params) {
    return getCollection(endpoints.reports.customers, params)
  },
  portfolio(params) {
    return getResource(endpoints.reports.portfolio, params)
  },
}
