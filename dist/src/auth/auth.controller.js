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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const auth_service_1 = require("./auth.service");
const login_dto_1 = require("./dto/login.dto");
const cookie_options_1 = require("./cookie-options");
let AuthController = class AuthController {
    authService;
    constructor(authService) {
        this.authService = authService;
    }
    async login(loginDto, res) {
        const { access, refresh } = await this.authService.login(loginDto);
        res.cookie('accessToken', access, (0, cookie_options_1.getAccessTokenCookieOptions)());
        res.cookie('refreshToken', refresh, (0, cookie_options_1.getRefreshTokenCookieOptions)());
        return { accessToken: access, access };
    }
    validToken(dto) {
        return this.authService.validToken(dto.token);
    }
    validRefreshToken(req, res) {
        const refreshToken = req.cookies.refreshToken;
        if (!refreshToken)
            throw new common_1.UnauthorizedException('리프레시 토큰이 없습니다. 다시 로그인해주세요.');
        return this.authService
            .validRefreshToken(refreshToken)
            .then(({ access }) => {
            res.cookie('accessToken', access, (0, cookie_options_1.getAccessTokenCookieOptions)());
            return { accessToken: access, access };
        });
    }
    logout(req, res) {
        const refreshToken = req.cookies.refreshToken;
        if (!refreshToken)
            throw new common_1.UnauthorizedException('리프레시 토큰이 없습니다. 다시 로그인해주세요.');
        const clearOptions = (0, cookie_options_1.getClearAuthCookieOptions)();
        res.clearCookie('accessToken', clearOptions);
        res.clearCookie('refreshToken', clearOptions);
        return this.authService.logout(refreshToken);
    }
};
exports.AuthController = AuthController;
__decorate([
    (0, common_1.Post)('/login'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [login_dto_1.LoginDto, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "login", null);
__decorate([
    (0, common_1.Post)('/validToken'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "validToken", null);
__decorate([
    (0, common_1.Post)('/refresh'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "validRefreshToken", null);
__decorate([
    (0, common_1.Post)('/logout'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "logout", null);
exports.AuthController = AuthController = __decorate([
    (0, common_1.Controller)('auth'),
    __metadata("design:paramtypes", [auth_service_1.AuthService])
], AuthController);
//# sourceMappingURL=auth.controller.js.map