/**
 * Нарушение в уведомлении
 * Описывает конкретное нарушение с местом, элементом, нормой и сроком устранения
 */
export interface INoticeViolation {
  /** Место нарушения (этаж, помещение) */
  place: string;
  /** Строительный элемент */
  element: string;
  /** Предмет нарушения */
  subject: string;
  /** Нормативный документ (СНиП, ГОСТ и т.д.) */
  norm: string;
  /** Срок устранения */
  deadline: Date | string;
  /** Примечание */
  note?: string | null;
}

/**
 * Уведомление о нарушениях
 * Основной документ системы - содержит информацию о проверке и выявленных нарушениях
 */
export interface INotice {
  /** MongoDB ObjectId */
  _id?: string;
  /** Наименование организации */
  orgName: string;
  /** Номер уведомления */
  noticeNum: string;
  /** Дата уведомления */
  noticeDate: Date | string;
  /** Кому адресовано */
  toWhom: string;
  /** Копия */
  copyTo: string;
  /** Специалист */
  specialist: string;
  /** Присутствовали при проверке */
  present?: string;
  /** Наименование объекта */
  objectName: string;
  /** Вид работ */
  workType: string;
  /** Список нарушений */
  violations: INoticeViolation[];
  /** Предпринятые действия */
  actions: string;
  /** Контактные данные */
  contacts?: string;
  /** Прикреплённые фотографии (пути к файлам) */
  photos: string[];
}

/**
 * DTO для создания нового уведомления
 */
export interface ICreateNoticeDto extends Omit<INotice, '_id'> {}

/**
 * DTO для обновления уведомления
 */
export interface IUpdateNoticeDto extends Partial<INotice> {}
