import { App } from 'antd'
import dayjs from 'dayjs'
import { useNavigate } from 'react-router-dom'
import PageToolbar from '@/components/common/PageToolbar/PageToolbar'
import PanelCard from '@/components/common/PanelCard/PanelCard'
import DisbursementForm from '@/features/disbursements/components/DisbursementForm'
import { useRecordDisbursement } from '@/features/disbursements/hooks/useDisbursements'
import { getErrorMessage } from '@/services/api/apiClient'
import { disbursementSchema } from '@/utils/validation'

export default function RecordDisbursement() {
  const navigate = useNavigate()
  const { message } = App.useApp()
  const record = useRecordDisbursement()

  const onSubmit = async (values) => {
    const payload = {
      ...values,
      disbursedAt: values.disbursedAt ? dayjs(values.disbursedAt).toISOString() : null,
    }
    try {
      await disbursementSchema.validate(payload, { abortEarly: false })
    } catch (error) {
      message.error(error.errors?.[0] || 'Check the form')
      return
    }
    try {
      const created = await record.mutateAsync(payload)
      message.success('Disbursement recorded')
      navigate(created?.id ? `/disbursements/${created.id}` : '/disbursements')
    } catch (error) {
      message.error(getErrorMessage(error))
    }
  }

  return (
    <div>
      <PageToolbar title="Record disbursement" description="Release funds for an approved application." />
      <PanelCard>
        <DisbursementForm onSubmit={onSubmit} submitting={record.isPending} />
      </PanelCard>
    </div>
  )
}
