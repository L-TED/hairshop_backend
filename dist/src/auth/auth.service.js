"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const bcrypt = __importStar(require("bcrypt"));
const tokens_service_1 = require("./tokens.service");
const jwt_1 = require("@nestjs/jwt");
const refreshToken_entity_1 = require("./entities/refreshToken.entity");
const Customers_entity_1 = require("../reservations/entities/Customers.entity");
let AuthService = class AuthService {
    tokenRepo;
    usersRepo;
    tokenService;
    jwtService;
    constructor(tokenRepo, usersRepo, tokenService, jwtService) {
        this.tokenRepo = tokenRepo;
        this.usersRepo = usersRepo;
        this.tokenService = tokenService;
        this.jwtService = jwtService;
    }
    async login(loginDto) {
        const { username, password } = loginDto;
        const user = await this.usersRepo.findOne({ where: { username } });
        if (!user)
            throw new common_1.UnauthorizedException('가입되지 않은 사용자입니다.');
        const comparePW = await bcrypt.compare(password, user.hashPassword);
        if (!comparePW)
            throw new common_1.UnauthorizedException('비밀번호가 올바르지 않습니다.');
        const access = this.tokenService.generateAccessToken(user.id);
        const refresh = await this.tokenService.generateRefreshToken(user.id);
        return { access, refresh };
    }
    async logout(refreshToken) {
        let userId;
        try {
            await this.jwtService.verifyAsync(refreshToken);
            const payload = this.jwtService.decode(refreshToken);
            userId = payload?.sub;
        }
        catch {
            throw new common_1.UnauthorizedException('리프레시 토큰이 유효하지 않습니다. 다시 로그인해주세요.');
        }
        if (!userId)
            throw new common_1.UnauthorizedException('리프레시 토큰이 유효하지 않습니다. 다시 로그인해주세요.');
        const refreshTokenRow = await this.tokenRepo.findOne({
            where: { customer: { id: userId } },
            relations: { customer: true },
        });
        if (!refreshTokenRow)
            throw new common_1.UnauthorizedException('로그인된 상태가 아닙니다.');
        const isSame = await bcrypt.compare(refreshToken, refreshTokenRow.hashedToken);
        if (!isSame)
            throw new common_1.UnauthorizedException('리프레시 토큰이 유효하지 않습니다. 다시 로그인해주세요.');
        refreshTokenRow.isRevoked = true;
        await this.tokenRepo.save(refreshTokenRow);
        return { message: '로그아웃이 완료되었습니다.' };
    }
    async validToken(token) {
        return this.tokenService.validateAccessToken(token);
    }
    async validRefreshToken(refreshToken) {
        const access = await this.tokenService.validateRefreshToken(refreshToken);
        return { access };
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(refreshToken_entity_1.RefreshTokens)),
    __param(1, (0, typeorm_1.InjectRepository)(Customers_entity_1.Customers)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        tokens_service_1.TokenService,
        jwt_1.JwtService])
], AuthService);
//# sourceMappingURL=auth.service.js.map