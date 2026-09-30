import { Badge, Dropdown } from 'antd'
import { BellOutlined, LogoutOutlined, MessageOutlined, BarChartOutlined, MenuOutlined } from '@ant-design/icons'
import { useQuery } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '@/features/auth/hooks/useAuth'
import { notificationService } from '@/features/notifications/services/notificationService'
import { useModal } from '@/hooks/useModal'
import Modal from '@/components/common/Modal/Modal'

function IconButton({ label, onClick, children }) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      className="inline-flex h-9 w-9 items-center justify-center rounded-lg text-ink transition-colors hover:bg-canvas focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
    >
      {children}
    </button>
  )
}

export default function Header({ onMenu }) {
  const navigate = useNavigate()
  const { user, logout } = useAuth()
  const confirm = useModal()
  const unread = useQuery({
    queryKey: ['notifications', 'unread-count'],
    queryFn: notificationService.unreadCount,
  })
  const name = user?.name || user?.email || 'Admin'

  const onLogout = async () => {
    await logout()
    confirm.hide()
    navigate('/login', { replace: true })
  }

  return (
    <header className="sticky top-0 z-20 flex h-16 items-center justify-between gap-3 border-b border-line bg-white px-4 md:px-6">
      <button
        type="button"
        className="inline-flex h-9 w-9 items-center justify-center rounded-lg text-ink hover:bg-canvas lg:hidden"
        aria-label="Open menu"
        onClick={onMenu}
      >
        <MenuOutlined />
      </button>
      <div className="hidden text-sm text-muted lg:block">Administration</div>
      <div className="ml-auto flex items-center gap-1">
        <IconButton label="Messages" onClick={() => navigate('/messages')}>
          <MessageOutlined />
        </IconButton>
        <Badge count={unread.data?.count || 0} size="small" offset={[-2, 4]}>
          <IconButton label="Notifications" onClick={() => navigate('/notifications')}>
            <BellOutlined />
          </IconButton>
        </Badge>
        <IconButton label="Reports" onClick={() => navigate('/reports')}>
          <BarChartOutlined />
        </IconButton>
        <Dropdown
          menu={{
            items: [
              { key: 'name', label: name, disabled: true },
              { key: 'logout', icon: <LogoutOutlined />, label: 'Log out', onClick: () => confirm.show() },
            ],
          }}
        >
          <button
            type="button"
            className="ml-1 inline-flex h-9 items-center gap-2 rounded-lg px-2 text-sm font-medium text-ink hover:bg-canvas focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
          >
            <span className="grid h-7 w-7 place-items-center rounded-full bg-blue-50 text-xs font-semibold text-brand">
              {name.slice(0, 1).toUpperCase()}
            </span>
            <span className="hidden max-w-32 truncate sm:inline">{user?.name || 'Admin'}</span>
          </button>
        </Dropdown>
      </div>
      <Modal
        open={confirm.open}
        title="Log out"
        okText="Log out"
        okButtonProps={{ danger: true }}
        onOk={onLogout}
        onCancel={confirm.hide}
      >
        Are you sure you want to log out from admin?
      </Modal>
    </header>
  )
}
