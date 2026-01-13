/**
 * JWT конфигурация
 * Секретный ключ ОБЯЗАТЕЛЬНО должен быть задан через переменную окружения JWT_SECRET
 * @see https://docs.nestjs.com/security/authentication#jwt-token
 */
export const jwtConstants = {
    // В продакшене JWT_SECRET должен быть длинной случайной строкой (минимум 32 символа)
    // Генерация: node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
    secret: process.env.JWT_SECRET || 'dev-only-change-in-production',
};