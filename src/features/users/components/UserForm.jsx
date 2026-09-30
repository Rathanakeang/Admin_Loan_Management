import { Form } from 'antd'
import LinkButton from '@/components/common/LinkButton/LinkButton'
import Button from '@/components/common/Button/Button'
import Input from '@/components/common/Input/Input'
import Select from '@/components/common/Select/Select'
import FormSection from '@/components/common/FormSection/FormSection'
import { ROLES } from '@/utils/constants'

const ROLE_LABELS = {
  SUPER_ADMIN: 'Super admin',
  ADMIN: 'Admin',
  LOAN_OFFICER: 'Loan officer',
  VIEWER: 'Viewer',
}

export default function UserForm({ onSubmit, submitting, includePassword = true }) {
  return (
    <Form layout="vertical" onFinish={onSubmit} className="max-w-xl">
      <FormSection title="Account">
        <Form.Item label="Name" name="name" rules={[{ required: true, message: 'Name is required' }]}>
          <Input />
        </Form.Item>
        <Form.Item label="Email" name="email" rules={[{ required: true, type: 'email', message: 'Enter a valid email' }]}>
          <Input type="email" />
        </Form.Item>
        <Form.Item label="Role" name="role" rules={[{ required: true, message: 'Role is required' }]}>
          <Select options={Object.values(ROLES).map((role) => ({ value: role, label: ROLE_LABELS[role] || role }))} />
        </Form.Item>
        {includePassword && (
          <Form.Item label="Temporary password" name="password" rules={[{ required: true, min: 8, message: 'Use at least 8 characters' }]}>
            <Input.Password />
          </Form.Item>
        )}
      </FormSection>
      <div className="flex flex-wrap items-center gap-2">
        <Button htmlType="submit" loading={submitting}>Create user</Button>
        <LinkButton to="/users" variant="secondary">Cancel</LinkButton>
      </div>
    </Form>
  )
}
