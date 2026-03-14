import { Injectable } from '@nestjs/common'

@Injectable()
export class AccountingService {

  // ── Mock GL Accounts (Chart of Accounts) ──────────────────────────
  private glAccounts = [
    // ASSETS
    { id: 1, name: 'Cash and Cash Equivalents',  glCode: '100001', type: { id: 1, code: 'glAccountType.asset',     value: 'ASSET'     }, usage: { id: 1, code: 'glAccountUsage.detail', value: 'DETAIL' }, manualEntriesAllowed: true, disabled: false, description: 'Physical cash held at branches and vaults' },
    { id: 2, name: 'Loans Portfolio',            glCode: '100002', type: { id: 1, code: 'glAccountType.asset',     value: 'ASSET'     }, usage: { id: 1, code: 'glAccountUsage.detail', value: 'DETAIL' }, manualEntriesAllowed: false, disabled: false, description: 'Outstanding loan principal' },
    { id: 3, name: 'Interest Receivable',        glCode: '100003', type: { id: 1, code: 'glAccountType.asset',     value: 'ASSET'     }, usage: { id: 1, code: 'glAccountUsage.detail', value: 'DETAIL' }, manualEntriesAllowed: true,  disabled: false, description: 'Interest earned but not yet received' },
    { id: 4, name: 'Bank Account - GTBank',      glCode: '100004', type: { id: 1, code: 'glAccountType.asset',     value: 'ASSET'     }, usage: { id: 1, code: 'glAccountUsage.detail', value: 'DETAIL' }, manualEntriesAllowed: true,  disabled: false, description: 'Nostro account at GTBank' },
    // LIABILITIES
    { id: 5, name: 'Customer Deposits',          glCode: '200001', type: { id: 2, code: 'glAccountType.liability', value: 'LIABILITY' }, usage: { id: 1, code: 'glAccountUsage.detail', value: 'DETAIL' }, manualEntriesAllowed: false, disabled: false, description: 'All customer deposit accounts' },
    { id: 6, name: 'Interest Payable',           glCode: '200002', type: { id: 2, code: 'glAccountType.liability', value: 'LIABILITY' }, usage: { id: 1, code: 'glAccountUsage.detail', value: 'DETAIL' }, manualEntriesAllowed: true,  disabled: false, description: 'Interest owed to depositors' },
    // EQUITY
    { id: 7, name: 'Share Capital',              glCode: '300001', type: { id: 3, code: 'glAccountType.equity',    value: 'EQUITY'    }, usage: { id: 1, code: 'glAccountUsage.detail', value: 'DETAIL' }, manualEntriesAllowed: true,  disabled: false, description: 'Paid-up share capital' },
    { id: 8, name: 'Retained Earnings',          glCode: '300002', type: { id: 3, code: 'glAccountType.equity',    value: 'EQUITY'    }, usage: { id: 1, code: 'glAccountUsage.detail', value: 'DETAIL' }, manualEntriesAllowed: true,  disabled: false, description: 'Accumulated retained earnings' },
    // INCOME
    { id: 9, name: 'Interest Income on Loans',   glCode: '400001', type: { id: 4, code: 'glAccountType.income',    value: 'INCOME'    }, usage: { id: 1, code: 'glAccountUsage.detail', value: 'DETAIL' }, manualEntriesAllowed: false, disabled: false, description: 'Interest earned from loan portfolio' },
    { id: 10, name: 'Fee Income',                glCode: '400002', type: { id: 4, code: 'glAccountType.income',    value: 'INCOME'    }, usage: { id: 1, code: 'glAccountUsage.detail', value: 'DETAIL' }, manualEntriesAllowed: true,  disabled: false, description: 'Processing fees, maintenance fees' },
    { id: 11, name: 'Commission Income',         glCode: '400003', type: { id: 4, code: 'glAccountType.income',    value: 'INCOME'    }, usage: { id: 1, code: 'glAccountUsage.detail', value: 'DETAIL' }, manualEntriesAllowed: true,  disabled: false, description: 'Transfer commissions and agency commissions' },
    // EXPENSES
    { id: 12, name: 'Salaries and Wages',        glCode: '500001', type: { id: 5, code: 'glAccountType.expense',   value: 'EXPENSE'   }, usage: { id: 1, code: 'glAccountUsage.detail', value: 'DETAIL' }, manualEntriesAllowed: true,  disabled: false, description: 'Staff salaries and wages' },
    { id: 13, name: 'Rent and Utilities',        glCode: '500002', type: { id: 5, code: 'glAccountType.expense',   value: 'EXPENSE'   }, usage: { id: 1, code: 'glAccountUsage.detail', value: 'DETAIL' }, manualEntriesAllowed: true,  disabled: false, description: 'Office rent and utility bills' },
    { id: 14, name: 'Loan Loss Provision',       glCode: '500003', type: { id: 5, code: 'glAccountType.expense',   value: 'EXPENSE'   }, usage: { id: 1, code: 'glAccountUsage.detail', value: 'DETAIL' }, manualEntriesAllowed: true,  disabled: false, description: 'Provision for bad and doubtful debts' },
  ]

