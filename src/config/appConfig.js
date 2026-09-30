import { PERMISSIONS } from '@/utils/permissions'

export const appTheme = {
  token: {
    colorPrimary: '#1677ff',
    colorInfo: '#2563eb',
    colorSuccess: '#16a34a',
    colorWarning: '#d97706',
    colorError: '#dc2626',
    colorText: '#111827',
    colorTextSecondary: '#6b7280',
    colorBorder: '#e5e7eb',
    colorBorderSecondary: '#e5e7eb',
    colorBgLayout: '#f5f7fb',
    borderRadius: 8,
    controlHeight: 36,
    fontSize: 14,
    fontFamily: "Inter, 'Segoe UI', system-ui, -apple-system, BlinkMacSystemFont, sans-serif",
  },
  components: {
    Button: {
      primaryShadow: 'none',
      defaultShadow: 'none',
      dangerShadow: 'none',
      fontWeight: 500,
    },
    Table: {
      headerBg: '#f8fafc',
      headerColor: '#6b7280',
      headerSplitColor: '#e5e7eb',
      rowHoverBg: '#f5f7fb',
      borderColor: '#e5e7eb',
      cellPaddingBlock: 12,
    },
  },
}

export const navigation = [
  {
    key: 'dashboard',
    label: 'Home',
    path: '/',
    permission: PERMISSIONS.DASHBOARD_VIEW,
  },
  {
    key: 'customers',
    label: 'Customers',
    path: '/customers',
    permission: PERMISSIONS.CUSTOMER_VIEW,
  },
  {
    key: 'loan-products',
    label: 'Loan products',
    path: '/loan-products',
    permission: PERMISSIONS.PRODUCT_VIEW,
  },
  {
    key: 'applications',
    label: 'Requests',
    path: '/loan-applications',
    permission: PERMISSIONS.APPLICATION_VIEW,
  },
  {
    key: 'approvals',
    label: 'Approvals',
    path: '/approvals',
    permission: PERMISSIONS.APPROVAL_VIEW,
  },
  {
    key: 'disbursements',
    label: 'Disbursements',
    path: '/disbursements',
    permission: PERMISSIONS.DISBURSEMENT_VIEW,
  },
  {
    key: 'repayments',
    label: 'Repay',
    path: '/repayments',
    permission: PERMISSIONS.REPAYMENT_VIEW,
  },
  {
    key: 'reports',
    label: 'Reports',
    permission: PERMISSIONS.REPORT_VIEW,
    children: [
      { key: 'reports-home', label: 'Overview', path: '/reports' },
      { key: 'reports-loans', label: 'Loan applications', path: '/reports/loans' },
      { key: 'reports-approved', label: 'Approved loans', path: '/reports/approved' },
      { key: 'reports-rejected', label: 'Rejected loans', path: '/reports/rejected' },
      { key: 'reports-repayments', label: 'Repayments', path: '/reports/repayments' },
      { key: 'reports-customers', label: 'Customers', path: '/reports/customers' },
      { key: 'reports-portfolio', label: 'Portfolio', path: '/reports/portfolio' },
    ],
  },
  {
    key: 'messages',
    label: 'Messages',
    path: '/messages',
    permission: PERMISSIONS.MESSAGE_VIEW,
  },
  {
    key: 'notifications',
    label: 'Notifications',
    path: '/notifications',
    permission: PERMISSIONS.NOTIFICATION_VIEW,
  },
  {
    key: 'users',
    label: 'Staff users',
    path: '/users',
    permission: PERMISSIONS.USER_VIEW,
  },
]
