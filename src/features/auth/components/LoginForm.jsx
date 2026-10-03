import { App, Form } from 'antd'
import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import Button from '@/components/common/Button/Button'
import Input from '@/components/common/Input/Input'
import AuthShell from '@/features/auth/components/AuthShell'
import { useAuth } from '@/features/auth/hooks/useAuth'
import { getErrorMessage } from '@/services/api/apiClient'
import { applyYupErrors, loginSchema } from '@/utils/validation'
import { environment } from '@/config/environment'
import { isFirebaseConfigured } from '@/services/firebase/firebase'

export default function LoginForm() {
  const [form] = Form.useForm()
  const { message } = App.useApp()
  const { login } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const [submitting, setSubmitting] = useState(false)

  const onFinish = async (values) => {
    try {
      await loginSchema.validate(values, { abortEarly: false })
    } catch (error) {
      applyYupErrors(form, error)
      return
    }

    setSubmitting(true)
    try {
      await login(values)
      navigate(location.state?.from || '/', { replace: true })
    } catch (error) {
      message.error(getErrorMessage(error))
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <AuthShell
      title={environment.appName}
      subtitle={isFirebaseConfigured ? 'Sign in with your Firebase Authentication account' : 'Browser-only administration console'}
      note={isFirebaseConfigured ? 'Your profile is loaded from the Firestore users collection.' : 'This copy keeps records in the browser.'}
      footer={<Link to="/forgot-password" className="font-medium text-brand hover:underline">Forgot password</Link>}
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        requiredMark={false}
        initialValues={isFirebaseConfigured ? undefined : { email: 'admin@loan.local', password: 'Admin@123' }}
      >
        <Form.Item label="Email" name="email" rules={[{ required: true, message: 'Email is required' }]}>
          <Input type="email" autoComplete="username" placeholder="admin@loan.local" />
        </Form.Item>
        <Form.Item label="Password" name="password" rules={[{ required: true, message: 'Password is required' }]}>
          <Input.Password autoComplete="current-password" placeholder="Password" />
        </Form.Item>
        <Button htmlType="submit" block loading={submitting}>
          Sign in
        </Button>
      </Form>
      {!isFirebaseConfigured && <p className="mt-3 mb-0 text-xs text-subtle">Demo: admin@loan.local · Admin@123</p>}
    </AuthShell>
  )
}
