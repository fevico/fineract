import { Injectable, NotFoundException } from '@nestjs/common'

@Injectable()
export class LoansService {

  private loanProducts = [
    {
      id: 1, name: 'Personal Loan', shortName: 'PL',
      description: 'Unsecured personal loan for individuals',
      currency: { code: 'NGN', name: 'Nigerian Naira', decimalPlaces: 2 },
      principal: 500000, minPrincipal: 50000, maxPrincipal: 5000000,
      numberOfRepayments: 12, minNumberOfRepayments: 3, maxNumberOfRepayments: 36,
      repaymentEvery: 1, repaymentFrequencyType: { id: 2, value: 'Months' },
      interestRatePerPeriod: 3.5, minInterestRatePerPeriod: 1, maxInterestRatePerPeriod: 10,
      interestRateFrequencyType: { id: 2, value: 'Per month' },
      amortizationType: { id: 1, value: 'Equal installments' },
      interestType: { id: 1, value: 'Flat' },
      interestCalculationPeriodType: { id: 1, value: 'Same as repayment period' },
      inArrearsTolerance: 0, daysInYearType: { id: 365, value: '365' },
      accountingRule: { id: 2, value: 'Upfront Accrual' },
      status: 'loanProduct.active',
    },
    {
      id: 2, name: 'Business Loan', shortName: 'BL',
      description: 'Secured business loan for SMEs',
      currency: { code: 'NGN', name: 'Nigerian Naira', decimalPlaces: 2 },
      principal: 2000000, minPrincipal: 200000, maxPrincipal: 50000000,
      numberOfRepayments: 24, minNumberOfRepayments: 6, maxNumberOfRepayments: 60,
      repaymentEvery: 1, repaymentFrequencyType: { id: 2, value: 'Months' },
      interestRatePerPeriod: 2.5, minInterestRatePerPeriod: 1, maxInterestRatePerPeriod: 8,
      interestRateFrequencyType: { id: 2, value: 'Per month' },
      amortizationType: { id: 1, value: 'Equal installments' },
      interestType: { id: 0, value: 'Declining Balance' },
      interestCalculationPeriodType: { id: 1, value: 'Same as repayment period' },
      inArrearsTolerance: 0, daysInYearType: { id: 365, value: '365' },
      accountingRule: { id: 2, value: 'Upfront Accrual' },
      status: 'loanProduct.active',
    },
    {
      id: 3, name: 'Emergency Loan', shortName: 'EL',
      description: 'Fast disbursement emergency loan',
      currency: { code: 'NGN', name: 'Nigerian Naira', decimalPlaces: 2 },
      principal: 100000, minPrincipal: 10000, maxPrincipal: 500000,
      numberOfRepayments: 3, minNumberOfRepayments: 1, maxNumberOfRepayments: 6,
      repaymentEvery: 1, repaymentFrequencyType: { id: 2, value: 'Months' },
      interestRatePerPeriod: 5, minInterestRatePerPeriod: 3, maxInterestRatePerPeriod: 10,
      interestRateFrequencyType: { id: 2, value: 'Per month' },
      amortizationType: { id: 1, value: 'Equal installments' },
      interestType: { id: 1, value: 'Flat' },
      interestCalculationPeriodType: { id: 1, value: 'Same as repayment period' },
      inArrearsTolerance: 0, daysInYearType: { id: 365, value: '365' },
      accountingRule: { id: 1, value: 'None' },
      status: 'loanProduct.active',
    },
  ]

