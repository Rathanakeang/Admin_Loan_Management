import { Alert } from 'antd'
import Pagination from '@/components/common/Pagination/Pagination'
import EmptyState from '@/components/common/EmptyState/EmptyState'
import Loading from '@/components/common/Loading/Loading'
import PageToolbar from '@/components/common/PageToolbar/PageToolbar'
import PanelCard from '@/components/common/PanelCard/PanelCard'
import NotificationItem from '@/features/notifications/components/NotificationItem'
import { useNotifications } from '@/features/notifications/hooks/useNotifications'
import { getErrorMessage } from '@/services/api/apiClient'

export default function NotificationList() {
  const notifications = useNotifications()

  return (
    <div>
      <PageToolbar title="Notifications" description="Repayments and new loan requests." />
      <PanelCard>
        {notifications.isError && <Alert type="error" showIcon className="mb-4" message={getErrorMessage(notifications.error)} />}
        {notifications.isLoading && <Loading />}
        {!notifications.isLoading && notifications.items.length === 0 && !notifications.isError && (
          <EmptyState description="No notifications" />
        )}
        <div>
          {notifications.items.map((item) => (
            <NotificationItem
              key={item.id}
              item={item}
              onRead={(entry) => {
                if (!entry.read && entry.id) notifications.markRead(entry.id)
              }}
            />
          ))}
        </div>
        <Pagination
          total={notifications.total}
          page={notifications.page}
          pageSize={notifications.pageSize}
          onChange={notifications.onChange}
        />
      </PanelCard>
    </div>
  )
}
