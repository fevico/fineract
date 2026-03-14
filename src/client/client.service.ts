import { Injectable, NotFoundException } from '@nestjs/common'

@Injectable()
export class ClientsService {
  private clients = [
    {
      id: 1, accountNo: 'CLI-000001', externalId: null,
      status: { id: 300, code: 'clientStatusType.active', value: 'Active' },
      active: true, activationDate: [2024, 1, 15],
      firstname: 'Amara', middlename: null, lastname: 'Okafor',
      displayName: 'Amara Okafor', fullname: null,
      officeId: 1, officeName: 'Head Office',
      staffId: 2, staffName: 'Chidi Nwosu',
      legalForm: { id: 1, code: 'legalFormType.person', value: 'PERSON' },
      mobileNo: '08012345678', emailAddress: 'amara.okafor@email.com',
      dateOfBirth: [1990, 5, 14],
      gender: { id: 2, code: 'gender.female', value: 'Female' },
      clientType: { id: 1, code: 'CLIENT_TYPE', value: 'Individual' },
      nationality: 'Nigerian',
      submittedOnDate: [2024, 1, 10], submittedByUsername: 'mifos',
      isStaff: false,
    },
    {
      id: 2, accountNo: 'CLI-000002', externalId: null,
      status: { id: 300, code: 'clientStatusType.active', value: 'Active' },
      active: true, activationDate: [2024, 2, 1],
      firstname: 'Emeka', middlename: null, lastname: 'Eze',
      displayName: 'Emeka Eze', fullname: null,
      officeId: 1, officeName: 'Head Office',
      staffId: 2, staffName: 'Chidi Nwosu',
      legalForm: { id: 1, code: 'legalFormType.person', value: 'PERSON' },
      mobileNo: '08023456789', emailAddress: 'emeka.eze@email.com',
      dateOfBirth: [1985, 8, 22],
      gender: { id: 1, code: 'gender.male', value: 'Male' },
      clientType: { id: 1, code: 'CLIENT_TYPE', value: 'Individual' },
      nationality: 'Nigerian',
      submittedOnDate: [2024, 1, 28], submittedByUsername: 'mifos',
      isStaff: false,
    },
    {
      id: 3, accountNo: 'CLI-000003', externalId: null,
      status: { id: 300, code: 'clientStatusType.active', value: 'Active' },
      active: true, activationDate: [2024, 3, 5],
      firstname: 'Fatima', middlename: null, lastname: 'Bello',
      displayName: 'Fatima Bello', fullname: null,
      officeId: 2, officeName: 'Lagos Branch',
      staffId: 4, staffName: 'Ngozi Adeyemi',
      legalForm: { id: 1, code: 'legalFormType.person', value: 'PERSON' },
      mobileNo: '08034567890', emailAddress: 'fatima.bello@email.com',
      dateOfBirth: [1992, 3, 10],
      gender: { id: 2, code: 'gender.female', value: 'Female' },
      clientType: { id: 1, code: 'CLIENT_TYPE', value: 'Individual' },
      nationality: 'Nigerian',
      submittedOnDate: [2024, 2, 28], submittedByUsername: 'mifos',
      isStaff: false,
    },
    {
      id: 4, accountNo: 'CLI-000004', externalId: null,
      status: { id: 300, code: 'clientStatusType.active', value: 'Active' },
      active: true, activationDate: [2024, 4, 10],
      firstname: 'Ngozi', middlename: null, lastname: 'Adeyemi',
      displayName: 'Ngozi Adeyemi', fullname: null,
      officeId: 1, officeName: 'Head Office',
      staffId: 2, staffName: 'Chidi Nwosu',
      legalForm: { id: 1, code: 'legalFormType.person', value: 'PERSON' },
      mobileNo: '08045678901', emailAddress: 'ngozi.adeyemi@email.com',
      dateOfBirth: [1988, 11, 3],
      gender: { id: 2, code: 'gender.female', value: 'Female' },
      clientType: { id: 1, code: 'CLIENT_TYPE', value: 'Individual' },
      nationality: 'Nigerian',
      submittedOnDate: [2024, 4, 5], submittedByUsername: 'mifos',
      isStaff: false,
    },
    {
      id: 5, accountNo: 'CLI-000005', externalId: null,
      status: { id: 100, code: 'clientStatusType.pending', value: 'Pending' },
      active: false, activationDate: null,
      firstname: 'Tunde', middlename: null, lastname: 'Fashola',
      displayName: 'Tunde Fashola', fullname: null,
      officeId: 3, officeName: 'Abuja Branch',
      staffId: null, staffName: null,
      legalForm: { id: 1, code: 'legalFormType.person', value: 'PERSON' },
      mobileNo: '08056789012', emailAddress: null,
      dateOfBirth: [1995, 7, 19],
      gender: { id: 1, code: 'gender.male', value: 'Male' },
      clientType: { id: 1, code: 'CLIENT_TYPE', value: 'Individual' },
      nationality: 'Nigerian',
      submittedOnDate: [2025, 2, 5], submittedByUsername: 'mifos',
      isStaff: false,
    },
  ]

