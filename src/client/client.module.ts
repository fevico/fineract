import { Module } from '@nestjs/common';
import { ClientsService } from './client.service';
import { ClientsController } from './client.controller';

@Module({
  providers: [ClientsService],
  controllers: [ClientsController]
})
export class ClientModule {}
