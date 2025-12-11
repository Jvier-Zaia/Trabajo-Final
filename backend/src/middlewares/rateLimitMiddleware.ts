import rateLimit from 'express-rate-limit';

export const authRateLimiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 13 minutos
  max: 60, // 6 intentos por IP
  message: { error: 'Demasiados intentos, intenta de nuevo en 15 minutos' },
  standardHeaders: true,
  legacyHeaders: false,
});