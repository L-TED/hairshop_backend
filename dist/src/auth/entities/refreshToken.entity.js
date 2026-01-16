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
exports.RefreshTokens = void 0;
const Customers_entity_1 = require("../../reservations/entities/Customers.entity");
const typeorm_1 = require("typeorm");
let RefreshTokens = class RefreshTokens {
    id;
    hashedToken;
    isRevoked;
    expiresAt;
    createdAt;
    customer;
};
exports.RefreshTokens = RefreshTokens;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ type: 'integer', name: 'id' }),
    __metadata("design:type", Number)
], RefreshTokens.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)('character varying', { name: 'hashed_token', length: 255 }),
    __metadata("design:type", String)
], RefreshTokens.prototype, "hashedToken", void 0);
__decorate([
    (0, typeorm_1.Column)('boolean', { name: 'is_revoked', default: () => 'false' }),
    __metadata("design:type", Boolean)
], RefreshTokens.prototype, "isRevoked", void 0);
__decorate([
    (0, typeorm_1.Column)('timestamp without time zone', { name: 'expires_at' }),
    __metadata("design:type", Date)
], RefreshTokens.prototype, "expiresAt", void 0);
__decorate([
    (0, typeorm_1.Column)('timestamp without time zone', { name: 'created_at' }),
    __metadata("design:type", Date)
], RefreshTokens.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Customers_entity_1.Customers, (customers) => customers.refreshTokens),
    (0, typeorm_1.JoinColumn)([{ name: 'customer_id', referencedColumnName: 'id' }]),
    __metadata("design:type", Customers_entity_1.Customers)
], RefreshTokens.prototype, "customer", void 0);
exports.RefreshTokens = RefreshTokens = __decorate([
    (0, typeorm_1.Index)('refresh_tokens_pkey', ['id'], { unique: true }),
    (0, typeorm_1.Entity)('refresh_tokens', { schema: 'public' })
], RefreshTokens);
//# sourceMappingURL=refreshToken.entity.js.map