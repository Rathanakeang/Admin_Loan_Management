import dayjs from 'dayjs'

const STORAGE_KEY = 'lms.frontendData'
const VERSION = 1
export const LOCAL_TOKEN = 'local-admin-session'

function monthSeries(records, dateField, valueField) {
  const labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  const year = dayjs().year()
  const values = labels.map((_, index) =>
    records.reduce((sum, record) => {
      const date = dayjs(record[dateField])
      if (!date.isValid() || date.year() !== year || date.month() !== index) return sum
      return sum + (valueField ? Number(record[valueField]) || 0 : 1)
    }, 0),
  )
  return { labels, values }
}

function seed() {
  const customers = [
    { id: 'c1', userId: 'UID001', name: 'Touch Vannary', email: 'touch@gmail.com', phone: '012340001', address: 'Phnom Penh, Cambodia', dateOfBirth: '1998-04-12', hireDate: '2024-01-08', createdAt: '2026-01-12T09:00:00' },
    { id: 'c2', userId: 'UID002', name: 'Neanea', email: 'nea@gmail.com', phone: '012340002', address: 'Phnom Penh', dateOfBirth: '1999-02-02', hireDate: '2024-03-01', createdAt: '2026-02-04T09:00:00' },
    { id: 'c3', userId: 'UID003', name: 'bobo', email: 'bo@gmail.com', phone: '012340003', address: 'Siem Reap', dateOfBirth: '2001-07-19', hireDate: '2024-06-11', createdAt: '2026-03-18T09:00:00' },
    { id: 'c4', userId: 'UID004', name: 'Soya', email: 'soya@gmail.com', phone: '012345678', address: 'Phnom Penh, Cambodia', dateOfBirth: '2000-05-10', hireDate: '2025-08-02', createdAt: '2026-04-09T09:00:00' },
    { id: 'c5', userId: 'UID005', name: 'Long Ratha', email: 'ratha@gmail.com', phone: '012340005', address: 'Battambang', dateOfBirth: '1996-11-21', hireDate: '2023-09-14', createdAt: '2026-05-02T09:00:00' },
    { id: 'c6', userId: 'UID006', name: 'Chuob SreyKong', email: 'kong@gmail.com', phone: '012340006', address: 'Phnom Penh', dateOfBirth: '1997-08-30', hireDate: '2024-02-20', createdAt: '2026-06-15T09:00:00' },
    { id: 'c7', userId: 'UID007', name: 'Ryna', email: 'ryna@gmail.com', phone: '012340007', address: 'Kampong Cham', dateOfBirth: '2002-01-05', hireDate: '2025-01-09', createdAt: '2026-07-07T09:00:00' },
    { id: 'c8', userId: 'UID008', name: 'Run', email: 'run@gmail.com', phone: '012340008', address: 'Kandal', dateOfBirth: '1995-12-12', hireDate: '2022-05-05', createdAt: '2026-08-21T09:00:00' },
    { id: 'c9', userId: 'UID009', name: 'CI', email: 'ci@gmail.com', phone: '012340009', address: 'Phnom Penh', dateOfBirth: '1994-03-03', hireDate: '2021-11-11', createdAt: '2026-09-02T09:00:00' },
    { id: 'c10', userId: 'UID010', name: 'ry', email: 'ry@gmail.com', phone: '012340010', address: 'Phnom Penh', dateOfBirth: '2000-09-09', hireDate: '2025-09-01', createdAt: '2026-09-11T09:00:00' },
    { id: 'c11', userId: 'UID011', name: 'Sis', email: 'sis@gmail.com', phone: '012340011', address: 'Takeo', dateOfBirth: '1999-06-16', hireDate: '2024-08-08', createdAt: '2026-09-20T09:00:00' },
    { id: 'c12', userId: 'UID012', name: 'Nea Not', email: 'neanot@gmail.com', phone: '012340012', address: 'Phnom Penh', dateOfBirth: '1998-10-10', hireDate: '2024-10-10', createdAt: '2026-01-20T09:00:00' },
    { id: 'c13', userId: 'UID013', name: 'roro', email: 'ro@gmail.com', phone: '012340013', address: 'Phnom Penh', dateOfBirth: '1993-04-04', hireDate: '2020-04-04', createdAt: '2026-01-23T09:00:00' },
    { id: 'c14', userId: 'UID014', name: 'Jeje', email: 'je@gmail.com', phone: '012340014', address: 'Kampot', dateOfBirth: '2001-01-18', hireDate: '2025-02-02', createdAt: '2026-10-01T09:00:00' },
    { id: 'c15', userId: 'UID015', name: 'JingFong', email: 'fong@gmail.com', phone: '012340015', address: 'Phnom Penh', dateOfBirth: '1992-07-07', hireDate: '2019-07-07', createdAt: '2026-11-03T09:00:00' },
    { id: 'c16', userId: 'UID016', name: 'Papa', email: 'papa@gmail.com', phone: '012340016', address: 'Sihanoukville', dateOfBirth: '1988-02-14', hireDate: '2018-02-14', createdAt: '2026-12-01T09:00:00' },
    { id: 'c17', userId: 'UID017', name: 'hi', email: 'hi@gmail.com', phone: '012340017', address: 'Phnom Penh', dateOfBirth: '2003-03-22', hireDate: '2026-01-01', createdAt: '2026-09-25T09:00:00' },
  ]

  const products = [
    { id: 'p1', name: 'Personal loan', interestRate: 12, minAmount: 500, maxAmount: 20000, minTermMonths: 6, maxTermMonths: 24 },
    { id: 'p2', name: 'Business loan', interestRate: 14, minAmount: 2000, maxAmount: 100000, minTermMonths: 12, maxTermMonths: 36 },
  ]

  const applications = [
    { id: 'a1', customerId: 'c12', customerName: 'Nea Not', email: 'neanot@gmail.com', productId: 'p1', amount: 20000, termMonths: 12, status: 'PENDING', purpose: 'Working capital', createdAt: '2026-01-23T20:10:00' },
    { id: 'a2', customerId: 'c13', customerName: 'roro', email: 'ro@gmail.com', productId: 'p2', amount: 60000, termMonths: 36, status: 'PENDING', purpose: 'Shop expansion', createdAt: '2026-02-11T11:00:00' },
    { id: 'a3', customerId: 'c5', customerName: 'Long Ratha', email: 'ratha@gmail.com', productId: 'p1', amount: 20000, termMonths: 24, status: 'APPROVED', approvedAmount: 20000, purpose: 'Family expense', createdAt: '2026-03-02T10:00:00', approvedAt: '2026-03-04T15:00:00' },
    { id: 'a4', customerId: 'c14', customerName: 'Jeje', email: 'je@gmail.com', productId: 'p1', amount: 20000, termMonths: 24, status: 'PENDING', purpose: 'Education', createdAt: '2026-04-16T08:30:00' },
    { id: 'a5', customerId: 'c15', customerName: 'JingFong', email: 'fong@gmail.com', productId: 'p2', amount: 30000, termMonths: 36, status: 'APPROVED', approvedAmount: 30000, purpose: 'Inventory', createdAt: '2026-05-09T14:00:00', approvedAt: '2026-05-10T09:00:00' },
    { id: 'a6', customerId: 'c16', customerName: 'Papa', email: 'papa@gmail.com', productId: 'p1', amount: 2000, termMonths: 24, status: 'REJECTED', purpose: 'Travel', createdAt: '2026-06-01T09:00:00', rejectedAt: '2026-06-02T09:00:00' },
    { id: 'a7', customerId: 'c17', customerName: 'hi', email: 'hi@gmail.com', productId: 'p1', amount: 9999, termMonths: 24, status: 'ACTIVE', approvedAmount: 9999, purpose: 'Equipment', createdAt: '2026-07-19T16:00:00', approvedAt: '2026-07-20T10:00:00' },
    { id: 'a8', customerId: 'c3', customerName: 'bobo', email: 'bo@gmail.com', productId: 'p1', amount: 10000, termMonths: 12, status: 'DISBURSED', approvedAmount: 10000, purpose: 'Repair', createdAt: '2026-08-05T12:00:00', approvedAt: '2026-08-06T12:00:00' },
    { id: 'a9', customerId: 'c1', customerName: 'Touch Vannary', email: 'touch@gmail.com', productId: 'p1', amount: 5000, termMonths: 12, status: 'ACTIVE', approvedAmount: 5000, purpose: 'Medical', createdAt: '2026-09-01T08:00:00', approvedAt: '2026-09-02T08:00:00' },
    { id: 'a10', customerId: 'c4', customerName: 'Soya', email: 'soya@gmail.com', productId: 'p1', amount: 8000, termMonths: 18, status: 'OVERDUE', approvedAmount: 8000, purpose: 'Rent', createdAt: '2026-09-12T08:00:00', approvedAt: '2026-09-13T08:00:00' },
    { id: 'a11', customerId: 'c9', customerName: 'CI', email: 'ci@gmail.com', productId: 'p1', amount: 4500, termMonths: 12, status: 'APPROVED', approvedAmount: 4500, purpose: 'Supplies', createdAt: '2026-09-28T09:30:00', approvedAt: '2026-09-28T11:00:00' },
    { id: 'a12', customerId: 'c7', customerName: 'Ryna', email: 'ryna@gmail.com', productId: 'p2', amount: 15000, termMonths: 24, status: 'REJECTED', purpose: 'Vehicle', createdAt: '2026-09-28T10:15:00', rejectedAt: '2026-09-28T13:00:00' },
  ]

  return {
    version: VERSION,
    seq: 200,
    staff: [
      {
        id: 'staff-1',
        name: 'Admin',
        email: 'admin@loan.local',
        password: 'Admin@123',
        role: 'SUPER_ADMIN',
      },
    ],
    customers,
    products,
    applications,
    approvalHistory: [
      { id: 'h1', applicationId: 'a3', decision: 'APPROVED', comment: 'Income documents are complete.', actorName: 'Admin', createdAt: '2026-03-04T15:00:00' },
      { id: 'h2', applicationId: 'a6', decision: 'REJECTED', comment: 'Purpose is outside the product rules.', actorName: 'Admin', createdAt: '2026-06-02T09:00:00' },
      { id: 'h3', applicationId: 'a12', decision: 'REJECTED', comment: 'Requested amount is above the current limit.', actorName: 'Admin', createdAt: '2026-09-28T13:00:00' },
    ],
    disbursements: [
      { id: 'd1', applicationId: 'a8', customerName: 'bobo', amount: 10000, method: 'BANK_TRANSFER', reference: 'DS-1008', disbursedAt: '2026-08-07T10:00:00', status: 'COMPLETED' },
      { id: 'd2', applicationId: 'a9', customerName: 'Touch Vannary', amount: 5000, method: 'WALLET', reference: 'DS-1009', disbursedAt: '2026-09-03T10:00:00', status: 'COMPLETED' },
    ],
    repayments: [
      { id: 'r1', loanId: 'a9', customerName: 'Touch Vannary', amount: 86.07, paidAt: dayjs().subtract(12, 'hour').toISOString(), method: 'WALLET', status: 'ON_TIME', note: '' },
      { id: 'r2', loanId: 'a4', customerName: 'Pookie', amount: 865.27, paidAt: '2026-02-08T09:00:00', method: 'CASH', status: 'ON_TIME', note: '' },
      { id: 'r3', loanId: 'a4', customerName: 'Soya', amount: 865.27, paidAt: '2026-02-07T09:00:00', method: 'CASH', status: 'LATE', note: 'Paid after the due date' },
      { id: 'r4', loanId: 'a3', customerName: 'Long Ratha', amount: 896.45, paidAt: '2026-01-28T09:00:00', method: 'BANK_TRANSFER', status: 'ON_TIME', note: '' },
      { id: 'r5', loanId: 'a10', customerName: 'Soya', amount: 120, paidAt: '2026-09-18T18:30:00', method: 'CASH', status: 'LATE', note: '' },
    ],
    notifications: [
      { id: 'n1', type: 'User Repay', title: 'User Repay', message: 'Touch Vannary repaid $86.07', createdAt: dayjs().subtract(12, 'hour').toISOString(), read: false },
      { id: 'n2', type: 'User Request', title: 'User Request', message: 'Neanea Applied loan $20000', createdAt: dayjs().subtract(57, 'day').toISOString(), read: false },
      { id: 'n3', type: 'User Repay', title: 'User Repay', message: 'Pookie repaid $865.27', createdAt: dayjs().subtract(232, 'day').toISOString(), read: true },
      { id: 'n4', type: 'User Repay', title: 'User Repay', message: 'Soya repaid $865.27', createdAt: dayjs().subtract(233, 'day').toISOString(), read: true },
      { id: 'n5', type: 'User Request', title: 'User Request', message: 'Roro Applied loan $60000', createdAt: dayjs().subtract(233, 'day').toISOString(), read: true },
      { id: 'n6', type: 'User Repay', title: 'User Repay', message: 'Long Ratha repaid $896.45', createdAt: dayjs().subtract(243, 'day').toISOString(), read: true },
      { id: 'n7', type: 'User Request', title: 'User Request', message: 'Long Ratha Applied loan $20000', createdAt: dayjs().subtract(243, 'day').toISOString(), read: true },
    ],
    conversations: [
      { userId: 'c1', name: 'Touch Vannary', messages: [{ id: 'm1', sender: 'customer', text: 'Hul', createdAt: '2026-09-27T08:12:00' }] },
      { userId: 'c2', name: 'Neanea', messages: [{ id: 'm2', sender: 'customer', text: 'I want to apply', createdAt: '2026-09-26T10:00:00' }] },
      { userId: 'c3', name: 'bobo', messages: [{ id: 'm3', sender: 'customer', text: 'bfgb', createdAt: '2026-09-25T11:20:00' }] },
      {
        userId: 'c4',
        name: 'Soya',
        messages: [
          { id: 'm4', sender: 'customer', text: 'yes', createdAt: '2026-09-28T12:05:00' },
          { id: 'm5', sender: 'admin', fileName: 'voice_message.m4a', text: '', createdAt: '2026-09-28T13:05:00' },
          { id: 'm6', sender: 'admin', text: '', deleted: true, createdAt: '2026-09-28T12:18:00' },
        ],
      },
      { userId: 'c5', name: 'Long Ratha', messages: [{ id: 'm7', sender: 'customer', text: 'yes', createdAt: '2026-09-24T09:00:00' }] },
      { userId: 'c6', name: 'Chuob SreyKong', messages: [] },
      { userId: 'c7', name: 'Ryna', messages: [{ id: 'm8', sender: 'customer', text: 'You want to apply or not', createdAt: '2026-09-23T15:00:00' }] },
      { userId: 'c8', name: 'Run', messages: [] },
      { userId: 'c11', name: 'Sis', messages: [{ id: 'm9', sender: 'customer', text: 'hi', createdAt: '2026-09-22T18:40:00' }] },
    ],
  }
}

