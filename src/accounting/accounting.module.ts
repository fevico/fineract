import { Module } from '@nestjs/common';
import { AccountingService } from './accounting.service';
import { GlAccountController } from './accounting.controller';

@Module({
  providers: [AccountingService],
  controllers: [GlAccountController]
})
export class AccountingModule {}
