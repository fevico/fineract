import { Body, Controller, Headers, HttpCode, HttpStatus, Post, Query, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('authentication')
export class AuthController {
      constructor(private authService: AuthService) {}
    
      /**
       * Fineract supports two login styles:
       * 1. Basic Auth header:  Authorization: Basic base64(user:pass)
       * 2. Query params:       POST /authentication?username=x&password=y
       * 3. JSON body:          { username, password }
       *
       * We support all three to be compatible with any frontend config.
       */
      @Post()
      @HttpCode(HttpStatus.OK)
      async login(
        @Headers('authorization') authHeader: string,
        @Body() body: any,
        @Query('username') qUsername: string,
        @Query('password') qPassword: string,
      ) {
        let username: string;
        let password: string;
    
        // 1. Basic Auth header
        if (authHeader && authHeader.startsWith('Basic ')) {
          const base64 = authHeader.slice(6);
          const decoded = Buffer.from(base64, 'base64').toString('utf-8');
          const colonIndex = decoded.indexOf(':');
          username = decoded.substring(0, colonIndex);
          password = decoded.substring(colonIndex + 1);
        }
        // 2. JSON body
        else if (body?.username) { 
          username = body.username;
          password = body.password;
        }
        // 3. Query params (legacy Fineract style)
        else if (qUsername) {
          username = qUsername;
          password = qPassword;
        } else {
          throw new UnauthorizedException('No credentials provided');
        }
    
        return this.authService.login(username, password);
      }
}
