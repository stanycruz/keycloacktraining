import { Injectable, UnauthorizedException } from '@nestjs/common';
import { KeycloakStrategy } from './keycloak.strategy';

@Injectable()
export class AuthService {
  constructor(private readonly keycloakStrategy: KeycloakStrategy) {}

  async getToken(username: string, password: string): Promise<string> {
    const user = await this.keycloakStrategy.authenticate(username, password);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user.access_token;
  }
}
