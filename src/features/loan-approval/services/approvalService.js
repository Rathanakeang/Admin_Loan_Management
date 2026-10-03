import { collection, doc, getCountFromServer, getDoc, getDocs, query, updateDoc, where } from 'firebase/firestore'
import { getCollection, getResource, writeResource } from '@/services/api/apiClient'
import { endpoints } from '@/services/api/apiEndpoints'
import { isFirebaseConfigured, requireFirestore } from '@/services/firebase/firebase'

const PENDING_STATUSES = ['pending', 'Pending', 'PENDING']

function normalizeApplication(snapshot) {
  const data = snapshot.data()
  return {
    ...data,
    id: snapshot.id,
    status: String(data.status || '').toUpperCase(),
    customerName: data.fullName || data.customerName || data.name || '',
    amount: data.loanAmount ?? data.amount,
    termMonths: data.loanTermMonths ?? data.termMonths,
    purpose: data.loanPurpose || data.purpose || '',
  }
}

function timestampMillis(value) {
  if (typeof value?.toMillis === 'function') return value.toMillis()
  const timestamp = new Date(value || 0).getTime()
  return Number.isFinite(timestamp) ? timestamp : 0
}

export const approvalService = {
  async queue(params) {
    if (isFirebaseConfigured) {
      const database = requireFirestore()
      const applications = collection(database, 'loan_applications')
      const pendingQuery = query(applications, where('status', 'in', PENDING_STATUSES))
      const [snapshot, count] = await Promise.all([
        getDocs(pendingQuery),
        getCountFromServer(pendingQuery),
      ])
      const ordered = snapshot.docs
        .map(normalizeApplication)
        .sort((left, right) => timestampMillis(right.createdAt) - timestampMillis(left.createdAt))
      const page = Math.max(1, Number(params?.page) || 1)
      const pageSize = Math.max(1, Number(params?.pageSize) || 10)
      return {
        items: ordered.slice((page - 1) * pageSize, page * pageSize),
        total: count.data().count,
      }
    }
    return getCollection(endpoints.approvals.queue, params)
  },
  async getById(id) {
    if (isFirebaseConfigured) {
      const snapshot = await getDoc(doc(requireFirestore(), 'loan_applications', id))
      if (!snapshot.exists()) throw new Error('Loan application was not found.')
      return normalizeApplication(snapshot)
    }
    return getResource(endpoints.approvals.detail(id))
  },
  history(id) {
    if (isFirebaseConfigured) return Promise.resolve({ items: [], total: 0 })
    return getCollection(endpoints.approvals.history(id))
  },
  async decide(id, payload) {
    if (isFirebaseConfigured) {
      const status = payload.decision.toLowerCase()
      await updateDoc(doc(requireFirestore(), 'loan_applications', id), {
        status,
        comment: payload.comment,
      })
      return { id, status: status.toUpperCase(), comment: payload.comment }
    }
    return writeResource('post', endpoints.approvals.decision(id), payload)
  },
}
