import { Repository } from 'typeorm';
import { TokenService } from './tokens.service';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import { RefreshTokens } from './entities/refreshToken.entity';
import { Customers } from 'src/reservations/entities/Customers.entity';
export declare class AuthService {
    private tokenRepo;
    private usersRepo;
    private tokenService;
    private jwtService;
    constructor(tokenRepo: Repository<RefreshTokens>, usersRepo: Repository<Customers>, tokenService: TokenService, jwtService: JwtService);
    login(loginDto: LoginDto): Promise<{
        access: string;
        refresh: string;
    }>;
    logout(refreshToken: string): Promise<{
        message: string;
    }>;
    validToken(token: string): Promise<any>;
    validRefreshToken(refreshToken: string): Promise<{
        access: string;
    }>;
}
