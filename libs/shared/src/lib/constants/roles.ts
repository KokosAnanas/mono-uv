import { Roles } from '../interfaces';

/**
 * Константы ролей для использования в guards и декораторах
 * @see https://docs.nestjs.com/guards#role-based-authentication
 */
export const ROLES = {
  ADMIN: 'admin' as Roles,
  USER: 'user' as Roles,
} as const;

/**
 * Список всех доступных ролей
 */
export const ALL_ROLES: Roles[] = [ROLES.ADMIN, ROLES.USER];
