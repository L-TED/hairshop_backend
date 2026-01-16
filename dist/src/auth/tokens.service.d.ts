import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { RefreshTokens } from './entities/refreshToken.entity';
export declare class TokenService {
    private tokenRepo;
    private jwtService;
    constructor(tokenRepo: Repository<RefreshTokens>, jwtService: JwtService);
    generateAccessToken(userId: string): string;
    validateAccessToken(token: string): any;
    generateRefreshToken(userId: string): Promise<string>;
    validateRefreshToken(token: string): Promise<string>;
}
