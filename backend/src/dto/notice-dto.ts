import { INotice, INoticeViolation } from '@uvedomlenie/shared';
import {
    IsString,
    IsNotEmpty,
    IsArray,
    IsOptional,
    IsDateString,
    ValidateNested,
    MaxLength,
} from 'class-validator';
import { Type } from 'class-transformer';

/**
 * DTO для валидации нарушения в уведомлении
 * @see https://docs.nestjs.com/techniques/validation#validating-nested-objects
 */
export class NoticeViolationDto implements INoticeViolation {
    @IsString()
    @IsOptional()
    place: string;

    @IsString()
    @IsOptional()
    element: string;

    @IsString()
    @IsOptional()
    subject: string;

    @IsString()
    @IsOptional()
    norm: string;

    @IsDateString({}, { message: 'Некорректный формат даты срока устранения' })
    @IsOptional()
    deadline: Date;

    @IsString()
    @IsOptional()
    note: string;
}

/**
 * DTO для создания/обновления уведомления
 * @see https://docs.nestjs.com/techniques/validation
 * @see https://github.com/typestack/class-validator#validation-decorators
 */
export class NoticeDto implements INotice {
    @IsString({ message: 'Название организации должно быть строкой' })
    @IsNotEmpty({ message: 'Название организации обязательно' })
    @MaxLength(500, { message: 'Название организации не может превышать 500 символов' })
    orgName: string;

    @IsString({ message: 'Номер уведомления должен быть строкой' })
    @IsNotEmpty({ message: 'Номер уведомления обязателен' })
    @MaxLength(100, { message: 'Номер уведомления не может превышать 100 символов' })
    noticeNum: string;

    @IsDateString({}, { message: 'Некорректный формат даты уведомления' })
    @IsNotEmpty({ message: 'Дата уведомления обязательна' })
    noticeDate: Date;

    @IsString()
    @IsOptional()
    toWhom: string;

    @IsString()
    @IsOptional()
    copyTo: string;

    @IsString()
    @IsOptional()
    specialist: string;

    @IsString()
    @IsOptional()
    present: string;

    @IsString()
    @IsOptional()
    objectName: string;

    @IsString()
    @IsOptional()
    workType: string;

    @IsArray({ message: 'Нарушения должны быть массивом' })
    @ValidateNested({ each: true })
    @Type(() => NoticeViolationDto)
    @IsOptional()
    violations: INoticeViolation[] = [];

    @IsString()
    @IsOptional()
    actions: string;

    @IsString()
    @IsOptional()
    contacts: string;

    @IsArray({ message: 'Фотографии должны быть массивом' })
    @IsString({ each: true, message: 'Каждое имя файла должно быть строкой' })
    @IsOptional()
    photos: string[] = [];

    constructor(init?: Partial<INotice>) {
        Object.assign(this, init);
    }
}
