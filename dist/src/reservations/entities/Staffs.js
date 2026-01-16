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
exports.Staffs = void 0;
const typeorm_1 = require("typeorm");
const Stores_1 = require("./Stores");
let Staffs = class Staffs {
    id;
    name;
    store;
};
exports.Staffs = Staffs;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ type: 'integer', name: 'id' }),
    __metadata("design:type", Number)
], Staffs.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)('character varying', { name: 'name', length: 255 }),
    __metadata("design:type", String)
], Staffs.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Stores_1.Stores, (stores) => stores.staffs),
    (0, typeorm_1.JoinColumn)([{ name: 'store_id', referencedColumnName: 'id' }]),
    __metadata("design:type", Stores_1.Stores)
], Staffs.prototype, "store", void 0);
exports.Staffs = Staffs = __decorate([
    (0, typeorm_1.Index)('staffs_pkey', ['id'], { unique: true }),
    (0, typeorm_1.Entity)('staffs', { schema: 'public' })
], Staffs);
//# sourceMappingURL=Staffs.js.map