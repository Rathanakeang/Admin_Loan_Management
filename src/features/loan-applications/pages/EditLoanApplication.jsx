import { Alert, App } from 'antd'
import { useNavigate, useParams } from 'react-router-dom'
import Loading from '@/components/common/Loading/Loading'
import PageToolbar from '@/components/common/PageToolbar/PageToolbar'
import PanelCard from '@/components/common/PanelCard/PanelCard'
import LoanApplicationForm from '@/features/loan-applications/components/LoanApplicationForm'
import { useLoanApplication, useSaveLoanApplication } from '@/features/loan-applications/hooks/useLoanApplications'
import { loanApplicationService } from '@/features/loan-applications/services/loanApplicationService'
import { getErrorMessage } from '@/services/api/apiClient'
import { loanApplicationSchema } from '@/utils/validation'

export default function EditLoanApplication() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { message } = App.useApp()
  const application = useLoanApplication(id)
  const save = useSaveLoanApplication(id)

  const onSubmit = async (values, files) => {
    try {
      await loanApplicationSchema.validate(values, { abortEarly: false })
    } catch (error) {
      message.error(error.errors?.[0] || 'Check the form')
      return
    }
    try {
      await save.mutateAsync(values)
      await Promise.all(
        files
          .map((file) => file.originFileObj)
          .filter(Boolean)
          .map((file) => loanApplicationService.uploadDocument(id, file)),
      )
      message.success('Application updated')
      navigate(`/loan-applications/${id}`)
    } catch (error) {
      message.error(getErrorMessage(error))
    }
  }

  if (application.isLoading) return <Loading />
  if (application.isError) return <Alert type="error" showIcon message={getErrorMessage(application.error)} />

  return (
    <div>
      <PageToolbar title="Edit application" description={application.data?.customerName || application.data?.name} />
      <PanelCard>
        <LoanApplicationForm
          initialValues={application.data}
          onSubmit={onSubmit}
          submitting={save.isPending}
          cancelTo={`/loan-applications/${id}`}
        />
      </PanelCard>
    </div>
  )
}
