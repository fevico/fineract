import { Body, Controller, Get, Param, Post } from '@nestjs/common';

@Controller('offices')
export class OfficesController {
  private offices = [
    { id: 1, name: 'Head Office',   nameDecorated: 'Head Office',   externalId: 'HO-001',  openingDate: [2020, 1, 1],  hierarchy: '.', parentId: null },
    { id: 2, name: 'Lagos Branch',  nameDecorated: '. Lagos Branch', externalId: 'LB-001',  openingDate: [2021, 3, 15], hierarchy: '.1.', parentId: 1, parentName: 'Head Office' },
    { id: 3, name: 'Abuja Branch',  nameDecorated: '. Abuja Branch', externalId: 'AB-001',  openingDate: [2022, 6, 1],  hierarchy: '.1.', parentId: 1, parentName: 'Head Office' },
    { id: 4, name: 'PH Branch',     nameDecorated: '. PH Branch',    externalId: 'PH-001',  openingDate: [2023, 1, 10], hierarchy: '.1.', parentId: 1, parentName: 'Head Office' },
  ]
  private nextOfficeId = 5

  @Get() findAll() { return this.offices }
  @Get(':id') findOne(@Param('id') id: string) { return this.offices.find(o => o.id === +id) }
  @Post() create(@Body() body: any) {
    const office = { id: this.nextOfficeId++, ...body }
    this.offices.push(office as any)
    return { resourceId: office.id }
  }
}
