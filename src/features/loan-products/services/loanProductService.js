import { getCollection, getResource, writeResource } from '@/services/api/apiClient'
import { endpoints } from '@/services/api/apiEndpoints'

export const loanProductService = {
  list(params) {
    return getCollection(endpoints.loanProducts.collection, params)
  },
  getById(id) {
    return getResource(endpoints.loanProducts.detail(id))
  },
  create(payload) {
    return writeResource('post', endpoints.loanProducts.collection, payload)
  },
  update(id, payload) {
    return writeResource('put', endpoints.loanProducts.detail(id), payload)
  },
}
