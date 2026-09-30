import { createBrowserRouter } from 'react-router-dom'
import MainLayout from '@/components/layout/MainLayout'
import ProtectedRoute from '@/components/guards/ProtectedRoute'
import PermissionGuard from '@/components/guards/PermissionGuard'
import NotFound from '@/app/NotFound'
import Login from '@/features/auth/pages/Login'
import ForgotPassword from '@/features/auth/pages/ForgotPassword'
import ResetPassword from '@/features/auth/pages/ResetPassword'
import Dashboard from '@/features/dashboard/pages/Dashboard'
import CustomerList from '@/features/customers/pages/CustomerList'
import CustomerDetail from '@/features/customers/pages/CustomerDetail'
import CreateCustomer from '@/features/customers/pages/CreateCustomer'
import EditCustomer from '@/features/customers/pages/EditCustomer'
import LoanProductList from '@/features/loan-products/pages/LoanProductList'
import LoanProductDetail from '@/features/loan-products/pages/LoanProductDetail'
import CreateLoanProduct from '@/features/loan-products/pages/CreateLoanProduct'
import EditLoanProduct from '@/features/loan-products/pages/EditLoanProduct'
import LoanApplicationList from '@/features/loan-applications/pages/LoanApplicationList'
import LoanApplicationDetail from '@/features/loan-applications/pages/LoanApplicationDetail'
import CreateLoanApplication from '@/features/loan-applications/pages/CreateLoanApplication'
import EditLoanApplication from '@/features/loan-applications/pages/EditLoanApplication'
import ApprovalQueue from '@/features/loan-approval/pages/ApprovalQueue'
import ApprovalDetail from '@/features/loan-approval/pages/ApprovalDetail'
import DisbursementList from '@/features/disbursements/pages/DisbursementList'
import DisbursementDetail from '@/features/disbursements/pages/DisbursementDetail'
import RecordDisbursement from '@/features/disbursements/pages/RecordDisbursement'
import RepaymentList from '@/features/repayments/pages/RepaymentList'
import RepaymentDetail from '@/features/repayments/pages/RepaymentDetail'
import RecordPayment from '@/features/repayments/pages/RecordPayment'
import ReportsOverview from '@/features/reports/pages/ReportsOverview'
import LoanReport from '@/features/reports/pages/LoanReport'
import ApprovedLoansReport from '@/features/reports/pages/ApprovedLoansReport'
import RejectedLoansReport from '@/features/reports/pages/RejectedLoansReport'
import RepaymentReport from '@/features/reports/pages/RepaymentReport'
import CustomerReport from '@/features/reports/pages/CustomerReport'
import PortfolioReport from '@/features/reports/pages/PortfolioReport'
import NotificationList from '@/features/notifications/pages/NotificationList'
import MessageList from '@/features/messages/pages/MessageList'
import Chat from '@/features/messages/pages/Chat'
import UserList from '@/features/users/pages/UserList'
import UserDetail from '@/features/users/pages/UserDetail'
import CreateUser from '@/features/users/pages/CreateUser'
import { PERMISSIONS } from '@/utils/permissions'

function allow(permission, page) {
  return <PermissionGuard permission={permission}>{page}</PermissionGuard>
}

