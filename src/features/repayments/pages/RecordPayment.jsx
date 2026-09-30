import { App } from 'antd'
import dayjs from 'dayjs'
import { useNavigate, useSearchParams } from 'react-router-dom'
import PageToolbar from '@/components/common/PageToolbar/PageToolbar'
import PanelCard from '@/components/common/PanelCard/PanelCard'
import PaymentForm from '@/features/repayments/components/PaymentForm'
import { useRecordPayment } from '@/features/repayments/hooks/useRepayments'
import { getErrorMessage } from '@/services/api/apiClient'
import { paymentSchema } from '@/utils/validation'

export default function RecordPayment() {
  const navigate = useNavigate()
  const [params] = useSearchParams()
  const { message } = App.useApp()
  const record = useRecordPayment()

  const onSubmit = async (values) => {
    const payload = {
      ...values,
      paidAt: values.paidAt ? dayjs(values.paidAt).toISOString() : null,
    }
    try {
      await paymentSchema.validate(payload, { abortEarly: false })
    } catch (error) {
      message.error(error.errors?.[0] || 'Check the form')
      return
    }
    try {
      const created = await record.mutateAsync(payload)
      message.success('Payment recorded')
      navigate(created?.id ? `/repayments/${created.id}` : '/repayments')
    } catch (error) {
      message.error(getErrorMessage(error))
    }
  }

  return (
    <div>
      <PageToolbar title="Record payment" description="Post a repayment against a loan." />
      <PanelCard>
        <PaymentForm initialLoanId={params.get('loanId') || undefined} onSubmit={onSubmit} submitting={record.isPending} />
      </PanelCard>
    </div>
  )
}
