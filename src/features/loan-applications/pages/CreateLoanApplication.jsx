import { App } from 'antd'
import { useNavigate } from 'react-router-dom'
import PageToolbar from '@/components/common/PageToolbar/PageToolbar'
import PanelCard from '@/components/common/PanelCard/PanelCard'
import LoanApplicationForm from '@/features/loan-applications/components/LoanApplicationForm'
import { useSaveLoanApplication } from '@/features/loan-applications/hooks/useLoanApplications'
import { loanApplicationService } from '@/features/loan-applications/services/loanApplicationService'
import { getErrorMessage } from '@/services/api/apiClient'
import { loanApplicationSchema } from '@/utils/validation'

export default function CreateLoanApplication() {
  const navigate = useNavigate()
  const { message } = App.useApp()
  const save = useSaveLoanApplication()

  const onSubmit = async (values, files) => {
    try {
      await loanApplicationSchema.validate(values, { abortEarly: false })
    } catch (error) {
      message.error(error.errors?.[0] || 'Check the form')
      return
    }
    try {
      const created = await save.mutateAsync(values)
      if (created?.id) {
        await Promise.all(
          files
            .map((file) => file.originFileObj)
            .filter(Boolean)
            .map((file) => loanApplicationService.uploadDocument(created.id, file)),
        )
      }
      message.success('Application submitted')
      navigate(created?.id ? `/loan-applications/${created.id}` : '/loan-applications')
    } catch (error) {
      message.error(getErrorMessage(error))
    }
  }

  return (
    <div>
      <PageToolbar title="New application" description="Customer, loan terms, then documents." />
      <PanelCard>
        <LoanApplicationForm onSubmit={onSubmit} submitting={save.isPending} />
      </PanelCard>
    </div>
  )
}
