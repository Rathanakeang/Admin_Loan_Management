import { App, Form } from 'antd'
import { useState } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import Button from '@/components/common/Button/Button'
import Input from '@/components/common/Input/Input'
import AuthShell from '@/features/auth/components/AuthShell'
import { authService } from '@/features/auth/services/authService'
import { getErrorMessage } from '@/services/api/apiClient'
import { applyYupErrors, resetPasswordSchema } from '@/utils/validation'

export default function ResetPassword() {
  const [form] = Form.useForm()
  const { message } = App.useApp()
  const navigate = useNavigate()
  const [params] = useSearchParams()
  const [submitting, setSubmitting] = useState(false)

  const onFinish = async (values) => {
    const payload = { ...values, token: values.token || params.get('token') }
    try {
      await resetPasswordSchema.validate(payload, { abortEarly: false })
    } catch (error) {
      applyYupErrors(form, error)
      return
    }
    setSubmitting(true)
    try {
      await authService.resetPassword(payload)
      message.success('Password updated. Sign in with the new password.')
      navigate('/login', { replace: true })
    } catch (error) {
      message.error(getErrorMessage(error))
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <AuthShell
      title="Reset password"
      subtitle="Choose a new password for the admin account."
      footer={<Link to="/login" className="font-medium text-brand hover:underline">Back to sign in</Link>}
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        initialValues={{ token: params.get('token') || '' }}
      >
        <Form.Item label="Reset token" name="token" rules={[{ required: true, message: 'Reset token is required' }]}>
          <Input />
        </Form.Item>
        <Form.Item label="New password" name="password" rules={[{ required: true, message: 'Password is required' }]}>
          <Input.Password />
        </Form.Item>
        <Form.Item label="Confirm password" name="confirmPassword" rules={[{ required: true, message: 'Confirm the password' }]}>
          <Input.Password />
        </Form.Item>
        <Button htmlType="submit" block loading={submitting}>
          Update password
        </Button>
      </Form>
    </AuthShell>
  )
}
