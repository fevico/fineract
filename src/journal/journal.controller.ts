import { Controller } from '@nestjs/common';

@Controller('journal')
export class JournalController {
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
