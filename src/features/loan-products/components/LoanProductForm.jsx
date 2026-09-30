import { Form, InputNumber } from 'antd'
import LinkButton from '@/components/common/LinkButton/LinkButton'
import Button from '@/components/common/Button/Button'
import Input from '@/components/common/Input/Input'
import FormSection from '@/components/common/FormSection/FormSection'

export default function LoanProductForm({ initialValues, onSubmit, submitting, cancelTo = '/loan-products' }) {
  return (
    <Form layout="vertical" initialValues={initialValues} onFinish={onSubmit} key={initialValues?.id || 'new'} className="max-w-3xl">
      <FormSection title="Basic information">
        <Form.Item label="Name" name="name" rules={[{ required: true, message: 'Name is required' }]}>
          <Input />
        </Form.Item>
      </FormSection>
      <FormSection title="Interest and pricing">
        <Form.Item label="Interest rate (%)" name="interestRate" rules={[{ required: true, message: 'Interest rate is required' }]}>
          <InputNumber min={0} className="w-full" />
        </Form.Item>
      </FormSection>
      <FormSection title="Loan limits">
        <div className="grid grid-cols-1 gap-x-4 md:grid-cols-2">
          <Form.Item label="Minimum amount" name="minAmount" rules={[{ required: true, message: 'Minimum amount is required' }]}>
            <InputNumber min={0} className="w-full" />
          </Form.Item>
          <Form.Item label="Maximum amount" name="maxAmount" rules={[{ required: true, message: 'Maximum amount is required' }]}>
            <InputNumber min={0} className="w-full" />
          </Form.Item>
        </div>
      </FormSection>
      <FormSection title="Term">
        <div className="grid grid-cols-1 gap-x-4 md:grid-cols-2">
          <Form.Item label="Minimum term (months)" name="minTermMonths" rules={[{ required: true, message: 'Minimum term is required' }]}>
            <InputNumber min={1} className="w-full" />
          </Form.Item>
          <Form.Item label="Maximum term (months)" name="maxTermMonths" rules={[{ required: true, message: 'Maximum term is required' }]}>
            <InputNumber min={1} className="w-full" />
          </Form.Item>
        </div>
      </FormSection>
      <div className="flex flex-wrap items-center gap-2">
        <Button htmlType="submit" loading={submitting}>Save product</Button>
        <LinkButton to={cancelTo} variant="secondary">Cancel</LinkButton>
      </div>
    </Form>
  )
}
