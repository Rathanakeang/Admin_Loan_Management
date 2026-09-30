import { DatePicker, Form, InputNumber } from 'antd'
import LinkButton from '@/components/common/LinkButton/LinkButton'
import Button from '@/components/common/Button/Button'
import Input from '@/components/common/Input/Input'
import Select from '@/components/common/Select/Select'
import FormSection from '@/components/common/FormSection/FormSection'

export default function PaymentForm({ initialLoanId, onSubmit, submitting }) {
  return (
    <Form layout="vertical" onFinish={onSubmit} initialValues={{ loanId: initialLoanId }} className="max-w-xl">
      <FormSection title="Payment">
        <Form.Item label="Loan / application ID" name="loanId" rules={[{ required: true, message: 'Loan ID is required' }]}>
          <Input />
        </Form.Item>
        <Form.Item label="Amount" name="amount" rules={[{ required: true, message: 'Amount is required' }]}>
          <InputNumber min={0} className="w-full" />
        </Form.Item>
        <Form.Item label="Payment date" name="paidAt" rules={[{ required: true, message: 'Payment date is required' }]}>
          <DatePicker showTime className="w-full" />
        </Form.Item>
        <Form.Item label="Payment method" name="method" rules={[{ required: true, message: 'Payment method is required' }]}>
          <Select options={[
            { value: 'CASH', label: 'Cash' },
            { value: 'BANK_TRANSFER', label: 'Bank transfer' },
            { value: 'WALLET', label: 'Wallet' },
          ]}
          />
        </Form.Item>
        <Form.Item label="Note" name="note">
          <Input.TextArea rows={3} />
        </Form.Item>
      </FormSection>
      <div className="flex flex-wrap items-center gap-2">
        <Button htmlType="submit" loading={submitting}>Record payment</Button>
        <LinkButton to="/repayments" variant="secondary">Cancel</LinkButton>
      </div>
    </Form>
  )
}
