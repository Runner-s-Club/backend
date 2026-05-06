import { Injectable } from '@nestjs/common';
import { PrismaService } from '../providers/prisma.service';

@Injectable()
export class ScoresService {
  constructor(private prisma: PrismaService) {}

  async saveScore(userId: number, score: number, email: string) {
    await this.prisma.user.upsert({
      where: { id: userId },
      create: { id: userId, email: email },
      update: {},
    });

    const player = await this.prisma.player.upsert({
      where: { userId },
      create: { userId },
      update: {},
    });

    await this.prisma.score.create({
      data: { score, playerId: player.id },
    });

    return { success: true };
  }

  async getLeaderboard() {
    const players = await this.prisma.player.findMany({
      include: {
        scores: {
          orderBy: { score: 'desc' },
          take: 1,
        },
      },
    });

    return players
      .filter((p) => p.scores.length > 0)
      .map((p) => ({
        userId: p.userId,
        score: p.scores[0].score,
      }))
      .sort((a, b) => b.score - a.score)
      .slice(0, 10);
  }

  async getPlayerBest(userId: number) {
    const player = await this.prisma.player.findUnique({
      where: { userId },
    });

    if (!player) return { score: 0 };

    const best = await this.prisma.score.findFirst({
      where: { playerId: player.id },
      orderBy: { score: 'desc' },
    });

    return { score: best?.score ?? 0 };
  }
}
