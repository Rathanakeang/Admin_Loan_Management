export const environment = {
  apiBaseUrl: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api',
  appName: import.meta.env.VITE_APP_NAME || 'Loan Management System',
  useLocalData: import.meta.env.VITE_USE_API !== 'true',
}
