import { useNavigate } from 'react-router-dom'
import Button from '@/components/common/Button/Button'

export default function LinkButton({ to, children, ...props }) {
  const navigate = useNavigate()
  return (
    <Button {...props} onClick={() => navigate(to)}>
      {children}
    </Button>
  )
}
