import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hadouken!';
  }

  getProtectedResource(): string {
    return 'This is a protected resource.';
  }
}
