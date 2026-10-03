import { collection, doc, getDoc, getDocs, limit, query, where } from 'firebase/firestore'
import { sendPasswordResetEmail, signInWithEmailAndPassword, signOut } from 'firebase/auth'
import { apiClient, getResource, unwrapAuth } from '@/services/api/apiClient'
import { endpoints } from '@/services/api/apiEndpoints'
import { storage } from '@/services/storage/localStorage'
import { firebaseAuth, isFirebaseConfigured, requireFirestore } from '@/services/firebase/firebase'

async function getFirebaseProfile(authUser) {
  const email = authUser.email?.trim().toLowerCase()
  if (!email) throw new Error('The Firebase account does not have an email address.')

  const database = requireFirestore()
  let profileSnapshot = await getDoc(doc(database, 'users', email))
  if (!profileSnapshot.exists()) {
    const matches = await getDocs(query(collection(database, 'users'), where('email', '==', email), limit(1)))
    profileSnapshot = matches.docs[0]
  }
  if (!profileSnapshot?.exists()) {
    throw new Error('No profile was found in the Firestore users collection for this account.')
  }

  const profile = { ...profileSnapshot.data() }
  delete profile.password
  return { ...profile, id: profileSnapshot.id, uid: authUser.uid, email: profile.email || email }
}

export const authService = {
  async login(credentials) {
    if (isFirebaseConfigured) {
      let credential
      try {
        credential = await signInWithEmailAndPassword(
          firebaseAuth,
          credentials.email.trim(),
          credentials.password,
        )
      } catch (error) {
        if (['auth/invalid-credential', 'auth/invalid-login-credentials', 'auth/user-not-found', 'auth/wrong-password'].includes(error.code)) {
          throw new Error(
            'This email and password do not match a Firebase Authentication account. Firestore password fields are not used for sign-in.',
            { cause: error },
          )
        }
        throw error
      }
      try {
        const profile = await getFirebaseProfile(credential.user)
        storage.setSession(await credential.user.getIdToken(), profile)
        return profile
      } catch (error) {
        await signOut(firebaseAuth)
        throw error
      }
    }

    const response = await apiClient.post(endpoints.auth.login, credentials)
    const { token, user } = unwrapAuth(response.data)
    if (!token) {
      throw new Error('Login response did not include an access token')
    }
    storage.setToken(token)
    const profile = user || (await this.me())
    storage.setUser(profile)
    return profile
  },

  async me() {
    if (isFirebaseConfigured) {
      await firebaseAuth.authStateReady()
      const authUser = firebaseAuth.currentUser
      if (!authUser) throw new Error('Your Firebase session has expired. Please sign in again.')
      storage.setToken(await authUser.getIdToken())
      return getFirebaseProfile(authUser)
    }

    const profile = await getResource(endpoints.auth.me)
    return profile?.user || profile
  },

  async logout() {
    if (isFirebaseConfigured) {
      try {
        await signOut(firebaseAuth)
      } catch {
        // Clear the local session even if Firebase sign-out fails.
      }
      return
    }

    try {
      await apiClient.post(endpoints.auth.logout)
    } catch {
      // Clear the local session even if the server session is already gone.
    }
  },

  forgotPassword(email) {
    if (isFirebaseConfigured) return sendPasswordResetEmail(firebaseAuth, email.trim())
    return apiClient.post(endpoints.auth.forgotPassword, { email }).then((response) => response.data)
  },

  resetPassword(payload) {
    return apiClient.post(endpoints.auth.resetPassword, payload).then((response) => response.data)
  },
}
