import { getCollection, getResource, writeResource } from '@/services/api/apiClient'
import { endpoints } from '@/services/api/apiEndpoints'

export const approvalService = {
  queue(params) {
    return getCollection(endpoints.approvals.queue, params)
  },
  getById(id) {
    return getResource(endpoints.approvals.detail(id))
  },
  history(id) {
    return getCollection(endpoints.approvals.history(id))
  },
  decide(id, payload) {
    return writeResource('post', endpoints.approvals.decision(id), payload)
  },
}
