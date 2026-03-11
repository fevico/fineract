// prisma/seed.ts
import 'dotenv/config';
import * as bcrypt from 'bcryptjs';
import { PrismaMariaDb } from '@prisma/adapter-mariadb';
import { PrismaClient } from '../prisma/generated/client';

const url = new URL(process.env.DATABASE_URL!);

const adapter = new PrismaMariaDb({
  host: url.hostname,
  port: parseInt(url.port),
  user: url.username || 'root',
  password: url.password || undefined,
  database: url.pathname.slice(1),
  connectionLimit: 5,
});

const prisma = new PrismaClient({ adapter } as any);
async function main() {
  console.log('🌱 Seeding database...');

  // ── Users ──────────────────────────────────────────────
  const hashedPassword = await bcrypt.hash('password', 10);

  await prisma.user.upsert({
    where: { username: 'mifos' },
    update: {},
    create: {
      username: 'mifos',
      password: hashedPassword,
      firstname: 'App',
      lastname: 'Administrator',
      email: 'admin@mifos.org',
      officeId: 1,
      roles: [{ id: 1, name: 'Super user', description: 'This role provides all application permissions.' }],
      permissions: ['ALL_FUNCTIONS'],
    },
  });

  // ── Offices ────────────────────────────────────────────
  await prisma.office.upsert({
    where: { id: 1 },
    update: {},
    create: {
      id: 1,
      name: 'Head Office',
      nameDecorated: 'Head Office',
      openingDate: [2009, 1, 1],
      hierarchy: '.',
    },
  });

  await prisma.office.upsert({
    where: { id: 2 },
    update: {},
    create: {
      id: 2,
      name: 'Lagos Branch',
      nameDecorated: '. Lagos Branch',
      openingDate: [2020, 3, 15],
      hierarchy: '.2.',
      parentId: 1,
    },
  });

  await prisma.office.upsert({
    where: { id: 3 },
    update: {},
    create: {
      id: 3,
      name: 'Abuja Branch',
      nameDecorated: '. Abuja Branch',
      openingDate: [2021, 6, 1],
      hierarchy: '.3.',
      parentId: 1,
    },
  });

  // ── Clients ────────────────────────────────────────────
  const clients = [
    { id: 1, accountNo: '000000001', displayName: 'Amara Okafor', firstname: 'Amara', lastname: 'Okafor', officeId: 1, officeName: 'Head Office' },
    { id: 2, accountNo: '000000002', displayName: 'Chidi Nwosu', firstname: 'Chidi', lastname: 'Nwosu', officeId: 2, officeName: 'Lagos Branch' },
    { id: 3, accountNo: '000000003', displayName: 'Fatima Bello', firstname: 'Fatima', lastname: 'Bello', officeId: 2, officeName: 'Lagos Branch' },
    { id: 4, accountNo: '000000004', displayName: 'Emeka Eze', firstname: 'Emeka', lastname: 'Eze', officeId: 3, officeName: 'Abuja Branch' },
    { id: 5, accountNo: '000000005', displayName: 'Ngozi Adeyemi', firstname: 'Ngozi', lastname: 'Adeyemi', officeId: 1, officeName: 'Head Office' },
  ];

  const activeStatus = { id: 300, code: 'clientStatusType.active', value: 'Active', submittedAndPendingApproval: false, approved: false, rejected: false, withdrawnByApplicant: false, active: true, closed: false };

  for (const c of clients) {
    await prisma.client.upsert({
      where: { id: c.id },
      update: {},
      create: {
        ...c,
        status: activeStatus,
        active: true,
        activationDate: [2022, 1, 15],
        timeline: {
          submittedOnDate: [2022, 1, 10],
          activatedOnDate: [2022, 1, 15],
        },
      },
    });
  }

  // ── Loan Products ──────────────────────────────────────
  await prisma.loanProduct.upsert({
    where: { id: 1 },
    update: {},
    create: {
      id: 1,
      name: 'Personal Loan',
      shortName: 'PL01',
      description: 'Standard personal loan product',
      currency: { code: 'NGN', name: 'Nigerian Naira', decimalPlaces: 2, displaySymbol: '₦', nameCode: 'currency.NGN', displayLabel: 'Nigerian Naira (₦)' },
      principal: 100000,
    },
  });

  await prisma.loanProduct.upsert({
    where: { id: 2 },
    update: {},
    create: {
      id: 2,
      name: 'Business Loan',
      shortName: 'BL01',
      description: 'SME business loan',
      currency: { code: 'NGN', name: 'Nigerian Naira', decimalPlaces: 2, displaySymbol: '₦', nameCode: 'currency.NGN', displayLabel: 'Nigerian Naira (₦)' },
      principal: 500000,
    },
  });

  // ── Loans ──────────────────────────────────────────────
  const currency = { code: 'NGN', name: 'Nigerian Naira', decimalPlaces: 2, displaySymbol: '₦', nameCode: 'currency.NGN', displayLabel: 'Nigerian Naira (₦)' };

  const loanActiveStatus = { id: 300, code: 'loanStatusType.active', value: 'Active', pendingApproval: false, waitingForDisbursal: false, active: true, closedObligationsMet: false, closedWrittenOff: false, closedRescheduled: false, closed: false, overpaid: false };
  const loanApprovedStatus = { id: 200, code: 'loanStatusType.approved', value: 'Approved', pendingApproval: false, waitingForDisbursal: true, active: false, closed: false };

  await prisma.loan.upsert({
    where: { id: 1 },
    update: {},
    create: {
      id: 1,
      accountNo: 'LN000000001',
      status: loanActiveStatus,
      clientId: 1,
      clientName: 'Amara Okafor',
      clientAccountNo: '000000001',
      loanProductId: 1,
      loanProductName: 'Personal Loan',
      loanType: { id: 1, code: 'loanType.individual', value: 'Individual' },
      currency,
      principal: 150000,
      termFrequency: 12,
      timeline: { submittedOnDate: [2023, 3, 1], approvedOnDate: [2023, 3, 5], actualDisbursementDate: [2023, 3, 10] },
      summary: { principalDisbursed: 150000, principalPaid: 50000, principalOutstanding: 100000, interestCharged: 27000, interestPaid: 9000, interestOutstanding: 18000, totalExpectedRepayment: 177000, totalRepayment: 59000, totalOutstanding: 118000 },
    },
  });

  await prisma.loan.upsert({
    where: { id: 2 },
    update: {},
    create: {
      id: 2,
      accountNo: 'LN000000002',
      status: loanApprovedStatus,
      clientId: 2,
      clientName: 'Chidi Nwosu',
      clientAccountNo: '000000002',
      loanProductId: 2,
      loanProductName: 'Business Loan',
      loanType: { id: 1, code: 'loanType.individual', value: 'Individual' },
      currency,
      principal: 500000,
      termFrequency: 24,
      timeline: { submittedOnDate: [2024, 1, 10], approvedOnDate: [2024, 1, 15] },
      summary: { principalDisbursed: 0, principalOutstanding: 500000, totalExpectedRepayment: 590000, totalOutstanding: 590000 },
    },
  });

  await prisma.loan.upsert({
    where: { id: 3 },
    update: {},
    create: {
      id: 3,
      accountNo: 'LN000000003',
      status: loanActiveStatus,
      clientId: 3,
      clientName: 'Fatima Bello',
      clientAccountNo: '000000003',
      loanProductId: 1,
      loanProductName: 'Personal Loan',
      loanType: { id: 1, code: 'loanType.individual', value: 'Individual' },
      currency,
      principal: 80000,
      termFrequency: 6,
      timeline: { submittedOnDate: [2023, 11, 1], approvedOnDate: [2023, 11, 5], actualDisbursementDate: [2023, 11, 10] },
      summary: { principalDisbursed: 80000, principalPaid: 40000, principalOutstanding: 40000, interestCharged: 7200, interestPaid: 3600, interestOutstanding: 3600, totalExpectedRepayment: 87200, totalRepayment: 43600, totalOutstanding: 43600 },
    },
  });

  // ── Savings Accounts ───────────────────────────────────
  const savingsActiveStatus = { id: 300, code: 'savingsAccountStatusType.active', value: 'Active', submittedAndPendingApproval: false, approved: false, rejected: false, withdrawnByApplicant: false, active: true, closed: false };

  await prisma.savingsAccount.upsert({
    where: { id: 1 },
    update: {},
    create: {
      id: 1,
      accountNo: 'SV000000001',
      status: savingsActiveStatus,
      clientId: 1,
      clientName: 'Amara Okafor',
      savingsProductId: 1,
      savingsProductName: 'Regular Savings',
      currency,
      accountBalance: 45000,
      timeline: { submittedOnDate: [2022, 1, 15], activatedOnDate: [2022, 1, 15] },
    },
  });

  await prisma.savingsAccount.upsert({
    where: { id: 2 },
    update: {},
    create: {
      id: 2,
      accountNo: 'SV000000002',
      status: savingsActiveStatus,
      clientId: 2,
      clientName: 'Chidi Nwosu',
      savingsProductId: 1,
      savingsProductName: 'Regular Savings',
      currency,
      accountBalance: 120000,
      timeline: { submittedOnDate: [2022, 3, 20], activatedOnDate: [2022, 3, 20] },
    },
  });

  await prisma.savingsAccount.upsert({
    where: { id: 3 },
    update: {},
    create: {
      id: 3,
      accountNo: 'SV000000003',
      status: savingsActiveStatus,
      clientId: 5,
      clientName: 'Ngozi Adeyemi',
      savingsProductId: 1,
      savingsProductName: 'Regular Savings',
      currency,
      accountBalance: 75500,
      timeline: { submittedOnDate: [2023, 5, 10], activatedOnDate: [2023, 5, 10] },
    },
  });

  console.log('✅ Seeding complete!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });