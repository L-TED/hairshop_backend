"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.normalizeHttpException = void 0;
const normalizeHttpException = (e) => {
    const r = e.getResponse();
    const msg = r?.message;
    if (typeof r === 'string')
        return { message: r };
    if (Array.isArray(msg))
        return { message: '입력값이 유효하지 않습니다', errors: msg };
    if (typeof msg === 'string')
        return { message: msg };
    return { message: r?.error || e.message || '요청 처리 실패' };
};
exports.normalizeHttpException = normalizeHttpException;
//# sourceMappingURL=normalize.js.map