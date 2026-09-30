import { App } from 'antd'
import { useNavigate } from 'react-router-dom'
import PageToolbar from '@/components/common/PageToolbar/PageToolbar'
import PanelCard from '@/components/common/PanelCard/PanelCard'
import LoanProductForm from '@/features/loan-products/components/LoanProductForm'
import { useSaveLoanProduct } from '@/features/loan-products/hooks/useLoanProducts'
import { getErrorMessage } from '@/services/api/apiClient'
import { loanProductSchema } from '@/utils/validation'

export default function CreateLoanProduct() {
  const navigate = useNavigate()
  const { message } = App.useApp()
  const save = useSaveLoanProduct()

  const onSubmit = async (values) => {
    try {
      await loanProductSchema.validate(values, { abortEarly: false })
    } catch (error) {
      message.error(error.errors?.[0] || 'Check the form')
      return
    }
    try {
      const created = await save.mutateAsync(values)
      message.success('Product created')
      navigate(created?.id ? `/loan-products/${created.id}` : '/loan-products')
    } catch (error) {
      message.error(getErrorMessage(error))
    }
  }

  return (
    <div>
      <PageToolbar title="New loan product" description="Define interest, limits, and term." />
      <PanelCard>
        <LoanProductForm onSubmit={onSubmit} submitting={save.isPending} />
      </PanelCard>
    </div>
  )
}
