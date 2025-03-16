import { Injectable } from '@nestjs/common'; // imports injectable decorator, which marks the class as injectable into the NestJS dependency injection system
import { PassportStrategy } from '@nestjs/passport'; // importss passportstrategy base class, which nestjs uses to integrate passport strategies
import { ExtractJwt, Strategy } from 'passport-jwt'; // provides the jwt-based authentication strategy using passport. this package extracts the JWT from requests and verifies.

@Injectable() //marks this class as injectable
//custom strategy for passport, tells passport how to extract the jwt token and verify it.
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    //calls the parent class constructor (passport strategy) passes in the options for the jwt strategy
    super({
      //specifies how to extract the jwt token from the incoming request
      //fromauthheaderasbearertoken looks for the token in the authorization
      //header in the format bearer <JWT_TOKEN>
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      //secret key or public key used to verify the JWT's signature
      //ensures only valid JWTs
      secretOrKey: process.env.JWT_SECRET,
    });
  }
  //this method is called after the JWT has been verified
  //the payload is the decoded JWT
  //payload.sub: typically holds the user's unique identifier
  //payload.email: this is the email claim from the JWT
  async validate(payload: any) {
    //returns an object containing the userId and Email.
    //This object will be attached to the request object (req.user)
    //so it can be accessed in subsequent parts of the application
    return { userId: payload.sub, email: payload.email };
  }
}

/**
 * This JwtStrategy defines how JWTs should be extracted from the request, verified, and the payload processed to extract user information. The core flow is:

The JWT token is extracted from the Authorization header.
The JWT is verified using the JWT_SECRET key.
If the JWT is valid, the user’s ID and email are returned and added to the request (req.user), making it available for use in your route handlers or guards.
This is typically used for authentication and authorization in your NestJS application, allowing you to secure routes by verifying the JWT token in incoming requests.
 */
