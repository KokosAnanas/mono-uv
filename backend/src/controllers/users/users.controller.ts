import {
    Body,
    Controller,
    Delete,
    ForbiddenException,
    Get,
    HttpException,
    HttpStatus,
    Param,
    Post,
    Put,
    Request,
    UseGuards,
} from '@nestjs/common';
import { UsersService } from '../../services/users/users.service';
import { User } from '../../shemas/user';
import { UserDto } from '../../dto/user-dto';
import { UserAuthPipe } from '../../pipes/user.pipe';
import { JwtAuthGuard } from '../../services/authentication/jwt-auth.guard/jwt-auth.guard.service';
import { Public } from '../../auth/public.decorator';

/**
 * Контроллер пользователей
 * По умолчанию все эндпоинты защищены JWT (через глобальный guard)
 * Публичные эндпоинты помечены декоратором @Public()
 * @see https://docs.nestjs.com/security/authentication#enable-authentication-globally
 */
@Controller('users')
export class UsersController {
    constructor(private userService: UsersService) {}

    /**
     * Получение списка пользователей (только для админов)
     * ЗАЩИЩЕНО: требуется JWT токен + роль admin
     */
    @UseGuards(JwtAuthGuard)
    @Get()
    async getAllUsers(@Request() req): Promise<User[]> {
        // Проверяем роль пользователя из JWT payload
        if (req.user?.role !== 'admin') {
            throw new ForbiddenException('Доступ запрещён. Требуется роль администратора.');
        }
        return this.userService.getAllUsers();
    }

    /**
     * Получение пользователя по ID
     * ЗАЩИЩЕНО: требуется JWT токен
     */
    @UseGuards(JwtAuthGuard)
    @Get(':id')
    getUserById(@Param('id') id: string): Promise<User | null> {
        return this.userService.getUserById(id);
    }

    /**
     * Регистрация нового пользователя
     * ПУБЛИЧНЫЙ эндпоинт - доступен без авторизации
     * @see https://docs.nestjs.com/security/authentication#login-route
     */
    @Public()
    @Post()
    async sendUser(@Body(UserAuthPipe) data: UserDto): Promise<boolean> {
        const existingUsers = await this.userService.checkRegUser(data.login);

        if (existingUsers.length > 0) {
            throw new HttpException(
                {
                    status: HttpStatus.CONFLICT,
                    errorText: 'Пользователь уже существует',
                },
                HttpStatus.CONFLICT,
            );
        }

        return this.userService.sendUser(data);
    }

    /**
     * Аутентификация пользователя (логин)
     * ПУБЛИЧНЫЙ эндпоинт - доступен без авторизации
     * @see https://docs.nestjs.com/security/authentication#login-route
     */
    @Public()
    @Post(':login')
    authUser(@Body(UserAuthPipe) data: UserDto) {
        return this.userService.login(data);
    }

    /**
     * Обновление данных пользователя
     * ЗАЩИЩЕНО: требуется JWT токен
     */
    @UseGuards(JwtAuthGuard)
    @Put(':id')
    updateUsers(@Param('id') id: string, @Body() data: UserDto): Promise<User | null> {
        return this.userService.updateUsers(id, data);
    }

    /**
     * Удаление ВСЕХ пользователей (только для админов)
     * ЗАЩИЩЕНО: требуется JWT токен + роль admin
     * ВНИМАНИЕ: Опасная операция!
     */
    @UseGuards(JwtAuthGuard)
    @Delete()
    async deleteUsers(@Request() req) {
        // Только администратор может удалять всех пользователей
        if (req.user?.role !== 'admin') {
            throw new ForbiddenException('Доступ запрещён. Требуется роль администратора.');
        }
        return this.userService.deleteUsers();
    }

    /**
     * Удаление пользователя по ID (только для админов)
     * ЗАЩИЩЕНО: требуется JWT токен + роль admin
     */
    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    async deleteUserById(@Param('id') id: string, @Request() req): Promise<User | null> {
        // Только администратор может удалять пользователей
        if (req.user?.role !== 'admin') {
            throw new ForbiddenException('Доступ запрещён. Требуется роль администратора.');
        }
        return this.userService.deleteUserById(id);
    }
}
