import { Controller, Get, Post, Put, Body, Param, Query, UseGuards } from '@nestjs/common'
import { LoansService } from './loan.service'

// ── /loans ────────────────────────────────────────────────────────────
// @UseGuards(JwtAuthGuard)
@Controller('loans')
export class LoansController {
  constructor(private readonly loansService: LoansService) {}

  @Get()
  findAll(
    @Query('status') status?: string,
    @Query('officeId') officeId?: string,
    @Query('clientId') clientId?: string,
  ) {
    return this.loansService.getLoans({ status, officeId, clientId })
  }

  @Get(':loanId')
  findOne(@Param('loanId') loanId: string) {
    return this.loansService.getLoanById(+loanId)
  }

  // POST /loans — submit new loan application
  @Post()
  create(@Body() body: any) {
    return this.loansService.createLoan(body)
  }

  // POST /loans/:id?command=approve|reject|disburse|undoapproval|withdrawn|writeoff|close
  @Post(':loanId')
  command(
    @Param('loanId') loanId: string,
    @Query('command') command: string,
    @Body() body: any,
  ) {
    return this.loansService.executeCommand(+loanId, command, body)
  }

  // GET /loans/:id/repaymentschedule
  @Get(':loanId/repaymentschedule')
  repaymentSchedule(@Param('loanId') loanId: string) {
    return this.loansService.getRepaymentSchedule(+loanId)
  }

  // GET /loans/:id/transactions
  @Get(':loanId/transactions')
  transactions(@Param('loanId') loanId: string) {
    return this.loansService.getLoanTransactions(+loanId)
  }

  // POST /loans/:id/transactions?command=repayment|waiveinterest|writeoff
  @Post(':loanId/transactions')
  postTransaction(
    @Param('loanId') loanId: string,
    @Query('command') command: string,
    @Body() body: any,
  ) {
    return this.loansService.postLoanTransaction(+loanId, command, body)
  }
}

// ── /loanproducts ─────────────────────────────────────────────────────
// @UseGuards(JwtAuthGuard)
@Controller('loanproducts')
export class LoanProductsController {
  constructor(private readonly loansService: LoansService) {}

  @Get()
  findAll() {
    return this.loansService.getLoanProducts()
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.loansService.getLoanProductById(+id)
  }

  @Post()
  create(@Body() body: any) {
    return this.loansService.createLoanProduct(body)
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() body: any) {
    return this.loansService.updateLoanProduct(+id, body)
  }
}

// ── /loanschedule (loan calculator) ──────────────────────────────────
// @UseGuards(JwtAuthGuard)
@Controller('loanschedule')
export class LoanScheduleController {
  constructor(private readonly loansService: LoansService) {}

  // POST /loanschedule?command=calculateLoanSchedule
  @Post()
  calculate(@Body() body: any) {
    return this.loansService.calculateLoanSchedule(body)
  }
}
