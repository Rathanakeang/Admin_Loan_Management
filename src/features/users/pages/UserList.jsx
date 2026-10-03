import { Alert } from 'antd'
import LinkButton from '@/components/common/LinkButton/LinkButton'
import Pagination from '@/components/common/Pagination/Pagination'
import PageToolbar from '@/components/common/PageToolbar/PageToolbar'
import PanelCard from '@/components/common/PanelCard/PanelCard'
import UserTable from '@/features/users/components/UserTable'
import { useUsers } from '@/features/users/hooks/useUsers'
import { useAuth } from '@/features/auth/hooks/useAuth'
import { getErrorMessage } from '@/services/api/apiClient'
import { isFirebaseConfigured } from '@/services/firebase/firebase'
import { PERMISSIONS } from '@/utils/permissions'

export default function UserList() {
  const users = useUsers()
  const { hasPermission } = useAuth()
  return (
    <div>
      <PageToolbar
        title={isFirebaseConfigured ? 'Users' : 'Staff users'}
        description={isFirebaseConfigured ? 'Accounts from the Firestore users collection.' : 'Administrator accounts. These are not customers.'}
        actions={!isFirebaseConfigured && hasPermission(PERMISSIONS.USER_MANAGE) ? (
          <LinkButton to="/users/new">New user</LinkButton>
        ) : null}
      />
      <PanelCard>
        {users.isError && <Alert type="error" showIcon className="mb-4" message={getErrorMessage(users.error)} />}
        <UserTable items={users.items} loading={users.isLoading} />
        <Pagination total={users.total} page={users.page} pageSize={users.pageSize} onChange={users.onChange} />
      </PanelCard>
    </div>
  )
}
