import { Controller, Get, Post, Put, Body, Param, Query, UseGuards } from '@nestjs/common'
// import { JwtAuthGuard } from '../auth/jwt-auth.guard'
import { AccountingService } from './accounting.service'

// @UseGuards(JwtAuthGuard)
@Controller('glaccount')
export class GlAccountController {
  constructor(private readonly accountingService: AccountingService) {}

  // GET /glaccount — list all GL accounts
  @Get()
  findAll(@Query('type') type?: string) {
    return this.accountingService.getGlAccounts(type)
  }

  // GET /glaccount/:id
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.accountingService.getGlAccountById(+id)
  }

  // POST /glaccount — create GL account
  @Post()
  create(@Body() body: any) {
    return this.accountingService.createGlAccount(body)
  }

  // PUT /glaccount/:id — update GL account
  @Put(':id')
  update(@Param('id') id: string, @Body() body: any) {
    return this.accountingService.updateGlAccount(+id, body)
  }
}

// @UseGuards(JwtAuthGuard)
@Controller('journalentries')
export class JournalEntriesController {
  constructor(private readonly accountingService: AccountingService) {}

  // GET /journalentries — search journal entries
  @Get()
  findAll(
    @Query('officeId') officeId?: string,
    @Query('glAccountId') glAccountId?: string,
    @Query('fromDate') fromDate?: string,
    @Query('toDate') toDate?: string,
    @Query('transactionId') transactionId?: string,
  ) {
    return this.accountingService.getJournalEntries({ officeId, glAccountId, fromDate, toDate, transactionId })
  }

  // POST /journalentries — create manual journal entry (GL to GL posting)
  @Post()
  create(@Body() body: any) {
    return this.accountingService.createJournalEntry(body)
  }

  // POST /journalentries/:id?command=reverse — reverse a journal entry
  @Post(':id')
  reverse(@Param('id') id: string, @Query('command') command: string, @Body() body: any) {
    if (command === 'reverse') {
      return this.accountingService.reverseJournalEntry(+id, body)
    }
  }
}

// @UseGuards(JwtAuthGuard)
@Controller('accountingrules')
export class AccountingRulesController {
  constructor(private readonly accountingService: AccountingService) {}

  @Get()
  findAll() {
    return this.accountingService.getAccountingRules()
  }

  @Post()
  create(@Body() body: any) {
    return this.accountingService.createAccountingRule(body)
  }
}
