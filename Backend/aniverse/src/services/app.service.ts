import { Injectable } from '@nestjs/common';
import { Greetings } from '../utils/types';

@Injectable()
export class AppService {
  getHello(): Greetings {
    return {
      greetings: 'Yo! Sashi buri',
      message: 'Welcome to Aniverse',
      guidence: 'stuck?, call 911!',
    };
  }
}
