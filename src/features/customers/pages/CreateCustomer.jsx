import { App } from 'antd'
import dayjs from 'dayjs'
import { useNavigate } from 'react-router-dom'
import PageToolbar from '@/components/common/PageToolbar/PageToolbar'
import PanelCard from '@/components/common/PanelCard/PanelCard'
import CustomerForm from '@/features/customers/components/CustomerForm'
import { useSaveCustomer } from '@/features/customers/hooks/useCustomers'
import { getErrorMessage } from '@/services/api/apiClient'
import { customerSchema } from '@/utils/validation'

function serialize(values) {
  return {
    ...values,
    dateOfBirth: values.dateOfBirth ? dayjs(values.dateOfBirth).format('YYYY-MM-DD') : null,
    hireDate: values.hireDate ? dayjs(values.hireDate).format('YYYY-MM-DD') : null,
  }
}

export default function CreateCustomer() {
  const navigate = useNavigate()
  const { message } = App.useApp()
  const save = useSaveCustomer()

  const onSubmit = async (values) => {
    const payload = serialize(values)
    try {
      await customerSchema.validate(payload, { abortEarly: false })
    } catch (error) {
      message.error(error.errors?.[0] || 'Check the form')
      return
    }
    try {
      const created = await save.mutateAsync(payload)
      message.success('Customer created')
      navigate(created?.id ? `/customers/${created.id}` : '/customers')
    } catch (error) {
      message.error(getErrorMessage(error))
    }
  }

  return (
    <div>
      <PageToolbar title="New customer" description="Add a borrower record." />
      <PanelCard>
        <CustomerForm onSubmit={onSubmit} submitting={save.isPending} />
      </PanelCard>
    </div>
  )
}
