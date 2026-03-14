import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    AuthModule, 
    PrismaModule,
    OfficeModule,
    LoanModule,
    AccountingModule,
    ClientModule,
    JournalModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}


// import { Module } from '@nestjs/common'
// import { ConfigModule } from '@nestjs/config'

// // Auth
// import { AuthModule } from './auth/auth.module'

// // Accounting
// import { AccountingService } from './accounting/accounting.service'
// import { GlAccountController, JournalEntriesController, AccountingRulesController } from './accounting/accounting.controller'

// // Loans
// import { LoansService } from './loans/loans.service'
// import { LoansController, LoanProductsController, LoanScheduleController } from './loans/loans.controller'

// // Clients
// import { ClientsService } from './clients/clients.service'
// import { ClientsController } from './clients/clients.controller'

// // Savings / Postings / Offices / Staff / Charges / Reports
// import {
//   SavingsAccountsController,
//   OfficesController,
//   StaffController,
//   ChargesController,
//   ReportsController,
//   DashboardController,
// } from './other/other.controller'

// // Users / Roles / Permissions (existing)
// import { UsersModule }   from './users/users.module'
// import { OfficesModule } from './offices/offices.module'
import { OfficeModule } from './office/office.module';
import { LoanModule } from './loan/loan.module';
import { AccountingModule } from './accounting/accounting.module';
import { ClientModule } from './client/client.module';
import { JournalModule } from './journal/journal.module';

// @Module({
//   imports: [
//     ConfigModule.forRoot({ isGlobal: true }),
//     AuthModule,
//     UsersModule,
//     OfficesModule,
//   ],
//   controllers: [
//     // Accounting
//     GlAccountController,
//     JournalEntriesController,
//     AccountingRulesController,
//     // Loans
//     LoansController,
//     LoanProductsController,
//     LoanScheduleController,
//     // Clients
//     ClientsController,
//     // Savings/Postings
//     SavingsAccountsController,
//     // Infrastructure
//     OfficesController,
//     StaffController,
//     ChargesController,
//     // Reports & Dashboard
//     ReportsController,
//     DashboardController,
//   ],
//   providers: [
//     AccountingService,
//     LoansService,
//     ClientsService,
//   ],
// })
// export class AppModule {}
