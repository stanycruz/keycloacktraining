import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-keycloak-oauth2-oidc';

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
      super.authenticate({}, { username, password }, (err, user) => {
        if (err || !user) {
          reject(err || new UnauthorizedException());
        }
        resolve(user);
      });
    });
  }
}
