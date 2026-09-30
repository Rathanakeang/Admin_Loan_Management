import { App } from 'antd'
import { useNavigate } from 'react-router-dom'
import PageToolbar from '@/components/common/PageToolbar/PageToolbar'
import PanelCard from '@/components/common/PanelCard/PanelCard'
import UserForm from '@/features/users/components/UserForm'
import { useCreateUser } from '@/features/users/hooks/useUsers'
import { getErrorMessage } from '@/services/api/apiClient'
import { userSchema } from '@/utils/validation'

export default function CreateUser() {
  const navigate = useNavigate()
  const { message } = App.useApp()
  const create = useCreateUser()

  const onSubmit = async (values) => {
    try {
      await userSchema.validate(values, { abortEarly: false })
    } catch (error) {
      message.error(error.errors?.[0] || 'Check the form')
      return
    }
    try {
      const created = await create.mutateAsync(values)
      message.success('User created')
      navigate(created?.id ? `/users/${created.id}` : '/users')
    } catch (error) {
      message.error(getErrorMessage(error))
    }
  }

  return (
    <div>
      <PageToolbar title="New staff user" description="Create an administrator account. This is not a customer." />
      <PanelCard>
        <UserForm onSubmit={onSubmit} submitting={create.isPending} />
      </PanelCard>
    </div>
  )
}