function load() {
  if (typeof window === 'undefined') return seed()
  try {
    const saved = JSON.parse(window.localStorage.getItem(STORAGE_KEY) || 'null')
    if (saved?.version === VERSION) return saved
  } catch {
    window.localStorage.removeItem(STORAGE_KEY)
  }
  const fresh = seed()
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(fresh))
  return fresh
}

const db = load()

function save() {
  if (typeof window === 'undefined') return
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(db))
}

function nextId(prefix) {
  db.seq += 1
  return `${prefix}${db.seq}`
}

function fail(status, message) {
  const error = new Error(message)
  error.response = { status, data: { message } }
  throw error
}

function parseBody(data) {
  if (!data) return {}
  if (typeof FormData !== 'undefined' && data instanceof FormData) return data
  if (typeof data === 'string') {
    try {
      return JSON.parse(data)
    } catch {
      return {}
    }
  }
  return data
}

function paginate(items, params = {}) {
  const page = Number(params.page || 1)
  const pageSize = Number(params.pageSize || items.length || 10)
  const start = (page - 1) * pageSize
  return { items: items.slice(start, start + pageSize), total: items.length }
}

function includes(record, search, fields) {
  if (!search) return true
  const query = String(search).toLowerCase()
  return fields.some((field) => String(record[field] || '').toLowerCase().includes(query))
}

