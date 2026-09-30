import { Form, InputNumber } from 'antd'
import Select from '@/components/common/Select/Select'
import FormSection from '@/components/common/FormSection/FormSection'

export default function LoanInformation({ products = [] }) {
  return (
    <FormSection step="02" title="Loan information">
      <Form.Item label="Loan product" name="productId">
        <Select
          placeholder="Select a product"
          options={products.map((product) => ({ value: product.id, label: product.name }))}
        />
      </Form.Item>
      <div className="grid grid-cols-1 gap-x-4 md:grid-cols-2">
        <Form.Item label="Amount" name="amount" rules={[{ required: true, message: 'Amount is required' }]}>
          <InputNumber min={0} className="w-full" />
        </Form.Item>
        <Form.Item label="Term (months)" name="termMonths" rules={[{ required: true, message: 'Duration is required' }]}>
          <InputNumber min={1} className="w-full" />
        </Form.Item>
      </div>
    </FormSection>
  )
}
