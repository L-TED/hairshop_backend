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
exports.Services = void 0;
const Reservation_entity_1 = require("../../reservations/entities/Reservation.entity");
const typeorm_1 = require("typeorm");
let Services = class Services {
    id;
    name;
    price;
    reservations;
};
exports.Services = Services;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ type: 'integer', name: 'id' }),
    __metadata("design:type", Number)
], Services.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)('character varying', { name: 'name', unique: true, length: 255 }),
    __metadata("design:type", String)
], Services.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)('integer', { name: 'price' }),
    __metadata("design:type", Number)
], Services.prototype, "price", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Reservation_entity_1.Reservations, (reservations) => reservations.service),
    __metadata("design:type", Array)
], Services.prototype, "reservations", void 0);
exports.Services = Services = __decorate([
    (0, typeorm_1.Index)('services_pkey', ['id'], { unique: true }),
    (0, typeorm_1.Index)('services_name_key', ['name'], { unique: true }),
    (0, typeorm_1.Entity)('services', { schema: 'public' })
], Services);
//# sourceMappingURL=service.entity.js.map