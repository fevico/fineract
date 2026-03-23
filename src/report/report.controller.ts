import { Controller, Get } from '@nestjs/common';

@Controller('report')
// @UseGuards(JwtAuthGuard)
@Controller('runreports')
export class ReportsController {
  @Get('BalanceSheet')
  balanceSheet() {
    return {
      reportName: 'Balance Sheet',
      generatedAt: new Date().toISOString(),
      data: {
        assets: [
          { name: 'Cash and Cash Equivalents', amount: 12500000 },
          { name: 'Loans Portfolio',            amount: 45800000 },
          { name: 'Interest Receivable',        amount: 1250000  },
        ],
        liabilities: [
          { name: 'Customer Deposits',  amount: 38000000 },
          { name: 'Interest Payable',   amount: 950000   },
        ],
        equity: [
          { name: 'Share Capital',     amount: 15000000 },
          { name: 'Retained Earnings', amount: 5600000  },
        ],
        totalAssets: 59550000, totalLiabilities: 38950000, totalEquity: 20600000,
      },
    }
  }

  @Get('ProfitandLoss')
  profitAndLoss() {
    return {
      reportName: 'Profit and Loss',
      period: 'January 2025',
      income: [
        { name: 'Interest Income on Loans', amount: 1850000 },
        { name: 'Fee Income',               amount: 320000  },
        { name: 'Commission Income',        amount: 180000  },
      ],
      expenses: [
        { name: 'Salaries and Wages',  amount: 850000 },
        { name: 'Rent and Utilities',  amount: 120000 },
        { name: 'Loan Loss Provision', amount: 95000  },
      ],
      totalIncome: 2350000, totalExpenses: 1065000, netProfit: 1285000,
    }
  }

  @Get('LoanAccountSummary')
  loanSummary() {
    return {
      reportName: 'Loan Account Summary',
      data: [
        { status: 'Active',          count: 1, totalOutstanding: 414167  },
        { status: 'Pending Approval',count: 1, totalOutstanding: 300000  },
        { status: 'Approved',        count: 1, totalOutstanding: 2000000 },
        { status: 'Closed',          count: 1, totalOutstanding: 0       },
      ],
      totalDisbursed: 2600000, totalOutstanding: 2714167, totalRepaid: 177501,
    }
  }

  @Get('ClientSummary')
  clientSummary() {
    return {
      reportName: 'Client Summary',
      totalActive: 4, totalPending: 1, totalClosed: 0,
      byOffice: [
        { officeName: 'Head Office',  active: 3, pending: 0 },
        { officeName: 'Lagos Branch', active: 1, pending: 0 },
        { officeName: 'Abuja Branch', active: 0, pending: 1 },
      ],
    }
  }
}
