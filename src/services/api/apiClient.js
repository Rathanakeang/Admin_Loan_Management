import axios from 'axios'
import { environment } from '@/config/environment'
import { storage } from '@/services/storage/localStorage'
import { localAdapter, LOCAL_TOKEN } from '@/services/local/localData'

let onUnauthorized = () => {}

export function setUnauthorizedHandler(handler) {
  onUnauthorized = handler
}

export const apiClient = axios.create({
  baseURL: environment.useLocalData ? '' : environment.apiBaseUrl,
  timeout: 30000,
  headers: {
    Accept: 'application/json',
  },
  adapter: environment.useLocalData ? localAdapter : undefined,
})

apiClient.interceptors.request.use((config) => {
  const sessionToken = storage.getToken()
  const token = environment.useLocalData
    ? sessionToken ? LOCAL_TOKEN : null
    : sessionToken
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  if (config.data instanceof FormData) {
    delete config.headers['Content-Type']
  }
  return config
})

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status
    const url = error.config?.url || ''
    const isLoginAttempt = url.includes('/auth/login')
    if (status === 401 && !isLoginAttempt) {
      onUnauthorized()
    }
    return Promise.reject(error)
  },
)

export function getErrorMessage(error) {
  const data = error?.response?.data
  if (typeof data === 'string' && data.trim()) return data
  if (data?.message) return data.message
  if (Array.isArray(data?.errors) && data.errors[0]?.message) return data.errors[0].message
  if (error?.message === 'Network Error') {
    return `Cannot reach the API at ${environment.apiBaseUrl}`
  }
  return error?.message || 'Something went wrong'
}

export function unwrapData(body) {
  if (body == null || typeof body !== 'object' || Array.isArray(body)) return body
  const looksWrapped = 'data' in body && ('success' in body || 'message' in body || 'meta' in body)
  return looksWrapped ? body.data : body
}

export function unwrapList(body) {
  const payload = unwrapData(body)
  if (Array.isArray(payload)) {
    return {
      items: payload,
      total: body?.meta?.total ?? body?.total ?? payload.length,
    }
  }
  if (payload && Array.isArray(payload.items)) {
    return { items: payload.items, total: payload.total ?? payload.items.length }
  }
  if (payload && Array.isArray(payload.content)) {
    return {
      items: payload.content,
      total: payload.totalElements ?? payload.content.length,
    }
  }
  return { items: [], total: 0 }
}

export function unwrapAuth(body) {
  const data = unwrapData(body) ?? {}
  return {
    token: data.token || data.accessToken || data.access_token || null,
    user: data.user || data.admin || null,
  }
}

export async function getCollection(url, params) {
  const response = await apiClient.get(url, { params })
  return unwrapList(response.data)
}

export async function getResource(url, params) {
  const response = await apiClient.get(url, { params })
  return unwrapData(response.data)
}

export async function writeResource(method, url, payload) {
  const response = await apiClient.request({ method, url, data: payload })
  return unwrapData(response.data)
}
