import { DatePicker, Form } from 'antd'
import LinkButton from '@/components/common/LinkButton/LinkButton'
import dayjs from 'dayjs'
import Button from '@/components/common/Button/Button'
import Input from '@/components/common/Input/Input'
import FormSection from '@/components/common/FormSection/FormSection'

function toDay(value) {
  if (!value) return null
  const date = dayjs(value)
  return date.isValid() ? date : null
}

export default function CustomerForm({ initialValues, onSubmit, submitting, cancelTo = '/customers' }) {
  const values = {
    ...initialValues,
    dateOfBirth: toDay(initialValues?.dateOfBirth),
    hireDate: toDay(initialValues?.hireDate),
  }

  return (
    <Form layout="vertical" initialValues={values} onFinish={onSubmit} key={initialValues?.id || 'new'} className="max-w-3xl">
      <FormSection title="Contact" description="How the customer is identified.">
        <div className="grid grid-cols-1 gap-x-4 md:grid-cols-2">
          <Form.Item label="Name" name="name" rules={[{ required: true, message: 'Name is required' }]}>
            <Input />
          </Form.Item>
          <Form.Item label="Email" name="email" rules={[{ required: true, type: 'email', message: 'Enter a valid email' }]}>
            <Input type="email" />
          </Form.Item>
          <Form.Item label="Phone" name="phone">
            <Input />
          </Form.Item>
        </div>
      </FormSection>
      <FormSection title="Profile">
        <Form.Item label="Address" name="address">
          <Input.TextArea rows={3} />
        </Form.Item>
        <div className="grid grid-cols-1 gap-x-4 md:grid-cols-2">
          <Form.Item label="Date of birth" name="dateOfBirth">
            <DatePicker className="w-full" />
          </Form.Item>
          <Form.Item label="Hire date" name="hireDate">
            <DatePicker className="w-full" />
          </Form.Item>
        </div>
      </FormSection>
      <div className="flex flex-wrap items-center gap-2">
        <Button htmlType="submit" loading={submitting}>Save customer</Button>
        <LinkButton to={cancelTo} variant="secondary">Cancel</LinkButton>
      </div>
    </Form>
  )
}
