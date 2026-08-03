import { Controller, Get, Query, Post, Body } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('Discover & Matching')
@Controller('api/discover')
export class DiscoverController {
  @Get('candidates')
  @ApiOperation({ summary: 'Get candidate deck ranked by compatibility' })
  async getCandidates(@Query('ageMin') ageMin?: number, @Query('maxDistance') maxDistance?: number) {
    return {
      candidates: [
        {
          id: 'usr-101',
          username: 'CyberValkyrie',
          age: 25,
          compatibility: 96,
          distanceKm: 3.2,
          mood: 'Listening to Synthwave',
        },
        {
          id: 'usr-102',
          username: 'PixelKnight',
          age: 28,
          compatibility: 91,
          distanceKm: 5.8,
          mood: 'Hosting Coop Raid',
        },
      ],
    };
  }

  @Post('like')
  @ApiOperation({ summary: 'Like a candidate' })
  async likeCandidate(@Body() body: { candidateId: string }) {
    return {
      message: 'Candidate liked',
      isMatch: true,
    };
  }
}
