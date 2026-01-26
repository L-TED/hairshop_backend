import type { CookieOptions, Request } from 'express';

function normalizeCookieDomain(raw: string | undefined): string | undefined {
  if (!raw) return undefined;
  const trimmed = raw.trim();
  if (!trimmed) return undefined;

  // Allow users to accidentally pass a URL (e.g. https://api.example.com)
  const noProtocol = trimmed.replace(/^https?:\/\//i, '');
  const noPath = noProtocol.split('/')[0];
  return noPath || undefined;
}

function toBoolean(raw: string | undefined): boolean | undefined {
  if (!raw) return undefined;
  const value = raw.trim().toLowerCase();
  if (value === 'true' || value === '1') return true;
  if (value === 'false' || value === '0') return false;
  return undefined;
}

export function getAuthCookieBaseOptions(req?: Request): CookieOptions {
  const isProduction = process.env.NODE_ENV === 'production';

  // When running behind a TLS-terminating proxy (e.g. Render), NODE_ENV may not
  // be set to production. Derive HTTPS from the incoming request when possible.
  // Note: `app.set('trust proxy', 1)` is enabled in `src/main.ts`.
  const isRequestSecure = (): boolean => {
    if (!req) return false;
    if (req.secure) return true;
    const forwardedProto = String(req.headers['x-forwarded-proto'] ?? '')
      .split(',')[0]
      .trim()
      .toLowerCase();
    return forwardedProto === 'https';
  };

  const requestSecure = isRequestSecure();

  // Default: secure cookies for HTTPS requests or in production.
  // Override with COOKIE_SECURE=true/false when needed.
  let secure =
    toBoolean(process.env.COOKIE_SECURE) ?? (isProduction || requestSecure);

  // Default: SameSite=None when secure (cross-site), else Lax for local HTTP.
  let sameSite =
    (process.env.COOKIE_SAMESITE as CookieOptions['sameSite']) ??
    (secure ? 'none' : 'lax');

  // Browsers reject SameSite=None without Secure.
  if (sameSite === 'none') secure = true;

  const domain = normalizeCookieDomain(process.env.COOKIE_DOMAIN);

  return {
    httpOnly: true,
    sameSite,
    secure,
    path: '/',
    ...(domain ? { domain } : null),
  };
}

export function getAccessTokenCookieOptions(req?: Request): CookieOptions {
  return {
    ...getAuthCookieBaseOptions(req),
    maxAge: 15 * 60 * 1000,
  };
}

export function getRefreshTokenCookieOptions(req?: Request): CookieOptions {
  return {
    ...getAuthCookieBaseOptions(req),
    maxAge: 7 * 24 * 60 * 60 * 1000,
  };
}

export function getClearAuthCookieOptions(req?: Request): CookieOptions {
  // clearCookie needs the same path/domain/samesite/secure to match
  return {
    ...getAuthCookieBaseOptions(req),
  };
}
