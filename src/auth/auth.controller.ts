import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request, Response } from 'express';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @UseGuards(AuthGuard('keycloak'))
  async login(@Body() body: { username: string; password: string }) {
    const token = await this.authService.getToken(body.username, body.password);
    return { access_token: token };
  }

  @Get('callback')
  @UseGuards(AuthGuard('keycloak'))
  async callback(@Req() req: Request, @Res() res: Response) {
    console.log(
      'Este método será chamado quando o usuário for redirecionado de volta para a sua aplicação após a autenticação bem-sucedida no Keycloak.',
    );
    console.log(
      'Aqui você pode verificar se o usuário foi autenticado com sucesso e, em seguida, redirecioná-lo para a página desejada.',
    );
    res.redirect('/'); // Redireciona o usuário para a página inicial da aplicação
  }
}
