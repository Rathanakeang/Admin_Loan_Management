import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import {
  HomeOutlined,
  TeamOutlined,
  AppstoreOutlined,
  FileTextOutlined,
  CheckCircleOutlined,
  DollarOutlined,
  WalletOutlined,
  BarChartOutlined,
  MessageOutlined,
  BellOutlined,
  IdcardOutlined,
} from '@ant-design/icons'
import { navigation } from '@/config/appConfig'
import { useAuth } from '@/features/auth/hooks/useAuth'
import BrandMark from '@/components/common/BrandMark/BrandMark'

const ICONS = {
  dashboard: HomeOutlined,
  customers: TeamOutlined,
  'loan-products': AppstoreOutlined,
  applications: FileTextOutlined,
  approvals: CheckCircleOutlined,
  disbursements: DollarOutlined,
  repayments: WalletOutlined,
  reports: BarChartOutlined,
  messages: MessageOutlined,
  notifications: BellOutlined,
  users: IdcardOutlined,
}

function visibleItems(items, hasPermission) {
  return items
    .filter((item) => !item.permission || hasPermission(item.permission))
    .map((item) => {
      if (!item.children) return item
      const children = item.children.filter((child) => !child.permission || hasPermission(child.permission))
      return children.length ? { ...item, children } : null
    })
    .filter(Boolean)
}

function itemPath(item) {
  return item.path || item.children?.[0]?.path || ''
}

function useDesktopNav() {
  const query = '(min-width: 1024px)'
  const [desktop, setDesktop] = useState(() => window.matchMedia(query).matches)

  useEffect(() => {
    const media = window.matchMedia(query)
    const onChange = () => setDesktop(media.matches)
    media.addEventListener('change', onChange)
    return () => media.removeEventListener('change', onChange)
  }, [])

  return desktop
}

function isActive(item, pathname) {
  const path = itemPath(item)
  if (!path) return false
  if (path === '/') return pathname === '/'
  return pathname === path || pathname.startsWith(`${path}/`)
}

export default function Sidebar({ open, onClose }) {
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const { hasPermission } = useAuth()
  const items = visibleItems(navigation, hasPermission)
  const desktop = useDesktopNav()
  const shown = desktop || open

  useEffect(() => {
    onClose()
  }, [pathname, onClose])

  return (
    <>
      {open ? (
        <button
          type="button"
          aria-label="Close menu"
          className="fixed inset-0 z-30 bg-slate-900/40 lg:hidden"
          onClick={onClose}
        />
      ) : null}
      <aside
        inert={shown ? undefined : true}
        aria-hidden={shown ? undefined : true}
        className={`fixed inset-y-0 left-0 z-40 flex w-[248px] flex-col border-r border-line bg-white transition-transform duration-200 lg:static lg:translate-x-0 ${open ? 'translate-x-0' : '-translate-x-full'}`}
      >
        <div className="flex items-center gap-3 px-4 py-5">
          <BrandMark />
          <div className="min-w-0">
            <strong className="block truncate text-sm leading-tight text-ink">QuickLend</strong>
            <span className="text-xs text-muted">Browser only</span>
          </div>
        </div>
        <nav className="flex-1 overflow-y-auto px-3 pb-4" aria-label="Main">
          <ul className="m-0 flex list-none flex-col gap-1 p-0">
            {items.map((item) => {
              const Icon = ICONS[item.key] || FileTextOutlined
              const active = isActive(item, pathname)
              const path = itemPath(item)
              return (
                <li key={item.key}>
                  <button
                    type="button"
                    onClick={() => path && navigate(path)}
                    aria-current={active ? 'page' : undefined}
                    className={`flex h-10 w-full items-center gap-3 rounded-lg px-3 text-left text-sm font-medium transition-colors ${active ? 'bg-blue-50 text-brand' : 'text-ink hover:bg-canvas'}`}
                  >
                    <Icon className="text-base" />
                    <span className="truncate">{item.label}</span>
                  </button>
                </li>
              )
            })}
          </ul>
        </nav>
      </aside>
    </>
  )
}
