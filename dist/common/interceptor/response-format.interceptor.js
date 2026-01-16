"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResponseFormatInterceptor = void 0;
const common_1 = require("@nestjs/common");
const rxjs_1 = require("rxjs");
let ResponseFormatInterceptor = class ResponseFormatInterceptor {
    intercept(context, next) {
        const now = Date.now();
        return next.handle().pipe((0, rxjs_1.map)((data) => ({
            success: true,
            message: '요청이 성공적으로 처리되었습니다.',
            data,
            meta: {
                path: context.switchToHttp().getRequest().url,
                timestamp: new Date().toLocaleString('ko-KR', {
                    timeZone: 'Asia/Seoul',
                    year: 'numeric',
                    month: '2-digit',
                    day: '2-digit',
                    hour: '2-digit',
                    minute: '2-digit',
                    second: '2-digit',
                    hour12: false,
                }),
                responseTime: `${Date.now() - now}ms`,
            },
        })));
    }
};
exports.ResponseFormatInterceptor = ResponseFormatInterceptor;
exports.ResponseFormatInterceptor = ResponseFormatInterceptor = __decorate([
    (0, common_1.Injectable)()
], ResponseFormatInterceptor);
//# sourceMappingURL=response-format.interceptor.js.map