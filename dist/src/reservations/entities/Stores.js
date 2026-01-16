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
exports.Stores = void 0;
const typeorm_1 = require("typeorm");
const Staffs_1 = require("./Staffs");
let Stores = class Stores {
    id;
    name;
    address;
    staffs;
};
exports.Stores = Stores;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ type: 'integer', name: 'id' }),
    __metadata("design:type", Number)
], Stores.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)('character varying', { name: 'name', unique: true, length: 255 }),
    __metadata("design:type", String)
], Stores.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)('character varying', { name: 'address', unique: true, length: 255 }),
    __metadata("design:type", String)
], Stores.prototype, "address", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Staffs_1.Staffs, (staffs) => staffs.store),
    __metadata("design:type", Array)
], Stores.prototype, "staffs", void 0);
exports.Stores = Stores = __decorate([
    (0, typeorm_1.Index)('stores_address_key', ['address'], { unique: true }),
    (0, typeorm_1.Index)('stores_pkey', ['id'], { unique: true }),
    (0, typeorm_1.Index)('stores_name_key', ['name'], { unique: true }),
    (0, typeorm_1.Entity)('stores', { schema: 'public' })
], Stores);
//# sourceMappingURL=Stores.js.map