  private loans = [
    {
      id: 1, accountNo: 'LN-000001', externalId: null,
      clientId: 1, clientName: 'Amara Okafor', clientOfficeId: 1,
      loanProductId: 1, loanProductName: 'Personal Loan',
      status: { id: 300, code: 'loanStatusType.active', value: 'Active', pendingApproval: false, waitingForDisbursal: false, active: true, closed: false, closedWrittenOff: false },
      loanType: { id: 1, code: 'loanType.individual', value: 'Individual' },
      currency: { code: 'NGN', name: 'Nigerian Naira', decimalPlaces: 2 },
      principal: 500000, approvedPrincipal: 500000, proposedPrincipal: 500000,
      numberOfRepayments: 12, repaymentEvery: 1,
      repaymentFrequencyType: { id: 2, value: 'Months' },
      interestRatePerPeriod: 3.5,
      interestType: { id: 1, value: 'Flat' },
      amortizationType: { id: 1, value: 'Equal installments' },
      submittedOnDate: '2024-11-01', approvedOnDate: '2024-11-03',
      expectedDisbursementDate: '2024-11-05', actualDisbursementDate: '2024-11-05',
      expectedFirstRepaymentOnDate: '2024-12-05',
      totalExpectedRepayment: 710000, totalRepayment: 295833, totalOutstanding: 414167,
      totalInterestCharged: 210000, totalFeeChargesCharged: 0, totalPenaltyChargesCharged: 0,
      inArrears: false, isNPA: false,
      officeName: 'Head Office', staffName: 'Chidi Nwosu',
      timeline: { submittedOnDate: [2024,11,1], approvedOnDate: [2024,11,3], disbursedOnDate: [2024,11,5] },
    },
    {
      id: 2, accountNo: 'LN-000002', externalId: null,
      clientId: 2, clientName: 'Emeka Eze', clientOfficeId: 1,
      loanProductId: 2, loanProductName: 'Business Loan',
      status: { id: 200, code: 'loanStatusType.approved', value: 'Approved', pendingApproval: false, waitingForDisbursal: true, active: false, closed: false, closedWrittenOff: false },
      loanType: { id: 1, code: 'loanType.individual', value: 'Individual' },
      currency: { code: 'NGN', name: 'Nigerian Naira', decimalPlaces: 2 },
      principal: 2000000, approvedPrincipal: 2000000, proposedPrincipal: 2000000,
      numberOfRepayments: 24, repaymentEvery: 1,
      repaymentFrequencyType: { id: 2, value: 'Months' },
      interestRatePerPeriod: 2.5,
      interestType: { id: 0, value: 'Declining Balance' },
      amortizationType: { id: 1, value: 'Equal installments' },
      submittedOnDate: '2025-01-10', approvedOnDate: '2025-01-14',
      expectedDisbursementDate: '2025-01-20', actualDisbursementDate: null,
      totalExpectedRepayment: 3200000, totalRepayment: 0, totalOutstanding: 2000000,
      totalInterestCharged: 1200000, totalFeeChargesCharged: 0, totalPenaltyChargesCharged: 0,
      inArrears: false, isNPA: false,
      officeName: 'Head Office', staffName: 'Chidi Nwosu',
      timeline: { submittedOnDate: [2025,1,10], approvedOnDate: [2025,1,14] },
    },
    {
      id: 3, accountNo: 'LN-000003', externalId: null,
      clientId: 3, clientName: 'Fatima Bello', clientOfficeId: 2,
      loanProductId: 1, loanProductName: 'Personal Loan',
      status: { id: 100, code: 'loanStatusType.submittedAndPendingApproval', value: 'Pending Approval', pendingApproval: true, waitingForDisbursal: false, active: false, closed: false, closedWrittenOff: false },
      loanType: { id: 1, code: 'loanType.individual', value: 'Individual' },
      currency: { code: 'NGN', name: 'Nigerian Naira', decimalPlaces: 2 },
      principal: 300000, approvedPrincipal: null, proposedPrincipal: 300000,
      numberOfRepayments: 6, repaymentEvery: 1,
      repaymentFrequencyType: { id: 2, value: 'Months' },
      interestRatePerPeriod: 3.5,
      interestType: { id: 1, value: 'Flat' },
      amortizationType: { id: 1, value: 'Equal installments' },
      submittedOnDate: '2025-02-01', approvedOnDate: null,
      expectedDisbursementDate: '2025-02-10', actualDisbursementDate: null,
      totalExpectedRepayment: 363000, totalRepayment: 0, totalOutstanding: 300000,
      totalInterestCharged: 63000, totalFeeChargesCharged: 0, totalPenaltyChargesCharged: 0,
      inArrears: false, isNPA: false,
      officeName: 'Lagos Branch', staffName: 'Ngozi Adeyemi',
      timeline: { submittedOnDate: [2025,2,1] },
    },
    {
      id: 4, accountNo: 'LN-000004', externalId: null,
      clientId: 4, clientName: 'Ngozi Adeyemi', clientOfficeId: 1,
      loanProductId: 3, loanProductName: 'Emergency Loan',
      status: { id: 600, code: 'loanStatusType.closed', value: 'Closed', pendingApproval: false, waitingForDisbursal: false, active: false, closed: true, closedWrittenOff: false },
      loanType: { id: 1, code: 'loanType.individual', value: 'Individual' },
      currency: { code: 'NGN', name: 'Nigerian Naira', decimalPlaces: 2 },
      principal: 100000, approvedPrincipal: 100000, proposedPrincipal: 100000,
      numberOfRepayments: 3, repaymentEvery: 1,
      repaymentFrequencyType: { id: 2, value: 'Months' },
      interestRatePerPeriod: 5,
      interestType: { id: 1, value: 'Flat' },
      amortizationType: { id: 1, value: 'Equal installments' },
      submittedOnDate: '2024-08-01', approvedOnDate: '2024-08-02',
      expectedDisbursementDate: '2024-08-03', actualDisbursementDate: '2024-08-03',
      expectedFirstRepaymentOnDate: '2024-09-03',
      totalExpectedRepayment: 115000, totalRepayment: 115000, totalOutstanding: 0,
      totalInterestCharged: 15000, totalFeeChargesCharged: 0, totalPenaltyChargesCharged: 0,
      inArrears: false, isNPA: false,
      officeName: 'Head Office', staffName: 'Chidi Nwosu',
      timeline: { submittedOnDate: [2024,8,1], approvedOnDate: [2024,8,2], disbursedOnDate: [2024,8,3], closedOnDate: [2024,11,3] },
    },
  ]

