import { Controller, Get } from '@nestjs/common';
import { LeaderboardsService } from '../../services/leaderboards/leaderboards.service';
@Controller('leaderboards')
export class LeaderboardsController {
  constructor(private readonly leaderboardsService: LeaderboardsService) {}
  @Get()
  async getLeaderboards() {
    return await this.leaderboardsService.getLatest();
  }
}