function startOfWeek(date) {
  return date.startOf('day').subtract(date.day(), 'day')
}

function inPeriod(value, params = {}) {
  if (!params.range || !value) return true
  const date = dayjs(value)
  const anchor = params.date ? dayjs(params.date) : dayjs()
  if (!date.isValid() || !anchor.isValid()) return true

  if (params.range === 'day') {
    if (date.format('YYYY-MM-DD') !== anchor.format('YYYY-MM-DD')) return false
    const hour = date.hour()
    if (!params.slot || params.slot === 'full') return true
    if (params.slot === 'morning') return hour < 12
    if (params.slot === 'afternoon') return hour >= 12 && hour < 18
    return hour >= 18
  }

  if (params.range === 'week') {
    const start = startOfWeek(anchor)
    const end = start.add(6, 'day').endOf('day')
    return !date.isBefore(start) && !date.isAfter(end)
  }

  if (params.range === 'month') return date.format('YYYY-MM') === anchor.format('YYYY-MM')

  if (params.range === 'year') {
    if (date.year() !== anchor.year()) return false
    if (!params.months) return true
    const months = String(params.months).split(',').map(Number).filter(Boolean)
    return months.includes(date.month() + 1)
  }

  return true
}

function publicStaff(user) {
  if (!user) return null
  return { id: user.id, name: user.name, email: user.email, role: user.role }
}