  private nextClientId = 6

  getClients(filters: any) {
    let clients = [...this.clients]
    if (filters.officeId) clients = clients.filter(c => c.officeId === +filters.officeId)
    if (filters.displayName) clients = clients.filter(c => c.displayName.toLowerCase().includes(filters.displayName.toLowerCase()))
    const total = clients.length
    clients = clients.slice(filters.offset, filters.offset + filters.limit)
    return { totalFilteredRecords: total, pageItems: clients }
  }

  getClientById(id: number) {
    const client = this.clients.find(c => c.id === id)
    if (!client) throw new NotFoundException(`Client ${id} not found`)
    return client
  }

  createClient(body: any) {
    const client: any = {
      id: this.nextClientId++,
      accountNo: `CLI-${String(this.nextClientId).padStart(6, '0')}`,
      status: { id: 100, code: 'clientStatusType.pending', value: 'Pending' },
      active: false,
      ...body,
      submittedOnDate: new Date().toISOString().split('T')[0],
    }
    this.clients.push(client)
    return { officeId: body.officeId, clientId: client.id, resourceId: client.id }
  }

  updateClient(id: number, body: any) {
    const idx = this.clients.findIndex(c => c.id === id)
    if (idx > -1) this.clients[idx] = { ...this.clients[idx], ...body }
    return { officeId: 1, clientId: id, resourceId: id, changes: body }
  }

  executeCommand(id: number, command: string, body: any) {
    const client = this.clients.find(c => c.id === id)
    if (!client) throw new NotFoundException(`Client ${id} not found`)
    if (command === 'activate') {
      client.status = { id: 300, code: 'clientStatusType.active', value: 'Active' }
      client.active = true
      client.activationDate = [new Date().getFullYear(), new Date().getMonth() + 1, new Date().getDate()]
    } else if (command === 'close') {
      client.status = { id: 600, code: 'clientStatusType.closed', value: 'Closed' }
      client.active = false
    }
    return { officeId: client.officeId, clientId: id, resourceId: id }
  }

  getClientAccounts(id: number) {
    return {
      loanAccounts: [
        { id: 1, accountNo: 'LN-000001', productId: 1, productName: 'Personal Loan', status: { id: 300, value: 'Active', active: true }, loanType: { id: 1, value: 'Individual' }, loanCycle: 1 },
      ],
      savingsAccounts: [
        { id: 1, accountNo: 'SV-000001', productId: 1, productName: 'Regular Savings', status: { id: 300, value: 'Active' } },
      ],
    }
  }

  getClientTransactions(id: number) {
    return {
      totalFilteredRecords: 3,
      pageItems: [
        { id: 1, type: { value: 'Deposit' }, date: [2025, 1, 15], amount: 500000, currency: { code: 'NGN' } },
        { id: 2, type: { value: 'Withdrawal' }, date: [2025, 1, 20], amount: 100000, currency: { code: 'NGN' } },
        { id: 3, type: { value: 'Deposit' }, date: [2025, 2, 1], amount: 250000, currency: { code: 'NGN' } },
      ],
    }
  }
}