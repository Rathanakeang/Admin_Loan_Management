import { getCollection, getResource, writeResource } from '@/services/api/apiClient'
import { endpoints } from '@/services/api/apiEndpoints'

export const repaymentService = {
  list(params) {
    return getCollection(endpoints.repayments.collection, params)
  },
  getById(id) {
    return getResource(endpoints.repayments.detail(id))
  },
  history(loanId) {
    return getCollection(endpoints.repayments.history(loanId))
  },
  record(payload) {
    return writeResource('post', endpoints.repayments.collection, payload)
  },
}
