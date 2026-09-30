export const endpoints = {
  auth: {
    login: '/auth/login',
    logout: '/auth/logout',
    me: '/auth/me',
    forgotPassword: '/auth/forgot-password',
    resetPassword: '/auth/reset-password',
  },
  dashboard: {
    summary: '/dashboard/summary',
    registrationChart: '/dashboard/registrations/chart',
    loanChart: '/dashboard/loans/chart',
    paymentChart: '/dashboard/payments/chart',
    recentLoans: '/dashboard/loans/recent',
  },
  customers: {
    collection: '/customers',
    detail: (id) => `/customers/${id}`,
  },
  loanProducts: {
    collection: '/loan-products',
    detail: (id) => `/loan-products/${id}`,
  },
  loanApplications: {
    collection: '/loan-applications',
    detail: (id) => `/loan-applications/${id}`,
    documents: (id) => `/loan-applications/${id}/documents`,
  },
  approvals: {
    queue: '/approvals',
    detail: (id) => `/approvals/${id}`,
    decision: (id) => `/approvals/${id}/decision`,
    history: (id) => `/approvals/${id}/history`,
  },
  disbursements: {
    collection: '/disbursements',
    detail: (id) => `/disbursements/${id}`,
  },
  repayments: {
    collection: '/repayments',
    detail: (id) => `/repayments/${id}`,
    history: (loanId) => `/repayments/loans/${loanId}/history`,
  },
  reports: {
    overview: '/reports/overview',
    loans: '/reports/loan-applications',
    approved: '/reports/loans/approved',
    rejected: '/reports/loans/rejected',
    repayments: '/reports/repayments',
    customers: '/reports/customers',
    portfolio: '/reports/portfolio',
  },
  notifications: {
    collection: '/notifications',
    unreadCount: '/notifications/unread-count',
    read: (id) => `/notifications/${id}/read`,
  },
  messages: {
    conversations: '/messages/conversations',
    thread: (userId) => `/messages/conversations/${userId}`,
    send: (userId) => `/messages/conversations/${userId}`,
    remove: (userId, messageId) => `/messages/conversations/${userId}/${messageId}`,
  },
  users: {
    collection: '/users',
    detail: (id) => `/users/${id}`,
  },
}
