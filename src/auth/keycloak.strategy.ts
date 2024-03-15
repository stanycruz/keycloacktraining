import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { Strategy } from 'passport-keycloak-oauth2-oidc';
import * as passport from 'passport';

@Injectable()
export class KeycloakStrategy extends PassportStrategy(Strategy, 'keycloak') {
  constructor() {
    super({
      realm: 'pedefacil',
      clientID: 'pedefacil-api',
      clientSecret: 'HM8hp7hOPs0AYNvB7KpMmn044YDCP94C',
      callbackURL: 'http://localhost:3000/auth/callback',
      authServerURL:
        'http://localhost:8080/realms/pedefacil/protocol/openid-connect/auth',
      tokenURL:
        'http://localhost:8080/realms/pedefacil/protocol/openid-connect/token',
    });
  }

  async validate(token: string): Promise<any> {
    return token;
  }

  async authenticate(username: string, password: string): Promise<any> {
    return new Promise((resolve, reject) => {
      passport.authenticate(
        'keycloak',
        { session: false },
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        (err, user, info) => {
          if (err || !user) {
            reject(err || new UnauthorizedException());
          }
          resolve(user);
        },
      )({ body: { username, password } } as Request);
    });
  }
}
