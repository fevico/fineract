import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';

@Controller('staff')
export class StaffController {
  private staff = [
    {
      id: 1,
      firstname: 'Admin',
      lastname: 'User',
      displayName: 'Admin User',
      officeId: 1,
      officeName: 'Head Office',
      isLoanOfficer: false,
      isActive: true,
      joiningDate: [2020, 1, 1],
    },
    {
      id: 2,
      firstname: 'Chidi',
      lastname: 'Nwosu',
      displayName: 'Chidi Nwosu',
      officeId: 1,
      officeName: 'Head Office',
      isLoanOfficer: true,
      isActive: true,
      joiningDate: [2021, 3, 1],
    },
    {
      id: 3,
      firstname: 'Emeka',
      lastname: 'Obi',
      displayName: 'Emeka Obi',
      officeId: 2,
      officeName: 'Lagos Branch',
      isLoanOfficer: true,
      isActive: true,
      joiningDate: [2021, 6, 1],
    },
    {
      id: 4,
      firstname: 'Ngozi',
      lastname: 'Adeyemi',
      displayName: 'Ngozi Adeyemi',
      officeId: 2,
      officeName: 'Lagos Branch',
      isLoanOfficer: false,
      isActive: true,
      joiningDate: [2022, 1, 1],
    },
    {
      id: 5,
      firstname: 'Fatima',
      lastname: 'Usman',
      displayName: 'Fatima Usman',
      officeId: 3,
      officeName: 'Abuja Branch',
      isLoanOfficer: true,
      isActive: true,
      joiningDate: [2022, 9, 1],
    },
  ];

  @Get() findAll(
    @Query('officeId') officeId?: string,
    @Query('isLoanOfficer') isLoanOfficer?: string,
  ) {
    let s = [...this.staff];
    if (officeId) s = s.filter((st) => st.officeId === +officeId);
    if (isLoanOfficer === 'true') s = s.filter((st) => st.isLoanOfficer);
    return s;
  }
  @Get(':id') findOne(@Param('id') id: string) {
    return this.staff.find((s) => s.id === +id);
  }
  @Post() create(@Body() body: any) {
    return { resourceId: this.staff.length + 1, ...body };
  }
}
