import { Body, Controller, Get, Param, Post } from '@nestjs/common';

@Controller('charges')
// @UseGuards(JwtAuthGuard)
@Controller('charges')
export class ChargesController {  
  private charges = [ 
    {
      id: 1,
      name: 'Loan Processing Fee',
      active: true,
      penalty: false,
      currency: { code: 'NGN' },
      amount: 5000,
      chargeTimeType: { value: 'Disbursement' },
      chargeCalculationType: { value: 'Flat' },
      chargeAppliesTo: { value: 'Loan' },
    },
    {
      id: 2,
      name: 'Late Payment Penalty',
      active: true,
      penalty: true,
      currency: { code: 'NGN' },
      amount: 2,
      chargeTimeType: { value: 'Overdue Fees' },
      chargeCalculationType: { value: '% Amount' },
      chargeAppliesTo: { value: 'Loan' },
    },
    {
      id: 3,
      name: 'Account Maintenance',
      active: true,
      penalty: false,
      currency: { code: 'NGN' },
      amount: 500,
      chargeTimeType: { value: 'Monthly Fee' },
      chargeCalculationType: { value: 'Flat' },
      chargeAppliesTo: { value: 'Savings' },
    },
    {
      id: 4,
      name: 'SMS Alert Fee',
      active: true,
      penalty: false,
      currency: { code: 'NGN' },
      amount: 50,
      chargeTimeType: { value: 'Transaction' },
      chargeCalculationType: { value: 'Flat' },
      chargeAppliesTo: { value: 'Savings' },
    },
  ];

  @Get() findAll() {
    return this.charges;
  }
  @Get(':id') findOne(@Param('id') id: string) {
    return this.charges.find((c) => c.id === +id);
  }
  @Post() create(@Body() body: any) {
    const charge = { id: this.charges.length + 1, active: true, ...body };
    this.charges.push(charge as any);
    return { resourceId: charge.id };
  }
}
