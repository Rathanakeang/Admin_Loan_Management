import { getApp, getApps, initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getDatabase } from 'firebase/database'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  databaseURL: import.meta.env.VITE_FIREBASE_DATABASE_URL,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
}

const requiredConfig = ['apiKey', 'authDomain', 'projectId', 'appId']

export const isFirebaseConfigured = requiredConfig.every((key) => Boolean(firebaseConfig[key]))

export const firebaseApp = isFirebaseConfigured
  ? getApps().length > 0
    ? getApp()
    : initializeApp(firebaseConfig)
  : null

export const firebaseAuth = firebaseApp ? getAuth(firebaseApp) : null
export const firestore = firebaseApp ? getFirestore(firebaseApp) : null
export const realtimeDatabase = firebaseApp ? getDatabase(firebaseApp) : null

export function requireFirebaseAuth() {
  if (!firebaseAuth) {
    throw new Error('Firebase is not configured. Add the VITE_FIREBASE_* values to your .env file.')
  }
  return firebaseAuth
}

export function requireFirestore() {
  if (!firestore) {
    throw new Error('Firebase is not configured. Add the VITE_FIREBASE_* values to your .env file.')
  }
  return firestore
}

export function requireRealtimeDatabase() {
  if (!realtimeDatabase) {
    throw new Error('Firebase is not configured. Add the VITE_FIREBASE_* values to your .env file.')
  }
  return realtimeDatabase
}