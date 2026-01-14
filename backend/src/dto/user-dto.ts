import { IUser } from '@uvedomlenie/shared';
import { IsNotEmpty, IsString, MinLength, MaxLength } from 'class-validator';

/**
 * DTO для создания/аутентификации пользователя
 * @see https://docs.nestjs.com/techniques/validation
 * @see https://github.com/typestack/class-validator#validation-decorators
 */
export class UserDto implements IUser {
    @IsNotEmpty({ message: 'Логин не может быть пустым' })
    @IsString({ message: 'Логин должен быть строкой' })
    @MinLength(3, { message: 'Логин должен содержать минимум 3 символа' })
    @MaxLength(50, { message: 'Логин не может превышать 50 символов' })
    login: string;

    @IsNotEmpty({ message: 'Пароль не может быть пустым' })
    @IsString({ message: 'Пароль должен быть строкой' })
    @MinLength(6, { message: 'Пароль должен содержать минимум 6 символов' })
    @MaxLength(100, { message: 'Пароль не может превышать 100 символов' })
    password: string;
}
