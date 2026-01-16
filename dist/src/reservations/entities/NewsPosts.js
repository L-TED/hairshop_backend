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
exports.NewsPosts = void 0;
const typeorm_1 = require("typeorm");
let NewsPosts = class NewsPosts {
    id;
    title;
    contents;
    thumbnailUrl;
    createdAt;
};
exports.NewsPosts = NewsPosts;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ type: "integer", name: "id" }),
    __metadata("design:type", Number)
], NewsPosts.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)("character varying", { name: "title", length: 255 }),
    __metadata("design:type", String)
], NewsPosts.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Column)("text", { name: "contents" }),
    __metadata("design:type", String)
], NewsPosts.prototype, "contents", void 0);
__decorate([
    (0, typeorm_1.Column)("character varying", {
        name: "thumbnail_url",
        nullable: true,
        length: 255,
    }),
    __metadata("design:type", Object)
], NewsPosts.prototype, "thumbnailUrl", void 0);
__decorate([
    (0, typeorm_1.Column)("timestamp with time zone", {
        name: "created_at",
        nullable: true,
        default: () => "now()",
    }),
    __metadata("design:type", Object)
], NewsPosts.prototype, "createdAt", void 0);
exports.NewsPosts = NewsPosts = __decorate([
    (0, typeorm_1.Index)("news_posts_pkey", ["id"], { unique: true }),
    (0, typeorm_1.Entity)("news_posts", { schema: "public" })
], NewsPosts);
//# sourceMappingURL=NewsPosts.js.map