import { Controller, Get, Post, Put, Body, Param, Query, UseGuards } from '@nestjs/common'
import { ClientsService } from './client.service'

// @UseGuards(JwtAuthGuard)
@Controller('clients')
export class ClientsController {
  constructor(private readonly clientsService: ClientsService) {}

  // GET /clients
  @Get()
  findAll(
    @Query('officeId') officeId?: string,
    @Query('status') status?: string,
    @Query('displayName') displayName?: string,
    @Query('offset') offset = '0',
    @Query('limit') limit = '20',
  ) {
    return this.clientsService.getClients({ officeId, status, displayName, offset: +offset, limit: +limit })
  }

  // GET /clients/:id
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.clientsService.getClientById(+id)
  }

  // POST /clients
  @Post()
  create(@Body() body: any) {
    return this.clientsService.createClient(body)
  }

  // PUT /clients/:id
  @Put(':id')
  update(@Param('id') id: string, @Body() body: any) {
    return this.clientsService.updateClient(+id, body)
  }

  // POST /clients/:id?command=activate|close|reactivate|reject|withdraw
  @Post(':id')
  command(@Param('id') id: string, @Query('command') command: string, @Body() body: any) {
    return this.clientsService.executeCommand(+id, command, body)
  }

  // GET /clients/:id/accounts — loan + savings accounts summary
  @Get(':id/accounts')
  accounts(@Param('id') id: string) {
    return this.clientsService.getClientAccounts(+id)
  }

  // GET /clients/:id/transactions
  @Get(':id/transactions')
  transactions(@Param('id') id: string) {
    return this.clientsService.getClientTransactions(+id)
  }
}