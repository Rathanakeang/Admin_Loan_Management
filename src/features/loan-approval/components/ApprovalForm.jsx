import { Form } from 'antd'
import Button from '@/components/common/Button/Button'
import Input from '@/components/common/Input/Input'

function DecisionChoice({ value, onChange, id }) {
  const rejecting = value === 'REJECTED'
  return (
    <div id={id} className="flex flex-wrap gap-2">
      <Button
        htmlType="button"
        variant={rejecting ? 'secondary' : 'primary'}
        style={rejecting ? undefined : { background: '#16A34A', borderColor: '#16A34A' }}
        onClick={() => onChange?.('APPROVED')}
      >
        Approve
      </Button>
      <Button
        htmlType="button"
        variant={rejecting ? 'danger' : 'secondary'}
        onClick={() => onChange?.('REJECTED')}
      >
        Reject
      </Button>
    </div>
  )
}

export default function ApprovalForm({ onSubmit, submitting }) {
  const [form] = Form.useForm()
  const decision = Form.useWatch('decision', form)
  const rejecting = decision === 'REJECTED'

  return (
    <Form form={form} layout="vertical" onFinish={onSubmit} initialValues={{ decision: 'APPROVED' }} className="max-w-xl">
      <Form.Item label="Decision" name="decision" rules={[{ required: true, message: 'Choose a decision' }]}>
        <DecisionChoice />
      </Form.Item>
      <Form.Item label="Comment" name="comment" rules={[{ required: true, message: 'A comment is required' }]}>
        <Input.TextArea rows={4} />
      </Form.Item>
      <Button
        htmlType="submit"
        loading={submitting}
        danger={rejecting}
        style={rejecting ? undefined : { background: '#16A34A', borderColor: '#16A34A' }}
      >
        {rejecting ? 'Reject application' : 'Approve application'}
      </Button>
    </Form>
  )
}
