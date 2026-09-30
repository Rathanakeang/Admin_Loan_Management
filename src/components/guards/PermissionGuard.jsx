import { Result } from 'antd'
import { useAuth } from '@/features/auth/hooks/useAuth'

export default function PermissionGuard({ permission, children }) {
  const { hasPermission, isReady } = useAuth()

  if (!isReady) return null
  if (permission && !hasPermission(permission)) {
    return (
      <Result
        status="403"
        title="You do not have access"
        subTitle="Ask a super admin to grant this permission."
      />
    )
  }
  return children
}
