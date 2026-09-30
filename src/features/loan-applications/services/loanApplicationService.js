import { apiClient, getCollection, getResource, writeResource } from '@/services/api/apiClient'
import { endpoints } from '@/services/api/apiEndpoints'

export const loanApplicationService = {
  list(params) {
    return getCollection(endpoints.loanApplications.collection, params)
  },
  getById(id) {
    return getResource(endpoints.loanApplications.detail(id))
  },
  create(payload) {
    return writeResource('post', endpoints.loanApplications.collection, payload)
  },
  update(id, payload) {
    return writeResource('put', endpoints.loanApplications.detail(id), payload)
  },
  async uploadDocument(id, file) {
    const formData = new FormData()
    formData.append('file', file)
    const response = await apiClient.post(endpoints.loanApplications.documents(id), formData)
    return response.data
  },
}