  private loanTransactions: Record<number, any[]> = {
    1: [
      { id: 1, type: { id: 1, code: 'loanTransactionType.disbursement', value: 'Disbursement' }, date: '2024-11-05', amount: 500000, principal: 500000, interest: 0, fees: 0, penalties: 0, outstanding: 500000 },
      { id: 2, type: { id: 2, code: 'loanTransactionType.repayment',    value: 'Repayment' },    date: '2024-12-05', amount: 59167,  principal: 41667,  interest: 17500, fees: 0, penalties: 0, outstanding: 458333 },
      { id: 3, type: { id: 2, code: 'loanTransactionType.repayment',    value: 'Repayment' },    date: '2025-01-05', amount: 59167,  principal: 41667,  interest: 17500, fees: 0, penalties: 0, outstanding: 416666 },
      { id: 4, type: { id: 2, code: 'loanTransactionType.repayment',    value: 'Repayment' },    date: '2025-02-05', amount: 59167,  principal: 41666,  interest: 17500, fees: 0, penalties: 0, outstanding: 375000 },
    ],
    4: [
      { id: 5, type: { id: 1, code: 'loanTransactionType.disbursement', value: 'Disbursement' }, date: '2024-08-03', amount: 100000, principal: 100000, interest: 0,    fees: 0, penalties: 0, outstanding: 100000 },
      { id: 6, type: { id: 2, code: 'loanTransactionType.repayment',    value: 'Repayment' },    date: '2024-09-03', amount: 38333,  principal: 33333,  interest: 5000,  fees: 0, penalties: 0, outstanding: 66667  },
      { id: 7, type: { id: 2, code: 'loanTransactionType.repayment',    value: 'Repayment' },    date: '2024-10-03', amount: 38333,  principal: 33333,  interest: 5000,  fees: 0, penalties: 0, outstanding: 33334  },
      { id: 8, type: { id: 2, code: 'loanTransactionType.repayment',    value: 'Repayment' },    date: '2024-11-03', amount: 38334,  principal: 33334,  interest: 5000,  fees: 0, penalties: 0, outstanding: 0      },
    ],
  }

