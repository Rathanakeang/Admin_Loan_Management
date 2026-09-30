import { Spin } from 'antd'

export default function Loading({ tip = 'Loading' }) {
  return (
    <div className="grid min-h-60 place-items-center">
      <Spin size="large" description={tip} />
    </div>
  )
}
