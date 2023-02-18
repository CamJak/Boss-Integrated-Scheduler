import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { RegisterDto } from './validators/auth.dto';
import * as argon from 'argon2';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}
  login() {
    return 'I am logged in';
  }

  async register({ email, password, firstName, lastName }) {
    const hash = await argon.hash(password);
    const user = await this.prisma.user.create({
      data: {
        email: email,
        hash: hash,
        firstName: firstName,
        lastName: lastName,
        emailVerified: false
      },
    });
    return 'I am signed up';
  }
}
