import { Controller, Get } from '@nestjs/common';
import { AppService } from '../services/app.service';
import { Greetings } from 'src/utils/types';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): Greetings {
    return this.appService.getHello();
  }
}
