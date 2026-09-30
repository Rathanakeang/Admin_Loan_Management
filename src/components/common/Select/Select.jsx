import { forwardRef } from 'react'
import { Select as AntSelect } from 'antd'

const Select = forwardRef(function Select(props, ref) {
  return <AntSelect ref={ref} allowClear {...props} />
})

export default Select