  private nextLoanId = 5
  private nextTxnId = 9

  // ── Loans CRUD ─────────────────────────────────────────────────────
  getLoans(filters: any) {
    let loans = [...this.loans]
    if (filters.clientId) loans = loans.filter(l => l.clientId === +filters.clientId)
    if (filters.officeId) loans = loans.filter(l => l.clientOfficeId === +filters.officeId)
    if (filters.status) {
      const statusMap: Record<string, number> = {
        active: 300, approved: 200, pendingApproval: 100, closed: 600, writtenOff: 601,
      }
      const statusId = statusMap[filters.status]
      if (statusId) loans = loans.filter(l => l.status.id === statusId)
    }
    return { totalFilteredRecords: loans.length, pageItems: loans }
  }

  getLoanById(id: number) {
    const loan = this.loans.find(l => l.id === id)
    if (!loan) throw new NotFoundException(`Loan ${id} not found`)
    return loan
  }

  createLoan(body: any) {
    const loan: any = {
      id: this.nextLoanId++,
      accountNo: `LN-${String(this.nextLoanId).padStart(6, '0')}`,
      clientId: body.clientId, clientName: body.clientName || 'Unknown',
      loanProductId: body.productId, loanProductName: '',
      status: { id: 100, code: 'loanStatusType.submittedAndPendingApproval', value: 'Pending Approval', pendingApproval: true, waitingForDisbursal: false, active: false, closed: false, closedWrittenOff: false },
      currency: { code: 'NGN', name: 'Nigerian Naira', decimalPlaces: 2 },
      principal: body.principal, proposedPrincipal: body.principal, approvedPrincipal: null,
      numberOfRepayments: body.numberOfRepayments, repaymentEvery: body.repaymentEvery || 1,
      repaymentFrequencyType: { id: 2, value: 'Months' },
      interestRatePerPeriod: body.interestRatePerPeriod,
      submittedOnDate: body.submittedOnDate || new Date().toISOString().split('T')[0],
      approvedOnDate: null, actualDisbursementDate: null,
      totalRepayment: 0, totalOutstanding: body.principal,
      inArrears: false, isNPA: false,
    }
    this.loans.push(loan)
    return { officeId: 1, clientId: body.clientId, loanId: loan.id, resourceId: loan.id }
  }

  executeCommand(id: number, command: string, body: any) {
    const loan = this.loans.find(l => l.id === id)
    if (!loan) throw new NotFoundException(`Loan ${id} not found`)

    switch (command) {
      case 'approve':
        loan.status = { id: 200, code: 'loanStatusType.approved', value: 'Approved', pendingApproval: false, waitingForDisbursal: true, active: false, closed: false, closedWrittenOff: false }
        ;(loan as any).approvedOnDate = body.approvedOnDate || new Date().toISOString().split('T')[0]
        ;(loan as any).approvedPrincipal = body.approvedLoanAmount || loan.principal
        break
      case 'reject':
        loan.status = { id: 500, code: 'loanStatusType.rejected', value: 'Rejected', pendingApproval: false, waitingForDisbursal: false, active: false, closed: true, closedWrittenOff: false }
        break
      case 'withdrawn':
        loan.status = { id: 400, code: 'loanStatusType.withdrawn', value: 'Withdrawn by applicant', pendingApproval: false, waitingForDisbursal: false, active: false, closed: true, closedWrittenOff: false }
        break
      case 'disburse':
        loan.status = { id: 300, code: 'loanStatusType.active', value: 'Active', pendingApproval: false, waitingForDisbursal: false, active: true, closed: false, closedWrittenOff: false }
        ;(loan as any).actualDisbursementDate = body.actualDisbursementDate || new Date().toISOString().split('T')[0]
        if (!this.loanTransactions[id]) this.loanTransactions[id] = []
        this.loanTransactions[id].push({
          id: this.nextTxnId++, type: { id: 1, code: 'loanTransactionType.disbursement', value: 'Disbursement' },
          date: body.actualDisbursementDate, amount: loan.principal, principal: loan.principal, interest: 0, fees: 0, penalties: 0,
        })
        break
      case 'undoapproval':
        loan.status = { id: 100, code: 'loanStatusType.submittedAndPendingApproval', value: 'Pending Approval', pendingApproval: true, waitingForDisbursal: false, active: false, closed: false, closedWrittenOff: false }
        ;(loan as any).approvedOnDate = null
        break
      case 'writeoff':
        loan.status = { id: 601, code: 'loanStatusType.closedWrittenOff', value: 'Written-Off', pendingApproval: false, waitingForDisbursal: false, active: false, closed: true, closedWrittenOff: true }
        break
      case 'close':
        loan.status = { id: 600, code: 'loanStatusType.closed', value: 'Closed', pendingApproval: false, waitingForDisbursal: false, active: false, closed: true, closedWrittenOff: false }
        break
    }
    return { officeId: 1, clientId: loan.clientId, loanId: id, resourceId: id, changes: { status: loan.status.value } }
  }

