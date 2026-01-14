/**
 * Реэкспорт базовых интерфейсов из shared библиотеки
 * @see https://nx.dev/concepts/more-concepts/library-types
 */
export type { INotice, INoticeViolation, ICreateNoticeDto } from '@uvedomlenie/shared';

import { FormArray, FormControl, FormGroup } from '@angular/forms';

/**
 * Angular Reactive Forms типы для формы уведомления
 * Эти типы специфичны для Angular и не могут быть вынесены в shared
 * @see https://angular.dev/guide/forms/typed-forms
 */
export type INoticeFormGroup = {
  orgName: FormControl<string>;
  noticeNum: FormControl<string>;
  noticeDate: FormControl<string | Date>;
  toWhom: FormControl<string>;
  copyTo: FormControl<string>;
  specialist: FormControl<string>;
  present: FormControl<string>;
  objectName: FormControl<string>;
  workType: FormControl<string>;
  violations: FormArray<FormGroup<INoticeViolationForm>>;
  actions: FormControl<string>;
  contacts: FormControl<string>;
  photos: FormControl<string[]>;
};

export type INoticeViolationForm = {
  place: FormControl<string>;
  element: FormControl<string>;
  subject: FormControl<string>;
  norm: FormControl<string>;
  deadline: FormControl<string | Date>;
  note: FormControl<string>;
};

/**
 * DTO для создания уведомления (legacy alias)
 * @deprecated Используйте ICreateNoticeDto из @uvedomlenie/shared
 */
export type CreateNoticeDto = {
  orgName: string;
  noticeNum: string;
  noticeDate: string;
  toWhom: string;
  copyTo: string;
  specialist: string;
  present: string;
  objectName: string;
  workType: string;
  violations: Array<{
    place: string;
    element: string;
    subject: string;
    norm: string;
    deadline: string;
    note?: string | null;
  }>;
  actions: string;
  contacts: string;
  photos: string[];
};