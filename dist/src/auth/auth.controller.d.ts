import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import type { Response, Request } from 'express';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    login(loginDto: LoginDto, res: Response): Promise<{
        accessToken: string;
        access: string;
    }>;
    validToken(dto: {
        token: string;
    }): Promise<any>;
    validRefreshToken(req: Request, res: Response): Promise<{
        accessToken: string;
        access: string;
    }>;
    logout(req: Request, res: Response): Promise<{
        message: string;
    }>;
}
