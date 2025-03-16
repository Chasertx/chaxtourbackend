import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';

@Module({
  //defines a nestJS module. Accepts an object that specifies which components are imported, controllers and providers associated with the module.
  imports: [
    PassportModule, //enables integration of passport-based strategies for handling authentication.
    JwtModule.register({
      secret: process.env.JWT_SECRET, //secret used to sign the JWT tokens
      signOptions: { expiresIn: process.env.JWT_EXPIRATION }, //token expiration time
    }),
  ],
  controllers: [AuthController], //Receives http requests and interacts with the auth service
  providers: [AuthService, JwtStrategy], //AuthService: Contains core authentication logic such as hashing passwords and generating JWT tokens. JWTStrategy: the custom passport strategy for verifying JWT tokens. It defines how the server validates incoming JWTs.
})
export class AuthModule {}
