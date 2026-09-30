import { forwardRef } from 'react'
import { Input as AntInput } from 'antd'

const Input = forwardRef(function Input(props, ref) {
  return <AntInput ref={ref} allowClear {...props} />
})

Input.Password = AntInput.Password
Input.TextArea = AntInput.TextArea
Input.Search = AntInput.Search

export default Input
