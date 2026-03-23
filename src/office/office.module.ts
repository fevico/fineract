import { Module } from '@nestjs/common';
import { OfficeService } from './office.service';
import { OfficesController } from './office.controller';

@Module({
  providers: [OfficeService],
  controllers: [OfficesController]
})
export class OfficeModule {}
