import { CanActivate, ExecutionContext } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { TokenService } from 'src/auth/tokens.service';
export declare class AuthGuard implements CanActivate {
    private jwtService;
    private tokenService;
    constructor(jwtService: JwtService, tokenService: TokenService);
    canActivate(context: ExecutionContext): Promise<boolean>;
}
