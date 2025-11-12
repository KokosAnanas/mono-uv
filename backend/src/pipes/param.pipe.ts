import {ArgumentMetadata, BadRequestException, Injectable, PipeTransform} from '@nestjs/common';

@Injectable()
export class ValidationParamIdPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    if (typeof value !== 'string' || value.length < 24 ) {
      throw new BadRequestException("Неверный параметр запроса")
    }
    return value;
  }
}
