"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAuthCookieBaseOptions = getAuthCookieBaseOptions;
exports.getAccessTokenCookieOptions = getAccessTokenCookieOptions;
exports.getRefreshTokenCookieOptions = getRefreshTokenCookieOptions;
exports.getClearAuthCookieOptions = getClearAuthCookieOptions;
function normalizeCookieDomain(raw) {
    if (!raw)
        return undefined;
    const trimmed = raw.trim();
    if (!trimmed)
        return undefined;
    const noProtocol = trimmed.replace(/^https?:\/\//i, '');
    const noPath = noProtocol.split('/')[0];
    return noPath || undefined;
}
function toBoolean(raw) {
    if (!raw)
        return undefined;
    const value = raw.trim().toLowerCase();
    if (value === 'true' || value === '1')
        return true;
    if (value === 'false' || value === '0')
        return false;
    return undefined;
}
function getAuthCookieBaseOptions() {
    const isProduction = process.env.NODE_ENV === 'production';
    let secure = toBoolean(process.env.COOKIE_SECURE) ?? isProduction;
    let sameSite = process.env.COOKIE_SAMESITE ??
        (secure ? 'none' : 'lax');
    if (sameSite === 'none')
        secure = true;
    const domain = normalizeCookieDomain(process.env.COOKIE_DOMAIN);
    return {
        httpOnly: true,
        sameSite,
        secure,
        path: '/',
        ...(domain ? { domain } : null),
    };
}
function getAccessTokenCookieOptions() {
    return {
        ...getAuthCookieBaseOptions(),
        maxAge: 15 * 60 * 1000,
    };
}
function getRefreshTokenCookieOptions() {
    return {
        ...getAuthCookieBaseOptions(),
        maxAge: 7 * 24 * 60 * 60 * 1000,
    };
}
function getClearAuthCookieOptions() {
    return {
        ...getAuthCookieBaseOptions(),
    };
}
//# sourceMappingURL=cookie-options.js.map