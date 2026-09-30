import { DatePicker, Form, InputNumber } from 'antd'
import LinkButton from '@/components/common/LinkButton/LinkButton'
import Button from '@/components/common/Button/Button'
import Input from '@/components/common/Input/Input'
import Select from '@/components/common/Select/Select'
import FormSection from '@/components/common/FormSection/FormSection'

export default function DisbursementForm({ onSubmit, submitting }) {
  return (
    <Form layout="vertical" onFinish={onSubmit} className="max-w-xl">
      <FormSection title="Disbursement">
        <Form.Item label="Application ID" name="applicationId" rules={[{ required: true, message: 'Application ID is required' }]}>
          <Input />
        </Form.Item>
        <Form.Item label="Amount" name="amount" rules={[{ required: true, message: 'Amount is required' }]}>
          <InputNumber min={0} className="w-full" />
        </Form.Item>
        <Form.Item label="Method" name="method" rules={[{ required: true, message: 'Method is required' }]}>
          <Select options={[
            { value: 'BANK_TRANSFER', label: 'Bank transfer' },
            { value: 'CASH', label: 'Cash' },
            { value: 'WALLET', label: 'Wallet' },
          ]}
          />
        </Form.Item>
        <Form.Item label="Reference" name="reference">
          <Input />
        </Form.Item>
        <Form.Item label="Date" name="disbursedAt" rules={[{ required: true, message: 'Date is required' }]}>
          <DatePicker showTime className="w-full" />
        </Form.Item>
      </FormSection>
      <div className="flex flex-wrap items-center gap-2">
        <Button htmlType="submit" loading={submitting}>Record disbursement</Button>
        <LinkButton to="/disbursements" variant="secondary">Cancel</LinkButton>
      </div>
    </Form>
  )
}
