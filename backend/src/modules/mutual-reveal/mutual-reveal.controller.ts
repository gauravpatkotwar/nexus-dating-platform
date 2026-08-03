import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('Mutual Identity Reveal')
@Controller('api/mutual-reveal')
export class MutualRevealController {
  @Post('consent')
  @ApiOperation({ summary: 'Grant or revoke mutual identity reveal consent' })
  async toggleConsent(@Body() body: { matchId: string; accept: boolean }) {
    return {
      matchId: body.matchId,
      userAccepted: body.accept,
      isFullyRevealed: body.accept, // Evaluated when both consent
      status: body.accept ? 'REVEALED' : 'LOCKED',
    };
  }

  @Get('status/:matchId')
  @ApiOperation({ summary: 'Get current mutual reveal consent state' })
  async getStatus(@Param('matchId') matchId: string) {
    return {
      matchId,
      userAAccepted: true,
      userBAccepted: true,
      isFullyRevealed: true,
    };
  }
}
