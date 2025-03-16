import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt'; //jwt service for handling JWT creation and validation
import * as bcrypt from 'bcryptjs'; //bcryptjs to hash passwords and compare plaintext passwords with hashes passwords

@Injectable()
export class AuthService {
  /**
   * injecting JwtService to use it for
   * JWT generation in the generateToken()
   * method
   */
  constructor(private jwtService: JwtService) {}
  /**
   * hashes the provided password using bcrypt
   * the password is hashed with a salt factor
   * of 10. the higher the salt factor, the more
   * computationally expensive the hashing process
   * is. returns a hashed version of the password
   */
  async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 10);
  }
  /**
   * Compares a plain-text password with a hashed
   * password.
   * Bcrypt.compare() compares the provided password
   * against the hashed password, returning true if
   * they match, or false if they do not.
   * Returns: a boolean indicating whether the passwords match.
   * @param password
   * @param hashedPassword
   * @returns
   */
  async comparePasswords(
    password: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return bcrypt.compare(password, hashedPassword);
  }
  /**
   * generates a JWT token for the given user.
   * this method creates a payload with the user.id
   * (as sub) and user.email. the sub claim in a JWT
   * typically represents the subject line.
   * @param user
   * @returns the jwt token in the form ( {access_token: 'your_jwt_token' })
   */
  async generateToken(user: any) {
    const payload = { sub: user.id, email: user.email };
    //jwt.service.sign() method is used to generate the token
    //from the payload, which is signed with a secret key
    //configured in the nest application
    return { access_token: this.jwtService.sign(payload) };
  }
}
