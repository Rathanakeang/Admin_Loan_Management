import { App, Form } from 'antd'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import Button from '@/components/common/Button/Button'
import Input from '@/components/common/Input/Input'
import AuthShell from '@/features/auth/components/AuthShell'
import { authService } from '@/features/auth/services/authService'
import { getErrorMessage } from '@/services/api/apiClient'
import { applyYupErrors, forgotPasswordSchema } from '@/utils/validation'

export default function ForgotPassword() {
  const [form] = Form.useForm()
  const { message } = App.useApp()
  const [submitting, setSubmitting] = useState(false)

  const onFinish = async (values) => {
    try {
      await forgotPasswordSchema.validate(values, { abortEarly: false })
    } catch (error) {
      applyYupErrors(form, error)
      return
    }
    setSubmitting(true)
    try {
      await authService.forgotPassword(values.email)
      message.success('If that account exists, a reset link has been sent.')
      form.resetFields()
    } catch (error) {
      message.error(getErrorMessage(error))
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <AuthShell
      title="Forgot password"
      subtitle="Enter the email on your admin account."
      footer={<Link to="/login" className="font-medium text-brand hover:underline">Back to sign in</Link>}
    >
      <Form form={form} layout="vertical" onFinish={onFinish}>
        <Form.Item label="Email" name="email" rules={[{ required: true, message: 'Email is required' }]}>
          <Input type="email" />
        </Form.Item>
        <Button htmlType="submit" block loading={submitting}>
          Send reset link
        </Button>
      </Form>
    </AuthShell>
  )
}
