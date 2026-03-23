import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { OfficeModule } from './office/office.module';
import { LoanModule } from './loan/loan.module';
import { AccountingModule } from './accounting/accounting.module';
import { ClientModule } from './client/client.module';
import { JournalModule } from './journal/journal.module';
import { StaffModule } from './staff/staff.module';
import { ReportModule } from './report/report.module';
import { ChargesModule } from './charges/charges.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    AuthModule, 
    PrismaModule,
    OfficeModule,
    LoanModule,
    AccountingModule,
    ClientModule,
    JournalModule,
    StaffModule,
    ReportModule,
    ChargesModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}