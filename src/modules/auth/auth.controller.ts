import { Body, Controller, Post, Req, Res } from '@nestjs/common';
import { UsersService } from 'src/modules/users/users.service';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { ApiTags } from '@nestjs/swagger';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
@ApiTags('Authentication')
export class AuthController {
  constructor(private authService: AuthService, private userService: UsersService) {}

  @Post('login')
  async login(@Req() req, @Res() res, @Body() body: LoginDto) {
    const auth = await this.authService.login(body);
    res.status(auth.status).json(auth.msg);
  }

  // @Post('register')
  // async register(@Req() req, @Res() res, @Body() body: CreateUserDto) {
  //   const auth = await this.authService.register(body);
  //   res.status(auth.status).json(auth.content);
  // }
}