function requireUser(config) {
  const headers = config.headers
  const header = typeof headers?.get === 'function'
    ? headers.get('Authorization')
    : headers?.Authorization || headers?.authorization
  if (header !== `Bearer ${LOCAL_TOKEN}`) fail(401, 'Sign in required')
}

function summary() {
  const applied = new Set(db.applications.map((item) => item.customerId))
  return {
    totalUsersApplied: applied.size,
    loansApproved: db.applications.filter((item) => ['APPROVED', 'DISBURSED', 'ACTIVE', 'OVERDUE'].includes(item.status)).length,
    loansRejected: db.applications.filter((item) => item.status === 'REJECTED').length,
    onTimePayments: db.repayments.filter((item) => item.status === 'ON_TIME').length,
    latePayments: db.repayments.filter((item) => item.status === 'LATE').length,
  }
}

function conversationPreview(conversation) {
  const latest = [...conversation.messages].reverse().find((item) => item.text || item.fileName)
  return latest?.text || latest?.fileName || ''
}

const routes = [
  {
    method: 'post',
    pattern: '/auth/login',
    auth: false,
    handle(_params, body) {
      const user = db.staff.find((item) => item.email.toLowerCase() === String(body.email || '').toLowerCase())
      if (!user || user.password !== body.password) fail(401, 'Email or password is incorrect')
      return { token: LOCAL_TOKEN, user: publicStaff(user) }
    },
  },
  { method: 'post', pattern: '/auth/logout', auth: false, handle: () => ({}) },
  { method: 'get', pattern: '/auth/me', handle: () => publicStaff(db.staff[0]) },
  { method: 'post', pattern: '/auth/forgot-password', auth: false, handle: () => ({ message: 'Password reset is available on this browser session only.' }) },
  {
    method: 'post',
    pattern: '/auth/reset-password',
    auth: false,
    handle(_params, body) {
      db.staff[0].password = body.password
      save()
      return { message: 'Password updated' }
    },
  },
  { method: 'get', pattern: '/dashboard/summary', handle: () => summary() },
  { method: 'get', pattern: '/dashboard/registrations/chart', handle: () => monthSeries(db.customers, 'createdAt') },
  { method: 'get', pattern: '/dashboard/loans/chart', handle: () => monthSeries(db.applications, 'createdAt') },
  { method: 'get', pattern: '/dashboard/payments/chart', handle: () => monthSeries(db.repayments, 'paidAt', 'amount') },
  {
    method: 'get',
    pattern: '/dashboard/loans/recent',
    handle: () => ({
      items: [...db.applications].sort((a, b) => dayjs(b.createdAt).valueOf() - dayjs(a.createdAt).valueOf()).slice(0, 5),
      total: Math.min(5, db.applications.length),
    }),
  },
  {
    method: 'get',
    pattern: '/customers',
    handle(_params, _body, query) {
      const items = db.customers.filter((item) => includes(item, query.search, ['userId', 'name', 'email']))
      return paginate(items, query)
    },
  },
  {
    method: 'post',
    pattern: '/customers',
    handle(_params, body) {
      const record = {
        id: nextId('c'),
        userId: `UID${String(db.customers.length + 1).padStart(3, '0')}`,
        createdAt: new Date().toISOString(),
        ...body,
      }
      db.customers.unshift(record)
      save()
      return record
    },
  },
  { method: 'get', pattern: '/customers/:id', handle: ({ id }) => db.customers.find((item) => item.id === id) || fail(404, 'Customer not found') },
  {
    method: 'put',
    pattern: '/customers/:id',
    handle({ id }, body) {
      const index = db.customers.findIndex((item) => item.id === id)
      if (index < 0) fail(404, 'Customer not found')
      db.customers[index] = { ...db.customers[index], ...body, id }
      save()
      return db.customers[index]
    },
  },
  {
    method: 'get',
    pattern: '/loan-products',
    handle(_params, _body, query) {
      const items = db.products.filter((item) => includes(item, query.search, ['name']))
      return paginate(items, query)
    },
  },
  {
    method: 'post',
    pattern: '/loan-products',
    handle(_params, body) {
      const record = { id: nextId('p'), ...body }
      db.products.unshift(record)
      save()
      return record
    },
  },
  { method: 'get', pattern: '/loan-products/:id', handle: ({ id }) => db.products.find((item) => item.id === id) || fail(404, 'Product not found') },
  {
    method: 'put',
    pattern: '/loan-products/:id',
    handle({ id }, body) {
      const index = db.products.findIndex((item) => item.id === id)
      if (index < 0) fail(404, 'Product not found')
      db.products[index] = { ...db.products[index], ...body, id }
      save()
      return db.products[index]
    },
  },
  {
    method: 'get',
    pattern: '/loan-applications',
    handle(_params, _body, query) {
      const items = db.applications.filter((item) => includes(item, query.search, ['customerName', 'name', 'email']))
      return paginate(items, query)
    },
  },
  {
    method: 'post',
    pattern: '/loan-applications',
    handle(_params, body) {
      const customer = db.customers.find((item) => item.id === body.customerId)
      const record = {
        id: nextId('a'),
        status: 'PENDING',
        createdAt: new Date().toISOString(),
        customerName: customer?.name,
        email: customer?.email,
        documents: [],
        ...body,
      }
      db.applications.unshift(record)
      save()
      return record
    },
  },
  {
    method: 'post',
    pattern: '/loan-applications/:id/documents',
    handle({ id }, body) {
      const application = db.applications.find((item) => item.id === id)
      if (!application) fail(404, 'Application not found')
      const file = body instanceof FormData ? body.get('file') : null
      application.documents = application.documents || []
      application.documents.push({ id: nextId('doc'), fileName: file?.name || 'document' })
      save()
      return application
    },
  },
  { method: 'get', pattern: '/loan-applications/:id', handle: ({ id }) => db.applications.find((item) => item.id === id) || fail(404, 'Application not found') },
  {
    method: 'put',
    pattern: '/loan-applications/:id',
    handle({ id }, body) {
      const index = db.applications.findIndex((item) => item.id === id)
      if (index < 0) fail(404, 'Application not found')
      const customer = db.customers.find((item) => item.id === (body.customerId || db.applications[index].customerId))
      db.applications[index] = {
        ...db.applications[index],
        ...body,
        id,
        customerName: customer?.name || db.applications[index].customerName,
        email: customer?.email || db.applications[index].email,
      }
      save()
      return db.applications[index]
    },
  },
  {
    method: 'get',
    pattern: '/approvals',
    handle(_params, _body, query) {
      const items = db.applications.filter((item) => !query.status || item.status === query.status)
      return paginate(items, query)
    },
  },
  {
    method: 'get',
    pattern: '/approvals/:id/history',
    handle: ({ id }) => ({ items: db.approvalHistory.filter((item) => item.applicationId === id), total: db.approvalHistory.length }),
  },
  {
    method: 'post',
    pattern: '/approvals/:id/decision',
    handle({ id }, body) {
      const application = db.applications.find((item) => item.id === id)
      if (!application) fail(404, 'Application not found')
      application.status = body.decision
      if (body.decision === 'APPROVED') {
        application.approvedAmount = body.approvedAmount || application.amount
        application.approvedAt = new Date().toISOString()
      }
      if (body.decision === 'REJECTED') application.rejectedAt = new Date().toISOString()
      db.approvalHistory.unshift({
        id: nextId('h'),
        applicationId: id,
        decision: body.decision,
        comment: body.comment,
        actorName: 'Admin',
        createdAt: new Date().toISOString(),
      })
      db.notifications.unshift({
        id: nextId('n'),
        type: 'Loan decision',
        title: 'Loan decision',
        message: `${application.customerName} was ${body.decision.toLowerCase()}`,
        createdAt: new Date().toISOString(),
        read: false,
      })
      save()
      return application
    },
  },
  { method: 'get', pattern: '/approvals/:id', handle: ({ id }) => db.applications.find((item) => item.id === id) || fail(404, 'Application not found') },
  {
    method: 'get',
    pattern: '/disbursements',
    handle(_params, _body, query) {
      return paginate(db.disbursements, query)
    },
  },
  {
    method: 'post',
    pattern: '/disbursements',
    handle(_params, body) {
      const application = db.applications.find((item) => item.id === body.applicationId)
      const record = {
        id: nextId('d'),
        customerName: application?.customerName || '',
        status: 'COMPLETED',
        ...body,
      }
      db.disbursements.unshift(record)
      if (application) application.status = 'DISBURSED'
      save()
      return record
    },
  },
  { method: 'get', pattern: '/disbursements/:id', handle: ({ id }) => db.disbursements.find((item) => item.id === id) || fail(404, 'Disbursement not found') },
  {
    method: 'get',
    pattern: '/repayments/loans/:loanId/history',
    handle: ({ loanId }) => {
      const items = db.repayments.filter((item) => item.loanId === loanId)
      return { items, total: items.length }
    },
  },
  {
    method: 'get',
    pattern: '/repayments',
    handle(_params, _body, query) {
      return paginate(db.repayments, query)
    },
  },
  {
    method: 'post',
    pattern: '/repayments',
    handle(_params, body) {
      const application = db.applications.find((item) => item.id === body.loanId)
      const record = {
        id: nextId('r'),
        customerName: application?.customerName || '',
        status: 'ON_TIME',
        ...body,
      }
      db.repayments.unshift(record)
      db.notifications.unshift({
        id: nextId('n'),
        type: 'User Repay',
        title: 'User Repay',
        message: `${record.customerName || 'Customer'} repaid $${Number(record.amount).toFixed(2)}`,
        createdAt: new Date().toISOString(),
        read: false,
      })
      save()
      return record
    },
  },
  { method: 'get', pattern: '/repayments/:id', handle: ({ id }) => db.repayments.find((item) => item.id === id) || fail(404, 'Repayment not found') },
  { method: 'get', pattern: '/reports/overview', handle: () => summary() },
  {
    method: 'get',
    pattern: '/reports/loan-applications',
    handle(_params, _body, query) {
      const items = db.applications.filter((item) => inPeriod(item.createdAt, query))
      return { items, total: items.length }
    },
  },
  {
    method: 'get',
    pattern: '/reports/loans/approved',
    handle(_params, _body, query) {
      const items = db.applications.filter((item) => ['APPROVED', 'DISBURSED', 'ACTIVE', 'OVERDUE'].includes(item.status) && inPeriod(item.approvedAt || item.createdAt, query))
      return { items, total: items.length }
    },
  },
  {
    method: 'get',
    pattern: '/reports/loans/rejected',
    handle(_params, _body, query) {
      const items = db.applications.filter((item) => item.status === 'REJECTED' && inPeriod(item.rejectedAt || item.createdAt, query))
      return { items, total: items.length }
    },
  },
  {
    method: 'get',
    pattern: '/reports/repayments',
    handle(_params, _body, query) {
      const items = db.repayments.filter((item) => inPeriod(item.paidAt, query))
      return { items, total: items.length }
    },
  },
  {
    method: 'get',
    pattern: '/reports/customers',
    handle(_params, _body, query) {
      const items = db.customers.filter((item) => inPeriod(item.createdAt, query))
      return { items, total: items.length }
    },
  },
  {
    method: 'get',
    pattern: '/reports/portfolio',
    handle(_params, _body, query) {
      const active = db.applications.filter((item) => ['ACTIVE', 'DISBURSED', 'APPROVED', 'OVERDUE'].includes(item.status))
      const collected = db.repayments.filter((item) => inPeriod(item.paidAt, query))
      return {
        outstandingPrincipal: active.reduce((sum, item) => sum + Number(item.approvedAmount || item.amount || 0), 0),
        activeLoans: active.length,
        overdueLoans: db.applications.filter((item) => item.status === 'OVERDUE').length,
        collected: collected.reduce((sum, item) => sum + Number(item.amount || 0), 0),
      }
    },
  },
  {
    method: 'get',
    pattern: '/notifications/unread-count',
    handle: () => ({ count: db.notifications.filter((item) => !item.read).length }),
  },
  {
    method: 'get',
    pattern: '/notifications',
    handle(_params, _body, query) {
      const items = [...db.notifications].sort((a, b) => dayjs(b.createdAt).valueOf() - dayjs(a.createdAt).valueOf())
      return paginate(items, query)
    },
  },
  {
    method: 'post',
    pattern: '/notifications/:id/read',
    handle({ id }) {
      const item = db.notifications.find((entry) => entry.id === id)
      if (item) item.read = true
      save()
      return item || {}
    },
  },
  {
    method: 'get',
    pattern: '/messages/conversations',
    handle: () => ({
      items: db.conversations.map((item) => ({
        id: item.userId,
        userId: item.userId,
        name: item.name,
        lastMessage: conversationPreview(item),
      })),
      total: db.conversations.length,
    }),
  },
  {
    method: 'delete',
    pattern: '/messages/conversations/:userId/:messageId',
    handle({ userId, messageId }) {
      const conversation = db.conversations.find((item) => item.userId === userId)
      const message = conversation?.messages.find((item) => item.id === messageId)
      if (message) {
        message.deleted = true
        message.text = ''
        message.fileName = ''
      }
      save()
      return {}
    },
  },
  {
    method: 'post',
    pattern: '/messages/conversations/:userId',
    handle({ userId }, body) {
      let conversation = db.conversations.find((item) => item.userId === userId)
      if (!conversation) {
        const customer = db.customers.find((item) => item.id === userId)
        conversation = { userId, name: customer?.name || 'Customer', messages: [] }
        db.conversations.unshift(conversation)
      }
      const file = body instanceof FormData ? body.get('file') : null
      const text = body instanceof FormData ? body.get('text') : body.text
      conversation.messages.push({
        id: nextId('m'),
        sender: 'admin',
        text: text || '',
        fileName: file?.name || '',
        createdAt: new Date().toISOString(),
      })
      save()
      return conversation.messages.at(-1)
    },
  },
  {
    method: 'get',
    pattern: '/messages/conversations/:userId',
    handle({ userId }) {
      const conversation = db.conversations.find((item) => item.userId === userId)
      const customer = db.customers.find((item) => item.id === userId)
      return {
        customer: customer || { id: userId, name: conversation?.name },
        messages: conversation?.messages || [],
      }
    },
  },
  {
    method: 'get',
    pattern: '/users',
    handle(_params, _body, query) {
      return paginate(db.staff.map(publicStaff), query)
    },
  },
  {
    method: 'post',
    pattern: '/users',
    handle(_params, body) {
      const record = { id: nextId('staff'), name: body.name, email: body.email, role: body.role, password: body.password }
      db.staff.push(record)
      save()
      return publicStaff(record)
    },
  },
  { method: 'get', pattern: '/users/:id', handle: ({ id }) => publicStaff(db.staff.find((item) => item.id === id)) || fail(404, 'User not found') },
]

function matchRoute(method, path) {
  for (const route of routes) {
    if (route.method !== method) continue
    const names = []
    const expression = new RegExp(`^${route.pattern.replace(/:([A-Za-z]+)/g, (_, name) => {
      names.push(name)
      return '([^/]+)'
    })}$`)
    const found = path.match(expression)
    if (!found) continue
    const params = {}
    names.forEach((name, index) => {
      params[name] = decodeURIComponent(found[index + 1])
    })
    return { route, params }
  }
  return null
}

export function localAdapter(config) {
  const method = String(config.method || 'get').toLowerCase()
  const path = String(config.url || '').split('?')[0].replace(/\/$/, '') || '/'
  const matched = matchRoute(method, path)

  try {
    if (!matched) fail(404, `No browser data for ${method.toUpperCase()} ${path}`)
    if (matched.route.auth !== false) requireUser(config)
    const data = matched.route.handle(matched.params, parseBody(config.data), config.params || {})
    return Promise.resolve({
      data,
      status: 200,
      statusText: 'OK',
      headers: {},
      config,
    })
  } catch (error) {
    error.config = config
    if (!error.response) error.response = { status: 500, data: { message: error.message } }
    return Promise.reject(error)
  }
}
