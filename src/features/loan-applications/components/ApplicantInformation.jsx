import { Form } from 'antd'
import Input from '@/components/common/Input/Input'
import Select from '@/components/common/Select/Select'
import FormSection from '@/components/common/FormSection/FormSection'

export default function ApplicantInformation({ customers = [] }) {
  return (
    <FormSection step="01" title="Customer">
      <Form.Item label="Customer" name="customerId" rules={[{ required: true, message: 'Select a customer' }]}>
        <Select
          showSearch
          optionFilterProp="label"
          placeholder="Select a customer"
          options={customers.map((customer) => ({
            value: customer.id,
            label: `${customer.name} · ${customer.email || customer.userId || ''}`,
          }))}
        />
      </Form.Item>
      <Form.Item label="Purpose" name="purpose">
        <Input.TextArea rows={3} placeholder="What the loan will be used for" />
      </Form.Item>
    </FormSection>
  )
}
