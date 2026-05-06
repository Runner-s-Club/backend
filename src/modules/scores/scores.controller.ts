import { Controller, Post, Get, Body, Param, ParseIntPipe } from '@nestjs/common';
import { ScoresService } from './scores.service';

@Controller('scores')
export class ScoresController {
  constructor(private readonly scoresService: ScoresService) {}

  @Post()
  saveScore(@Body() body: { userId: number; score: number; email: string }) {
    return this.scoresService.saveScore(body.userId, body.score, body.email);
  }

  @Get('leaderboard')
  getLeaderboard() {
    return this.scoresService.getLeaderboard();
  }

  @Get(':userId')
  getPlayerBest(@Param('userId', ParseIntPipe) userId: number) {
    return this.scoresService.getPlayerBest(userId);
  }
}