  getRepaymentSchedule(id: number) {
    const loan = this.loans.find(l => l.id === id)
    if (!loan) throw new NotFoundException(`Loan ${id} not found`)
    const periods = [] as any;
    const monthly = Math.round(loan.principal / loan.numberOfRepayments)
    const interest = Math.round((loan.principal * (loan as any).interestRatePerPeriod) / 100)
    for (let i = 1; i <= loan.numberOfRepayments; i++) {
      periods.push({
        period: i,
        fromDate: [2024, 11, 5], dueDate: [2024, 11 + i, 5],
        principalDue: monthly, interestDue: interest, totalDue: monthly + interest,
        principalPaid: i <= 3 ? monthly : 0, interestPaid: i <= 3 ? interest : 0,
        totalPaid: i <= 3 ? monthly + interest : 0,
        complete: i <= 3,
      })
    }
    return { currency: { code: 'NGN' }, periods, loanId: id }
  }

  getLoanTransactions(id: number) {
    return this.loanTransactions[id] || []
  }

  postLoanTransaction(id: number, command: string, body: any) {
    if (!this.loanTransactions[id]) this.loanTransactions[id] = []
    const txn = {
      id: this.nextTxnId++,
      type: { id: 2, code: `loanTransactionType.${command}`, value: command },
      date: body.transactionDate, amount: body.transactionAmount,
      principal: body.transactionAmount, interest: 0, fees: 0, penalties: 0,
    }
    this.loanTransactions[id].push(txn)
    return { officeId: 1, clientId: id, loanId: id, resourceId: txn.id, changes: { transactionAmount: body.transactionAmount } }
  }

  // ── Loan Products ──────────────────────────────────────────────────
  getLoanProducts() { return this.loanProducts }
  getLoanProductById(id: number) { return this.loanProducts.find(p => p.id === id) || null }
  createLoanProduct(body: any) {
    const product = { id: this.loanProducts.length + 1, ...body }
    this.loanProducts.push(product as any)
    return { resourceId: product.id }
  }
  updateLoanProduct(id: number, body: any) {
    const idx = this.loanProducts.findIndex(p => p.id === id)
    if (idx > -1) this.loanProducts[idx] = { ...this.loanProducts[idx], ...body }
    return { resourceId: id, changes: body }
  }

  // ── Loan Calculator ────────────────────────────────────────────────
  calculateLoanSchedule(body: any) {
    const { principal, numberOfRepayments, interestRatePerPeriod } = body
    const monthly = Math.round(principal / numberOfRepayments)
    const interest = Math.round((principal * interestRatePerPeriod) / 100)
    const periods = Array.from({ length: numberOfRepayments }, (_, i) => ({
      period: i + 1,
      principalDue: monthly,
      interestDue: interest,
      totalDue: monthly + interest,
    }))
    return {
      currency: { code: 'NGN' },
      loanTermInDays: numberOfRepayments * 30,
      totalPrincipalDisbursed: principal,
      totalPrincipalExpected: principal,
      totalInterestCharged: interest * numberOfRepayments,
      totalRepaymentExpected: (monthly + interest) * numberOfRepayments,
      periods,
    }
  }
}