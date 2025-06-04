import { Controller, Get } from '@nestjs/common';
import { ReadingsService } from 'src/services/readings/readings.service';
@Controller('readings')
export class ReadingsController {
  constructor(private readonly readingsService: ReadingsService) {}

  @Get('manhwas')
  async fetchManhwas() {
    return this.readingsService.fetchManhwas();
  }

  @Get('light-novels')
  async fetchLight_Novels() {
    return this.readingsService.fetchLight_Novels();
  }
}
