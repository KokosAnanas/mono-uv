import {ArgumentMetadata, BadRequestException, Injectable, PipeTransform} from '@nestjs/common';

@Injectable()
export class UserAuthPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    if (!value || !(value.password && value.login)) {
      throw new BadRequestException('Неверный параметр запроса');
    }
    return value;
  }
}