  // ── Mock Journal Entries ───────────────────────────────────────────
  private journalEntries = [
    {
      id: 1, transactionId: 'TXN-GL-001', officeId: 1, officeName: 'Head Office',
      glAccount: { id: 1, name: 'Cash and Cash Equivalents', glCode: '100001' },
      entryType: { id: 2, code: 'journalEntryType.credit', value: 'CREDIT' },
      amount: 500000, currency: { code: 'NGN', name: 'Nigerian Naira' },
      transactionDate: '2025-01-15', submittedOnDate: '2025-01-15',
      referenceNumber: 'REF-001', comments: 'Customer deposit - Amara Okafor',
      reversed: false, manualEntry: false,
    },
    {
      id: 2, transactionId: 'TXN-GL-001', officeId: 1, officeName: 'Head Office',
      glAccount: { id: 5, name: 'Customer Deposits', glCode: '200001' },
      entryType: { id: 1, code: 'journalEntryType.debit', value: 'DEBIT' },
      amount: 500000, currency: { code: 'NGN', name: 'Nigerian Naira' },
      transactionDate: '2025-01-15', submittedOnDate: '2025-01-15',
      referenceNumber: 'REF-001', comments: 'Customer deposit - Amara Okafor',
      reversed: false, manualEntry: false,
    },
    {
      id: 3, transactionId: 'TXN-GL-002', officeId: 1, officeName: 'Head Office',
      glAccount: { id: 9, name: 'Interest Income on Loans', glCode: '400001' },
      entryType: { id: 1, code: 'journalEntryType.debit', value: 'DEBIT' },
      amount: 125000, currency: { code: 'NGN', name: 'Nigerian Naira' },
      transactionDate: '2025-01-31', submittedOnDate: '2025-01-31',
      referenceNumber: 'REF-002', comments: 'Monthly interest posting',
      reversed: false, manualEntry: false,
    },
  ]

  private nextJournalId = 4
  private nextGlId = 15

  // ── GL Accounts ────────────────────────────────────────────────────
  getGlAccounts(type?: string) {
    if (type) return this.glAccounts.filter(a => a.type.value === type.toUpperCase())
    return this.glAccounts
  }

  getGlAccountById(id: number) {
    return this.glAccounts.find(a => a.id === id) || null
  }

  createGlAccount(body: any) {
    const account = { id: this.nextGlId++, ...body, disabled: false }
    this.glAccounts.push(account)
    return { resourceId: account.id }
  }

  updateGlAccount(id: number, body: any) {
    const idx = this.glAccounts.findIndex(a => a.id === id)
    if (idx > -1) this.glAccounts[idx] = { ...this.glAccounts[idx], ...body }
    return { resourceId: id, changes: body }
  }

  // ── Journal Entries ────────────────────────────────────────────────
  getJournalEntries(filters: any) {
    let entries = [...this.journalEntries]
    if (filters.glAccountId) entries = entries.filter(e => e.glAccount.id === +filters.glAccountId)
    if (filters.officeId)    entries = entries.filter(e => e.officeId === +filters.officeId)
    return { totalFilteredRecords: entries.length, pageItems: entries }
  }

  createJournalEntry(body: any) {
    // body should have: officeId, credits: [{glAccountId, amount}], debits: [{glAccountId, amount}]
    const transactionId = `TXN-GL-${String(this.nextJournalId).padStart(3, '0')}`
    const entries = [
      ...(body.credits || []).map((c: any) => ({
        id: this.nextJournalId++,
        transactionId,
        officeId: body.officeId,
        glAccount: this.glAccounts.find(a => a.id === c.glAccountId),
        entryType: { id: 2, code: 'journalEntryType.credit', value: 'CREDIT' },
        amount: c.amount,
        currency: { code: 'NGN', name: 'Nigerian Naira' },
        transactionDate: body.transactionDate,
        submittedOnDate: new Date().toISOString().split('T')[0],
        comments: body.comments,
        reversed: false, manualEntry: true,
      })),
      ...(body.debits || []).map((d: any) => ({
        id: this.nextJournalId++,
        transactionId,
        officeId: body.officeId,
        glAccount: this.glAccounts.find(a => a.id === d.glAccountId),
        entryType: { id: 1, code: 'journalEntryType.debit', value: 'DEBIT' },
        amount: d.amount,
        currency: { code: 'NGN', name: 'Nigerian Naira' },
        transactionDate: body.transactionDate,
        submittedOnDate: new Date().toISOString().split('T')[0],
        comments: body.comments,
        reversed: false, manualEntry: true,
      })),
    ]
    this.journalEntries.push(...entries)
    return { transactionId }
  }

  reverseJournalEntry(id: number, body: any) {
    const entry = this.journalEntries.find(e => e.id === id)
    if (entry) entry.reversed = true
    return { transactionId: entry?.transactionId }
  }

  getAccountingRules() {
    return [
      { id: 1, name: 'Loan Disbursement', officeId: 1, debitAccount: { id: 2, name: 'Loans Portfolio' }, creditAccount: { id: 1, name: 'Cash and Cash Equivalents' } },
      { id: 2, name: 'Loan Repayment',    officeId: 1, debitAccount: { id: 1, name: 'Cash and Cash Equivalents' }, creditAccount: { id: 2, name: 'Loans Portfolio' } },
      { id: 3, name: 'Interest Accrual',  officeId: 1, debitAccount: { id: 3, name: 'Interest Receivable' }, creditAccount: { id: 9, name: 'Interest Income on Loans' } },
    ]
  }

  createAccountingRule(body: any) {
    return { resourceId: Math.floor(Math.random() * 1000) }
  }
}
