import { Result } from 'antd'
import LinkButton from '@/components/common/LinkButton/LinkButton'

export default function NotFound() {
  return (
    <Result
      status="404"
      title="Page not found"
      extra={<LinkButton to="/">Back home</LinkButton>}
    />
  )
}
