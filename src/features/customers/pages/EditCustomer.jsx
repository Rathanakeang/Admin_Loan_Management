import { Alert, App } from 'antd'
import dayjs from 'dayjs'
import { useNavigate, useParams } from 'react-router-dom'
import Loading from '@/components/common/Loading/Loading'
import PageToolbar from '@/components/common/PageToolbar/PageToolbar'
import PanelCard from '@/components/common/PanelCard/PanelCard'
import CustomerForm from '@/features/customers/components/CustomerForm'
import { useCustomer, useSaveCustomer } from '@/features/customers/hooks/useCustomers'
import { getErrorMessage } from '@/services/api/apiClient'
import { customerSchema } from '@/utils/validation'

function serialize(values) {
  return {
    ...values,
    dateOfBirth: values.dateOfBirth ? dayjs(values.dateOfBirth).format('YYYY-MM-DD') : null,
    hireDate: values.hireDate ? dayjs(values.hireDate).format('YYYY-MM-DD') : null,
  }
}

export default function EditCustomer() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { message } = App.useApp()
  const customer = useCustomer(id)
  const save = useSaveCustomer(id)

  const onSubmit = async (values) => {
    const payload = serialize(values)
    try {
      await customerSchema.validate(payload, { abortEarly: false })
    } catch (error) {
      message.error(error.errors?.[0] || 'Check the form')
      return
    }
    try {
      await save.mutateAsync(payload)
      message.success('Customer updated')
      navigate(`/customers/${id}`)
    } catch (error) {
      message.error(getErrorMessage(error))
    }
  }

  if (customer.isLoading) return <Loading />
  if (customer.isError) return <Alert type="error" showIcon message={getErrorMessage(customer.error)} />

  return (
    <div>
      <PageToolbar title="Edit customer" description={customer.data?.name} />
      <PanelCard>
        <CustomerForm
          initialValues={customer.data}
          onSubmit={onSubmit}
          submitting={save.isPending}
          cancelTo={`/customers/${id}`}
        />
      </PanelCard>
    </div>
  )
}
