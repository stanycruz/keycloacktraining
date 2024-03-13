import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './auth/auth.guard';
import { AppController } from './app.controller';
import { KeycloakStrategy } from './auth/keycloak.strategy';
import { AppService } from './app.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    KeycloakStrategy,
    AppService,
  ],
})
export class AppModule {}
