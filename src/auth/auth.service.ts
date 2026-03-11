import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AuthService { 
    constructor(
    private prisma: PrismaService,  
    private jwt: JwtService, 
  ) {} 
//   SKIP_AUTH=true
      async validateUser(username: string, password: string) {
    const user = await this.prisma.user.findUnique({ where: { username } });
    if (!user) throw new UnauthorizedException('Invalid credentials');

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) throw new UnauthorizedException('Invalid credentials');

    return user;
  }

  async login(username: string, password: string) {
    const user = await this.validateUser(username, password);

    const payload = { sub: user.id, username: user.username };
    const token = this.jwt.sign(payload, );

    // Return the exact shape Fineract returns
    return {
      username: user.username,
      userId: user.id,
      base64EncodedAuthenticationKey: Buffer.from(`${username}:${password}`).toString('base64'),
      authenticated: true,
      tenantId: 'default',
      officeId: user.officeId,
      officeName: 'Head Office',
      staffId: user.staffId ?? null,
      staffDisplayName: user.staffId ? `${user.firstname} ${user.lastname}` : null,
      organisationalRole: { id: 1, code: 'staffOrganisationalRole.loanOfficer', value: 'Loan officer' },
      roles: user.roles,
      permissions: user.permissions,
      isTwoFactorAuthenticationRequired: false,
      // Extra field — our JWT for easier Bearer auth
      access_token: token,
    };
  }
}
