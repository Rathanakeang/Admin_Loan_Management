import { getCollection, getResource } from '@/services/api/apiClient'
import { endpoints } from '@/services/api/apiEndpoints'

function normalizeSeries(raw) {
  const source = raw?.series || raw
  if (Array.isArray(source)) {
    return {
      labels: source.map((item) => item.label || item.month || item.name || ''),
      values: source.map((item) => Number(item.value ?? item.count ?? item.total ?? 0)),
    }
  }
  return {
    labels: source?.labels || [],
    values: (source?.values || source?.data || []).map(Number),
  }
}

function normalizeSummary(raw = {}) {
  return {
    totalUsersApplied: raw.totalUsersApplied ?? raw.totalApplications ?? 0,
    loansApproved: raw.loansApproved ?? raw.approved ?? 0,
    loansRejected: raw.loansRejected ?? raw.rejected ?? 0,
    onTimePayments: raw.onTimePayments ?? raw.onTime ?? 0,
    latePayments: raw.latePayments ?? raw.late ?? 0,
  }
}

export const dashboardService = {
  async summary() {
    return normalizeSummary(await getResource(endpoints.dashboard.summary))
  },
  async registrationChart() {
    return normalizeSeries(await getResource(endpoints.dashboard.registrationChart))
  },
  async loanChart() {
    return normalizeSeries(await getResource(endpoints.dashboard.loanChart))
  },
  async paymentChart() {
    return normalizeSeries(await getResource(endpoints.dashboard.paymentChart))
  },
  recentLoans() {
    return getCollection(endpoints.dashboard.recentLoans)
  },
}
