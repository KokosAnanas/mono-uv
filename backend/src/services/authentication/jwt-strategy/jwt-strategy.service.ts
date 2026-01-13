import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { jwtConstants } from '../../../static/privat/constants';

/**
 * JWT стратегия для валидации токенов
 * @see https://docs.nestjs.com/security/authentication#implementing-passport-jwt
 */
@Injectable()
export class JwtStrategyService extends PassportStrategy(Strategy) {
    constructor() {
        super({
            // Извлекаем токен из заголовка Authorization: Bearer <token>
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            // Не игнорируем истечение срока токена
            ignoreExpiration: false,
            secretOrKey: jwtConstants.secret,
        });
    }

    /**
     * Валидация payload из JWT токена
     * Возвращаемый объект будет доступен в request.user
     * @see https://docs.nestjs.com/security/authentication#implementing-passport-jwt
     */
    async validate(payload: { sub: string; login: string; role: string }) {
        // Возвращаем объект пользователя, который будет доступен через @Request() req
        return {
            userId: payload.sub,
            login: payload.login,
            role: payload.role,
        };
    }
}