export const router = createBrowserRouter([
  { path: '/login', element: <Login /> },
  { path: '/forgot-password', element: <ForgotPassword /> },
  { path: '/reset-password', element: <ResetPassword /> },
  {
    element: <ProtectedRoute />,
    children: [
      {
        element: <MainLayout />,
        children: [
          {
            index: true,
            handle: { breadcrumb: 'Home' },
            element: allow(PERMISSIONS.DASHBOARD_VIEW, <Dashboard />),
          },
          {
            path: 'customers',
            handle: { breadcrumb: 'Customers' },
            children: [
              { index: true, element: allow(PERMISSIONS.CUSTOMER_VIEW, <CustomerList />) },
              { path: 'new', handle: { breadcrumb: 'New customer' }, element: allow(PERMISSIONS.CUSTOMER_MANAGE, <CreateCustomer />) },
              { path: ':id', handle: { breadcrumb: 'Customer' }, element: allow(PERMISSIONS.CUSTOMER_VIEW, <CustomerDetail />) },
              { path: ':id/edit', handle: { breadcrumb: 'Edit' }, element: allow(PERMISSIONS.CUSTOMER_MANAGE, <EditCustomer />) },
            ],
          },
          {
            path: 'loan-products',
            handle: { breadcrumb: 'Loan products' },
            children: [
              { index: true, element: allow(PERMISSIONS.PRODUCT_VIEW, <LoanProductList />) },
              { path: 'new', handle: { breadcrumb: 'New product' }, element: allow(PERMISSIONS.PRODUCT_MANAGE, <CreateLoanProduct />) },
              { path: ':id', handle: { breadcrumb: 'Product' }, element: allow(PERMISSIONS.PRODUCT_VIEW, <LoanProductDetail />) },
              { path: ':id/edit', handle: { breadcrumb: 'Edit' }, element: allow(PERMISSIONS.PRODUCT_MANAGE, <EditLoanProduct />) },
            ],
          },
          {
            path: 'loan-applications',
            handle: { breadcrumb: 'Requests' },
            children: [
              { index: true, element: allow(PERMISSIONS.APPLICATION_VIEW, <LoanApplicationList />) },
              { path: 'new', handle: { breadcrumb: 'New application' }, element: allow(PERMISSIONS.APPLICATION_MANAGE, <CreateLoanApplication />) },
              { path: ':id', handle: { breadcrumb: 'Application' }, element: allow(PERMISSIONS.APPLICATION_VIEW, <LoanApplicationDetail />) },
              { path: ':id/edit', handle: { breadcrumb: 'Edit' }, element: allow(PERMISSIONS.APPLICATION_MANAGE, <EditLoanApplication />) },
            ],
          },
          {
            path: 'approvals',
            handle: { breadcrumb: 'Approvals' },
            children: [
              { index: true, element: allow(PERMISSIONS.APPROVAL_VIEW, <ApprovalQueue />) },
              { path: ':id', handle: { breadcrumb: 'Review' }, element: allow(PERMISSIONS.APPROVAL_VIEW, <ApprovalDetail />) },
            ],
          },
          {
            path: 'disbursements',
            handle: { breadcrumb: 'Disbursements' },
            children: [
              { index: true, element: allow(PERMISSIONS.DISBURSEMENT_VIEW, <DisbursementList />) },
              { path: 'new', handle: { breadcrumb: 'Record' }, element: allow(PERMISSIONS.DISBURSEMENT_MANAGE, <RecordDisbursement />) },
              { path: ':id', handle: { breadcrumb: 'Disbursement' }, element: allow(PERMISSIONS.DISBURSEMENT_VIEW, <DisbursementDetail />) },
            ],
          },
          {
            path: 'repayments',
            handle: { breadcrumb: 'Repay' },
            children: [
              { index: true, element: allow(PERMISSIONS.REPAYMENT_VIEW, <RepaymentList />) },
              { path: 'record', handle: { breadcrumb: 'Record payment' }, element: allow(PERMISSIONS.REPAYMENT_RECORD, <RecordPayment />) },
              { path: ':id', handle: { breadcrumb: 'Payment' }, element: allow(PERMISSIONS.REPAYMENT_VIEW, <RepaymentDetail />) },
            ],
          },
          {
            path: 'reports',
            handle: { breadcrumb: 'Reports' },
            children: [
              { index: true, element: allow(PERMISSIONS.REPORT_VIEW, <ReportsOverview />) },
              { path: 'loans', handle: { breadcrumb: 'Loan applications' }, element: allow(PERMISSIONS.REPORT_VIEW, <LoanReport />) },
              { path: 'approved', handle: { breadcrumb: 'Approved' }, element: allow(PERMISSIONS.REPORT_VIEW, <ApprovedLoansReport />) },
              { path: 'rejected', handle: { breadcrumb: 'Rejected' }, element: allow(PERMISSIONS.REPORT_VIEW, <RejectedLoansReport />) },
              { path: 'repayments', handle: { breadcrumb: 'Payments' }, element: allow(PERMISSIONS.REPORT_VIEW, <RepaymentReport />) },
              { path: 'customers', handle: { breadcrumb: 'Customers' }, element: allow(PERMISSIONS.REPORT_VIEW, <CustomerReport />) },
              { path: 'portfolio', handle: { breadcrumb: 'Portfolio' }, element: allow(PERMISSIONS.REPORT_VIEW, <PortfolioReport />) },
            ],
          },
          {
            path: 'messages',
            handle: { breadcrumb: 'Messages' },
            children: [
              { index: true, element: allow(PERMISSIONS.MESSAGE_VIEW, <MessageList />) },
              { path: ':userId', handle: { breadcrumb: 'Chat' }, element: allow(PERMISSIONS.MESSAGE_VIEW, <Chat />) },
            ],
          },
          {
            path: 'notifications',
            handle: { breadcrumb: 'Notifications' },
            element: allow(PERMISSIONS.NOTIFICATION_VIEW, <NotificationList />),
          },
          {
            path: 'users',
            handle: { breadcrumb: 'Staff users' },
            children: [
              { index: true, element: allow(PERMISSIONS.USER_VIEW, <UserList />) },
              { path: 'new', handle: { breadcrumb: 'New user' }, element: allow(PERMISSIONS.USER_MANAGE, <CreateUser />) },
              { path: ':id', handle: { breadcrumb: 'User' }, element: allow(PERMISSIONS.USER_VIEW, <UserDetail />) },
            ],
          },
          { path: '*', element: <NotFound /> },
        ],
      },
    ],
  },
])
