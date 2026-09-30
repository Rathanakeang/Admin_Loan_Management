import { getCollection, getResource, writeResource } from '@/services/api/apiClient'
import { endpoints } from '@/services/api/apiEndpoints'

export const customerService = {
  list(params) {
    return getCollection(endpoints.customers.collection, params)
  },
  getById(id) {
    return getResource(endpoints.customers.detail(id))
  },
  create(payload) {
    return writeResource('post', endpoints.customers.collection, payload)
  },
  update(id, payload) {
    return writeResource('put', endpoints.customers.detail(id), payload)
  },
}
