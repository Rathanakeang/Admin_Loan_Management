import { collection, doc, documentId, getCountFromServer, getDoc, getDocs, limit, orderBy, query } from 'firebase/firestore'
import { getCollection, getResource, writeResource } from '@/services/api/apiClient'
import { endpoints } from '@/services/api/apiEndpoints'
import { isFirebaseConfigured, requireFirestore } from '@/services/firebase/firebase'

function mapUser(snapshot) {
  const user = { ...snapshot.data(), id: snapshot.id }
  delete user.password
  return user
}

export const userService = {
  async list(params) {
    if (isFirebaseConfigured) {
      const database = requireFirestore()
      const users = collection(database, 'users')
      const page = Math.max(1, Number(params?.page) || 1)
      const pageSize = Math.max(1, Number(params?.pageSize) || 10)
      const [snapshot, count] = await Promise.all([
        getDocs(query(users, orderBy(documentId()), limit(page * pageSize))),
        getCountFromServer(users),
      ])
      return {
        items: snapshot.docs.slice((page - 1) * pageSize).map(mapUser),
        total: count.data().count,
      }
    }
    return getCollection(endpoints.users.collection, params)
  },
  async getById(id) {
    if (isFirebaseConfigured) {
      const snapshot = await getDoc(doc(requireFirestore(), 'users', id))
      if (!snapshot.exists()) throw new Error('User was not found in the Firestore users collection.')
      return mapUser(snapshot)
    }
    return getResource(endpoints.users.detail(id))
  },
  create(payload) {
    return writeResource('post', endpoints.users.collection, payload)
  },
  update(id, payload) {
    return writeResource('put', endpoints.users.detail(id), payload)
  },
}
