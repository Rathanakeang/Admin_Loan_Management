import { ROLES } from '@/utils/constants'

export const PERMISSIONS = {
  DASHBOARD_VIEW: 'dashboard.view',
  CUSTOMER_VIEW: 'customer.view',
  CUSTOMER_MANAGE: 'customer.manage',
  PRODUCT_VIEW: 'product.view',
  PRODUCT_MANAGE: 'product.manage',
  APPLICATION_VIEW: 'application.view',
  APPLICATION_MANAGE: 'application.manage',
  APPROVAL_VIEW: 'approval.view',
  APPROVAL_DECIDE: 'approval.decide',
  DISBURSEMENT_VIEW: 'disbursement.view',
  DISBURSEMENT_MANAGE: 'disbursement.manage',
  REPAYMENT_VIEW: 'repayment.view',
  REPAYMENT_RECORD: 'repayment.record',
  REPORT_VIEW: 'report.view',
  MESSAGE_VIEW: 'message.view',
  MESSAGE_REPLY: 'message.reply',
  NOTIFICATION_VIEW: 'notification.view',
  USER_VIEW: 'user.view',
  USER_MANAGE: 'user.manage',
}

const ALL = Object.values(PERMISSIONS)

const OFFICER = [
  PERMISSIONS.DASHBOARD_VIEW,
  PERMISSIONS.CUSTOMER_VIEW,
  PERMISSIONS.CUSTOMER_MANAGE,
  PERMISSIONS.PRODUCT_VIEW,
  PERMISSIONS.APPLICATION_VIEW,
  PERMISSIONS.APPLICATION_MANAGE,
  PERMISSIONS.APPROVAL_VIEW,
  PERMISSIONS.DISBURSEMENT_VIEW,
  PERMISSIONS.DISBURSEMENT_MANAGE,
  PERMISSIONS.REPAYMENT_VIEW,
  PERMISSIONS.REPAYMENT_RECORD,
  PERMISSIONS.REPORT_VIEW,
  PERMISSIONS.MESSAGE_VIEW,
  PERMISSIONS.MESSAGE_REPLY,
  PERMISSIONS.NOTIFICATION_VIEW,
]

const VIEWER = [
  PERMISSIONS.DASHBOARD_VIEW,
  PERMISSIONS.CUSTOMER_VIEW,
  PERMISSIONS.PRODUCT_VIEW,
  PERMISSIONS.APPLICATION_VIEW,
  PERMISSIONS.APPROVAL_VIEW,
  PERMISSIONS.DISBURSEMENT_VIEW,
  PERMISSIONS.REPAYMENT_VIEW,
  PERMISSIONS.REPORT_VIEW,
  PERMISSIONS.NOTIFICATION_VIEW,
]

export const ROLE_PERMISSIONS = {
  [ROLES.SUPER_ADMIN]: ALL,
  [ROLES.ADMIN]: ALL,
  [ROLES.LOAN_OFFICER]: OFFICER,
  [ROLES.VIEWER]: VIEWER,
}

export function resolvePermissions(user) {
  if (!user) return []
  if (Array.isArray(user.permissions) && user.permissions.length > 0) return user.permissions
  const role = typeof user.role === 'string'
    ? user.role.trim().toUpperCase().replace(/[\s-]+/g, '_')
    : ''
  return ROLE_PERMISSIONS[role] || []
}
