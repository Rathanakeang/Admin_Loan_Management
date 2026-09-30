import { getCollection, getResource, writeResource } from '@/services/api/apiClient'
import { endpoints } from '@/services/api/apiEndpoints'

export const disbursementService = {
  list(params) {
    return getCollection(endpoints.disbursements.collection, params)
  },
  getById(id) {
    return getResource(endpoints.disbursements.detail(id))
  },
  create(payload) {
    return writeResource('post', endpoints.disbursements.collection, payload)
  },
}
