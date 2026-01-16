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
exports.Customers = void 0;
const typeorm_1 = require("typeorm");
const refreshToken_entity_1 = require("../../auth/entities/refreshToken.entity");
const Reservation_entity_1 = require("./Reservation.entity");
let Customers = class Customers {
    id;
    username;
    hashPassword;
    refreshTokens;
    reservations;
};
exports.Customers = Customers;
__decorate([
    (0, typeorm_1.Column)('uuid', { primary: true, name: 'id' }),
    __metadata("design:type", String)
], Customers.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)('character varying', { name: 'username', unique: true, length: 255 }),
    __metadata("design:type", String)
], Customers.prototype, "username", void 0);
__decorate([
    (0, typeorm_1.Column)('character varying', { name: 'hash_password', length: 255 }),
    __metadata("design:type", String)
], Customers.prototype, "hashPassword", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => refreshToken_entity_1.RefreshTokens, (refreshTokens) => refreshTokens.customer),
    __metadata("design:type", Array)
], Customers.prototype, "refreshTokens", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Reservation_entity_1.Reservations, (reservations) => reservations.customer),
    __metadata("design:type", Array)
], Customers.prototype, "reservations", void 0);
exports.Customers = Customers = __decorate([
    (0, typeorm_1.Index)('customers_pkey', ['id'], { unique: true }),
    (0, typeorm_1.Index)('customers_username_key', ['username'], { unique: true }),
    (0, typeorm_1.Entity)('customers', { schema: 'public' })
], Customers);
//# sourceMappingURL=Customers.entity.js.map