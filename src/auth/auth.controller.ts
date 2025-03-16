import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth') //specifies that this controller handles routes that begins
export class AuthController {
  /**
   * @param authService for handling authentication logic
   */
  constructor(private readonly authService: AuthService) {}

  @Post('login') //handles POST /auth/login requests to the authenticator
  /** FLOW
   * 1. Email and PW are extracted from request body
   * 2. REPLACE DUMMY USER WITH DB LOOKUP
   * 3. comparepasswords method checks provided pw matches the db pw
   * 4. if PW does not match then it returns invalid credentials
   * 5. if the passwords match, it generates the token to generate a JWT token and return it
   */
  @Post('login')
  async login(@Body() body: { email: string; password: string }) {
    const user = await this.authService.findByEmail(body.email);

    if (
      !user ||
      !(await this.authService.comparePasswords(body.password, user.password))
    ) {
      return { message: 'Invalid credentials' };
    }

    return this.authService.generateToken(user);
  }

  @Post('register')
  async register(@Body() body: { email: string; password: string }) {
    const existingUser = await this.authService.findByEmail(body.email);
    if (existingUser) {
      return { message: 'User already exists' };
    }

    const user = await this.authService.register(body.email, body.password);
    return this.authService.generateToken(user);
  }
}
