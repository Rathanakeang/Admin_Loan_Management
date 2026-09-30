import { Navigate } from 'react-router-dom'
import LoginForm from '@/features/auth/components/LoginForm'
import { useAuth } from '@/features/auth/hooks/useAuth'
import Loading from '@/components/common/Loading/Loading'

export default function Login() {
  const { isAuthenticated, isReady } = useAuth()
  if (!isReady) {
    return (
      <div className="grid min-h-screen place-items-center bg-canvas">
        <Loading tip="Checking session" />
      </div>
    )
  }
  if (isAuthenticated) return <Navigate to="/" replace />
  return <LoginForm />
}
