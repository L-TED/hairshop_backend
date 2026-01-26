import {
  Body,
  Controller,
  ForbiddenException,
  Get,
  Post,
  Req,
  Res,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import type { Response, Request } from 'express';
import {
  getAccessTokenCookieOptions,
  getClearAuthCookieOptions,
  getRefreshTokenCookieOptions,
} from './cookie-options';
import { SignupDto } from './dto/signup.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('/me')
  async me(@Req() req: Request) {
    const accessToken = req.cookies.accessToken;
    if (!accessToken)
      throw new UnauthorizedException(
        '액세스 토큰이 없습니다. 로그인해주세요.',
      );
    return this.authService.me(accessToken);
  }

  @Post('/signup')
  async signup(@Body() signupDto: SignupDto) {
    return this.authService.signup(signupDto);
  }

  @Post('/login')
  async login(
    @Body() loginDto: LoginDto,
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ) {
    const { access, refresh } = await this.authService.login(loginDto);

    // accessToken: API 호출용 (AuthGuard가 쿠키/헤더 모두 지원)
    res.cookie('accessToken', access, getAccessTokenCookieOptions(req));

    res.cookie('refreshToken', refresh, getRefreshTokenCookieOptions(req));

    // 프론트 호환: accessToken 키로도 내려줌
    return { accessToken: access, access };
  }

  @Post('/validToken')
  validToken(@Body() dto: { token: string }) {
    return this.authService.validToken(dto.token);
  }

  @Post('/refresh')
  async validRefreshToken(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ) {
    const refreshToken = req.cookies.refreshToken;
    const clearOptions = getClearAuthCookieOptions(req);

    // 프론트에서 401 발생 시 refresh를 재시도하는 인터셉터가 있을 경우
    // refresh 자체가 401을 내면 무한 루프가 날 수 있어 403으로 응답합니다.
    if (!refreshToken) {
      res.clearCookie('accessToken', clearOptions);
      res.clearCookie('refreshToken', clearOptions);
      throw new ForbiddenException(
        '리프레시 토큰이 없습니다. 다시 로그인해주세요.',
      );
    }

    try {
      const { access } = await this.authService.validRefreshToken(refreshToken);
      res.cookie('accessToken', access, getAccessTokenCookieOptions(req));
      return { accessToken: access, access };
    } catch {
      res.clearCookie('accessToken', clearOptions);
      res.clearCookie('refreshToken', clearOptions);
      throw new ForbiddenException(
        '리프레시 토큰이 유효하지 않습니다. 다시 로그인해주세요.',
      );
    }
  }

  @Post('/logout')
  logout(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken)
      throw new UnauthorizedException(
        '리프레시 토큰이 없습니다. 다시 로그인해주세요.',
      );
    const clearOptions = getClearAuthCookieOptions(req);
    res.clearCookie('accessToken', clearOptions);
    res.clearCookie('refreshToken', clearOptions);
    return this.authService.logout(refreshToken);
  }
}
