/**
 * Роли пользователей в системе
 * @see https://docs.nestjs.com/guards#role-based-authentication
 */
export type Roles = 'admin' | 'user';

/**
 * Базовый интерфейс пользователя
 * Используется для хранения в БД и передачи между сервисами
 */
export interface IUser {
  _id?: string;
  login: string;
  password: string;
  role?: Roles;
}

/**
 * Интерфейс пользователя без пароля (для ответов API)
 */
export interface IUserPublic {
  _id?: string;
  login: string;
  role?: Roles;
}

/**
 * DTO для регистрации нового пользователя
 */
export interface IUserRegister {
  login: string;
  password: string;
  email?: string;
}

/**
 * DTO для входа пользователя
 */
export interface IUserLogin {
  login: string;
  password: string;
}

/**
 * Ответ API при успешной аутентификации
 */
export interface IAuthResponse {
  id: string;
  access_token: string;
  role: Roles;
}

/**
 * Алиас для обратной совместимости
 * @deprecated Используйте IAuthResponse
 */
export type IResponseUser = IAuthResponse;
