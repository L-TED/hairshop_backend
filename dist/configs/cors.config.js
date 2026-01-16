"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.corsConfig = void 0;
function normalizeOrigin(origin) {
    return origin.trim().replace(/\/$/, '');
}
function tryParseOrigin(origin) {
    try {
        return new URL(origin);
    }
    catch {
        return undefined;
    }
}
function parseWildcardPattern(pattern) {
    const raw = pattern.trim();
    if (!raw)
        return undefined;
    const hasScheme = raw.includes('://');
    const [scheme, hostPattern] = hasScheme ? raw.split('://', 2) : ['', raw];
    const host = (hostPattern || '').trim();
    if (!host.startsWith('*.'))
        return undefined;
    const hostSuffix = host.slice(1);
    if (!hostSuffix.startsWith('.') || hostSuffix.length < 3)
        return undefined;
    return {
        scheme: hasScheme ? scheme.toLowerCase() : undefined,
        hostSuffix: hostSuffix.toLowerCase(),
    };
}
function isOriginAllowed(origin, allowList) {
    const normalized = normalizeOrigin(origin);
    if (allowList.includes(normalized))
        return true;
    const url = tryParseOrigin(normalized);
    if (!url)
        return false;
    const hostname = url.hostname.toLowerCase();
    const scheme = url.protocol.replace(':', '').toLowerCase();
    for (const item of allowList) {
        const wildcard = parseWildcardPattern(item);
        if (!wildcard)
            continue;
        if (wildcard.scheme && wildcard.scheme !== scheme)
            continue;
        if (hostname.endsWith(wildcard.hostSuffix) &&
            hostname !== wildcard.hostSuffix.slice(1)) {
            return true;
        }
    }
    return false;
}
const defaultOrigins = [
    'https://leafpost-front-final.vercel.app',
    ...(process.env.FRONTEND_ORIGIN ? [process.env.FRONTEND_ORIGIN] : []),
].map(normalizeOrigin);
function parseOrigins(raw) {
    const fromEnv = (raw ?? '')
        .split(',')
        .map((s) => s.trim())
        .filter(Boolean)
        .map(normalizeOrigin);
    const merged = [...defaultOrigins, ...fromEnv];
    return Array.from(new Set(merged));
}
const allowedOrigins = parseOrigins(process.env.CORS_ORIGINS);
exports.corsConfig = {
    origin: (origin, callback) => {
        if (!origin)
            return callback(null, true);
        if (isOriginAllowed(origin, allowedOrigins))
            return callback(null, true);
        console.warn('[CORS] Blocked origin:', origin, 'Allowed:', allowedOrigins);
        return callback(new Error('Not allowed by CORS'));
    },
    credentials: true,
    methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE', 'OPTIONS'],
    optionsSuccessStatus: 200,
};
//# sourceMappingURL=cors.config.js.map