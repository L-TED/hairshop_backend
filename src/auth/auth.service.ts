import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { TokenService } from './tokens.service';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import { RefreshTokens } from './entities/refreshToken.entity';
import { Customers } from 'src/reservations/entities/Customers';
import { SignupDto } from './dto/signup.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(RefreshTokens)
    private tokenRepo: Repository<RefreshTokens>,
    @InjectRepository(Customers) private usersRepo: Repository<Customers>,
    private tokenService: TokenService,
    private jwtService: JwtService,
  ) {}

  async signup(signupDto: SignupDto) {
    const { username, password } = signupDto;
    const existingUser = await this.usersRepo.findOne({ where: { username } });
    if (existingUser)
      throw new UnauthorizedException('이미 가입된 사용자입니다.');
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = this.usersRepo.create({
      username,
      hashPassword: hashedPassword,
    });
    await this.usersRepo.save(newUser);
    return { message: '회원가입이 완료되었습니다.' };
  }

  async login(loginDto: LoginDto) {
    const { username, password } = loginDto;
    const user = await this.usersRepo.findOne({ where: { username } });
    if (!user) throw new UnauthorizedException('가입되지 않은 사용자입니다.');

    const comparePW = await bcrypt.compare(password, user.hashPassword);
    if (!comparePW)
      throw new UnauthorizedException('비밀번호가 올바르지 않습니다.');

    const access = this.tokenService.generateAccessToken(user.id);
    const refresh = await this.tokenService.generateRefreshToken(user.id);

    return { access, refresh };
  }

  async logout(refreshToken: string) {
    let userId: string | undefined;
    try {
      await this.jwtService.verifyAsync(refreshToken);
      const payload = this.jwtService.decode(refreshToken) as {
        sub?: string;
      } | null;
      userId = payload?.sub;
    } catch {
      throw new UnauthorizedException(
        '리프레시 토큰이 유효하지 않습니다. 다시 로그인해주세요.',
      );
    }

    if (!userId)
      throw new UnauthorizedException(
        '리프레시 토큰이 유효하지 않습니다. 다시 로그인해주세요.',
      );

    const refreshTokenRow = await this.tokenRepo.findOne({
      where: { customer: { id: userId } },
      relations: { customer: true },
    });
    if (!refreshTokenRow)
      throw new UnauthorizedException('로그인된 상태가 아닙니다.');

    const isSame = await bcrypt.compare(
      refreshToken,
      refreshTokenRow.hashedToken,
    );
    if (!isSame)
      throw new UnauthorizedException(
        '리프레시 토큰이 유효하지 않습니다. 다시 로그인해주세요.',
      );

    refreshTokenRow.isRevoked = true;
    await this.tokenRepo.save(refreshTokenRow);
    return { message: '로그아웃이 완료되었습니다.' };
  }

  async me(token: string) {
    const payload = this.jwtService.decode(token) as { sub?: string } | null;
    const userId = payload?.sub;
    if (!userId) throw new UnauthorizedException('유효하지 않은 토큰입니다.');
    const user = await this.usersRepo.findOne({ where: { id: userId } });
    if (!user) throw new UnauthorizedException('유효하지 않은 토큰입니다.');
    return { id: user.id, username: user.username };
  }

  async validToken(token: string) {
    return this.tokenService.validateAccessToken(token);
  }
  async validRefreshToken(refreshToken: string) {
    const access = await this.tokenService.validateRefreshToken(refreshToken);
    return { access };
  }
}
