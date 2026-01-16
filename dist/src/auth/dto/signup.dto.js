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
exports.SignupDto = void 0;
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
class SignupDto {
    email;
    password;
    nickname;
    profileImageUrl;
}
exports.SignupDto = SignupDto;
__decorate([
    (0, class_transformer_1.Transform)(({ value }) => (typeof value === 'string' ? value.trim() : value)),
    (0, class_validator_1.IsEmail)({}, { message: '유효하지 않은 이메일 형식입니다.' }),
    (0, class_validator_1.MaxLength)(255),
    __metadata("design:type", String)
], SignupDto.prototype, "email", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)({ message: '비밀번호는 비워둘 수 없습니다.' }),
    (0, class_validator_1.MinLength)(8, {
        message: '비밀번호가 너무 짧습니다. 최소 8자 이상이어야 합니다.',
    }),
    (0, class_validator_1.MaxLength)(72),
    __metadata("design:type", String)
], SignupDto.prototype, "password", void 0);
__decorate([
    (0, class_transformer_1.Transform)(({ value }) => (typeof value === 'string' ? value.trim() : value)),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)({ message: '닉네임은 비워둘 수 없습니다.' }),
    (0, class_validator_1.MaxLength)(50),
    __metadata("design:type", String)
], SignupDto.prototype, "nickname", void 0);
__decorate([
    (0, class_transformer_1.Transform)(({ value }) => {
        if (typeof value !== 'string')
            return value;
        const trimmed = value.trim();
        return trimmed.length === 0 ? undefined : trimmed;
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsUrl)({ require_protocol: true }),
    __metadata("design:type", String)
], SignupDto.prototype, "profileImageUrl", void 0);
//# sourceMappingURL=signup.dto.js.map