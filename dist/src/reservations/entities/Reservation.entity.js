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
exports.Reservations = void 0;
const service_entity_1 = require("../../services/entities/service.entity");
const typeorm_1 = require("typeorm");
const Customers_entity_1 = require("./Customers.entity");
let Reservations = class Reservations {
    id;
    status;
    startAt;
    customer;
    service;
};
exports.Reservations = Reservations;
__decorate([
    (0, typeorm_1.Column)('uuid', { primary: true, name: 'id' }),
    __metadata("design:type", String)
], Reservations.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)('character varying', { name: 'status', length: 20 }),
    __metadata("design:type", String)
], Reservations.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)('timestamp without time zone', { name: 'start_at' }),
    __metadata("design:type", Date)
], Reservations.prototype, "startAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Customers_entity_1.Customers, (customers) => customers.reservations),
    (0, typeorm_1.JoinColumn)([{ name: 'customer_id', referencedColumnName: 'id' }]),
    __metadata("design:type", Customers_entity_1.Customers)
], Reservations.prototype, "customer", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => service_entity_1.Services, (services) => services.reservations),
    (0, typeorm_1.JoinColumn)([{ name: 'service_id', referencedColumnName: 'id' }]),
    __metadata("design:type", service_entity_1.Services)
], Reservations.prototype, "service", void 0);
exports.Reservations = Reservations = __decorate([
    (0, typeorm_1.Index)('reservations_pkey', ['id'], { unique: true }),
    (0, typeorm_1.Entity)('reservations', { schema: 'public' })
], Reservations);
//# sourceMappingURL=Reservation.entity.js.map