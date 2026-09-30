import { useState } from 'react'
import { Form } from 'antd'
import LinkButton from '@/components/common/LinkButton/LinkButton'
import { useQuery } from '@tanstack/react-query'
import Button from '@/components/common/Button/Button'
import ApplicantInformation from '@/features/loan-applications/components/ApplicantInformation'
import LoanInformation from '@/features/loan-applications/components/LoanInformation'
import DocumentUpload from '@/features/loan-applications/components/DocumentUpload'
import { customerService } from '@/features/customers/services/customerService'
import { loanProductService } from '@/features/loan-products/services/loanProductService'

export default function LoanApplicationForm({ initialValues, onSubmit, submitting, cancelTo = '/loan-applications' }) {
  const [files, setFiles] = useState([])
  const customers = useQuery({
    queryKey: ['customers', 'options'],
    queryFn: () => customerService.list({ page: 1, pageSize: 100 }),
  })
  const products = useQuery({
    queryKey: ['loan-products', 'options'],
    queryFn: () => loanProductService.list({ page: 1, pageSize: 100 }),
  })

  return (
    <Form
      layout="vertical"
      initialValues={initialValues}
      key={initialValues?.id || 'new'}
      onFinish={(values) => onSubmit(values, files)}
      className="max-w-3xl"
    >
      <ApplicantInformation customers={customers.data?.items || []} />
      <LoanInformation products={products.data?.items || []} />
      <DocumentUpload fileList={files} onChange={setFiles} />
      <div className="mt-2 flex flex-wrap items-center gap-2">
        <Button htmlType="submit" loading={submitting}>Save application</Button>
        <LinkButton to={cancelTo} variant="secondary">Cancel</LinkButton>
      </div>
    </Form>
  )
}
