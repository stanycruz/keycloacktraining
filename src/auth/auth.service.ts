import { Injectable } from '@nestjs/common';
import { KeycloakStrategy } from './keycloak.strategy';

@Injectable()
export class AuthService {
  constructor(private readonly keycloakStrategy: KeycloakStrategy) {}

  async getToken(username: string, password: string): Promise<string> {
    const tokenResponse = await this.keycloakStrategy.authenticate(
      username,
      password,
    );
    return tokenResponse.access_token;
  }
}
