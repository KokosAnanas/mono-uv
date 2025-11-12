import {Controller, Get, Post} from '@nestjs/common';

@Controller()
export class AppController {
  constructor() {
  }

  @Get()
  getHello(): string {
    return "hi";
  }
  @Post()
  sendAll(): string {
    return "post data";
  }

}
