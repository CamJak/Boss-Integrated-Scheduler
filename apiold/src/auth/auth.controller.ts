import { Body, Controller, Post, Req } from '@nestjs/common';
import { prisma } from '@prisma/client';
import { AuthService } from './auth.service';
import { RegisterDto } from './validators/auth.dto';

@Controller('auth')
export class AuthController {
  /*
  calling private authService in this way is a shorthand for
  just having authService without the "private" in the constructor
  and then setting an instance variable equal to the argument
  this.authService = authService;
  */
  constructor(private authService: AuthService) {}

  @Post('login')
  login() {
    return this.authService.login();
  }

  @Post('register')
  async register(@Body() registration: RegisterDto) {
    return await this.authService.register(registration);
  }
}
