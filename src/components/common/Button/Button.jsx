import { Button as AntButton } from 'antd'

const PRESETS = {
  primary: { type: 'primary' },
  secondary: { type: 'default' },
  danger: { type: 'primary', danger: true },
  ghost: { type: 'text' },
}

export default function Button({ children, variant = 'primary', ...props }) {
  const preset = PRESETS[variant] || PRESETS.primary
  return (
    <AntButton {...preset} {...props}>
      {children}
    </AntButton>
  )
}
