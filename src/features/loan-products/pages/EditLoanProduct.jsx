import { Alert, App } from 'antd'
import { useNavigate, useParams } from 'react-router-dom'
import Loading from '@/components/common/Loading/Loading'
import PageToolbar from '@/components/common/PageToolbar/PageToolbar'
import PanelCard from '@/components/common/PanelCard/PanelCard'
import LoanProductForm from '@/features/loan-products/components/LoanProductForm'
import { useLoanProduct, useSaveLoanProduct } from '@/features/loan-products/hooks/useLoanProducts'
import { getErrorMessage } from '@/services/api/apiClient'
import { loanProductSchema } from '@/utils/validation'

export default function EditLoanProduct() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { message } = App.useApp()
  const product = useLoanProduct(id)
  const save = useSaveLoanProduct(id)

  const onSubmit = async (values) => {
    try {
      await loanProductSchema.validate(values, { abortEarly: false })
    } catch (error) {
      message.error(error.errors?.[0] || 'Check the form')
      return
    }
    try {
      await save.mutateAsync(values)
      message.success('Product updated')
      navigate(`/loan-products/${id}`)
    } catch (error) {
      message.error(getErrorMessage(error))
    }
  }

  if (product.isLoading) return <Loading />
  if (product.isError) return <Alert type="error" showIcon message={getErrorMessage(product.error)} />

  return (
    <div>
      <PageToolbar title="Edit loan product" description={product.data?.name} />
      <PanelCard>
        <LoanProductForm
          initialValues={product.data}
          onSubmit={onSubmit}
          submitting={save.isPending}
          cancelTo={`/loan-products/${id}`}
        />
      </PanelCard>
    </div>
  )
}
