import * as yup from 'yup'

export const loginSchema = yup.object({
  email: yup.string().trim().email('Enter a valid email').required('Email is required'),
  password: yup.string().required('Password is required'),
})

export const forgotPasswordSchema = yup.object({
  email: yup.string().trim().email('Enter a valid email').required('Email is required'),
})

export const resetPasswordSchema = yup.object({
  token: yup.string().required('Reset token is required'),
  password: yup.string().min(8, 'Use at least 8 characters').required('Password is required'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password')], 'Passwords do not match')
    .required('Confirm the new password'),
})

export const customerSchema = yup.object({
  name: yup.string().trim().required('Name is required'),
  email: yup.string().trim().email('Enter a valid email').required('Email is required'),
  phone: yup.string().trim().nullable(),
  address: yup.string().trim().nullable(),
  dateOfBirth: yup.string().nullable(),
  hireDate: yup.string().nullable(),
})

export const loanProductSchema = yup.object({
  name: yup.string().trim().required('Product name is required'),
  interestRate: yup.number().typeError('Enter a rate').min(0).required('Interest rate is required'),
  minAmount: yup.number().typeError('Enter an amount').min(0).required('Minimum amount is required'),
  maxAmount: yup.number().typeError('Enter an amount').min(yup.ref('minAmount'), 'Maximum must be at least the minimum').required('Maximum amount is required'),
  minTermMonths: yup.number().typeError('Enter a term').integer().min(1).required('Minimum term is required'),
  maxTermMonths: yup.number().typeError('Enter a term').integer().min(yup.ref('minTermMonths')).required('Maximum term is required'),
})

export const loanApplicationSchema = yup.object({
  customerId: yup.string().required('Select a customer'),
  productId: yup.string().nullable(),
  amount: yup.number().typeError('Enter an amount').positive('Amount must be greater than zero').required('Amount is required'),
  termMonths: yup.number().typeError('Enter a term').integer().positive().required('Duration is required'),
  purpose: yup.string().trim().nullable(),
})

export const approvalSchema = yup.object({
  decision: yup.string().oneOf(['APPROVED', 'REJECTED']).required('Choose a decision'),
  comment: yup.string().trim().required('A comment is required'),
  approvedAmount: yup.number().typeError('Enter an amount').positive().nullable(),
})

export const disbursementSchema = yup.object({
  applicationId: yup.string().required('Select an approved application'),
  amount: yup.number().typeError('Enter an amount').positive().required('Amount is required'),
  method: yup.string().required('Select a method'),
  reference: yup.string().trim().nullable(),
  disbursedAt: yup.string().required('Disbursement date is required'),
})

export const paymentSchema = yup.object({
  loanId: yup.string().required('Loan is required'),
  amount: yup.number().typeError('Enter an amount').positive().required('Amount is required'),
  paidAt: yup.string().required('Payment date is required'),
  method: yup.string().required('Select a method'),
  note: yup.string().trim().nullable(),
})

export const userSchema = yup.object({
  name: yup.string().trim().required('Name is required'),
  email: yup.string().trim().email('Enter a valid email').required('Email is required'),
  role: yup.string().required('Role is required'),
  password: yup.string().min(8, 'Use at least 8 characters').nullable(),
})

export function applyYupErrors(form, error) {
  if (!error?.inner?.length) return
  form.setFields(
    error.inner.map((item) => ({
      name: item.path,
      errors: [item.message],
    })),
  )
}
