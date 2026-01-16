"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthGuard = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const tokens_service_1 = require("../../src/auth/tokens.service");
const cookie_options_1 = require("../../src/auth/cookie-options");
let AuthGuard = class AuthGuard {
    jwtService;
    tokenService;
    constructor(jwtService, tokenService) {
        this.jwtService = jwtService;
        this.tokenService = tokenService;
    }
    async canActivate(context) {
        const req = context.switchToHttp().getRequest();
        const res = context.switchToHttp().getResponse();
        const authorize = req.headers['authorization'];
        let token;
        if (typeof authorize === 'string' && authorize.trim().length > 0) {
            const [scheme, value] = authorize.split(' ');
            if (scheme !== 'Bearer')
                throw new common_1.UnauthorizedException('Bearer 토큰 형식이 올바르지 않습니다.');
            token = value;
        }
        if (!token) {
            token = req.cookies?.accessToken;
        }
        if (!token) {
            const refreshToken = req.cookies?.refreshToken;
            if (!refreshToken)
                throw new common_1.UnauthorizedException('액세스 토큰이 없습니다.');
            const access = await this.tokenService.validateRefreshToken(refreshToken);
            res.cookie('accessToken', access, (0, cookie_options_1.getAccessTokenCookieOptions)());
            const payload = await this.jwtService.verifyAsync(access);
            const userId = payload &&
                typeof payload === 'object' &&
                'sub' in payload &&
                typeof payload.sub === 'string'
                ? payload.sub
                : undefined;
            if (!userId)
                throw new common_1.UnauthorizedException('액세스 토큰이 유효하지 않습니다.');
            req.user = { ...(req.user ?? {}), id: userId, userId };
            return true;
        }
        try {
            const payload = await this.jwtService.verifyAsync(token);
            const userId = payload &&
                typeof payload === 'object' &&
                'sub' in payload &&
                typeof payload.sub === 'string'
                ? payload.sub
                : undefined;
            if (!userId)
                throw new common_1.UnauthorizedException('액세스 토큰이 유효하지 않습니다.');
            req.user = { ...(req.user ?? {}), id: userId, userId };
            return true;
        }
        catch (error) {
            const refreshToken = req.cookies?.refreshToken;
            if (!refreshToken)
                throw new common_1.UnauthorizedException('액세스 토큰이 유효하지 않습니다.');
            const access = await this.tokenService.validateRefreshToken(refreshToken);
            res.cookie('accessToken', access, (0, cookie_options_1.getAccessTokenCookieOptions)());
            const payload = await this.jwtService.verifyAsync(access);
            const userId = payload &&
                typeof payload === 'object' &&
                'sub' in payload &&
                typeof payload.sub === 'string'
                ? payload.sub
                : undefined;
            if (!userId)
                throw new common_1.UnauthorizedException('액세스 토큰이 유효하지 않습니다.');
            req.user = { ...(req.user ?? {}), id: userId, userId };
            return true;
        }
    }
};
exports.AuthGuard = AuthGuard;
exports.AuthGuard = AuthGuard = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [jwt_1.JwtService,
        tokens_service_1.TokenService])
], AuthGuard);
//# sourceMappingURL=auth-.guard.js.map