/**
 * @uvedomlenie/shared
 *
 * Общая библиотека для монорепозитория Uvedomlenie.
 * Содержит переиспользуемые интерфейсы и константы для frontend и backend.
 *
 * @example
 * // Импорт в backend (NestJS)
 * import { IUser, INotice, ROLES } from '@uvedomlenie/shared';
 *
 * // Импорт в frontend (Angular)
 * import { IUser, INotice, ROLES } from '@uvedomlenie/shared';
 *
 * @see https://nx.dev/concepts/more-concepts/library-types
 */

// Interfaces
export * from './lib/interfaces';

// Constants
export * from './lib/constants';
