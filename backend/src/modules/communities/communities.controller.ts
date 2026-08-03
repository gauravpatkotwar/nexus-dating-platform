import { Controller, Get, Post, Body } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('Communities & Hubs')
@Controller('api/communities')
export class CommunitiesController {
  @Get()
  @ApiOperation({ summary: 'List all public community groups' })
  async getCommunities() {
    return [
      { id: 'comm-gamers', title: 'Cyber Gamers & Streamers', category: 'Gaming', membersCount: 14200 },
      { id: 'comm-nightlife', title: 'Night Owls & Techno Underground', category: 'Nightlife', membersCount: 8900 },
    ];
  }

  @Post('posts')
  @ApiOperation({ summary: 'Create an anonymous post in a community' })
  async createPost(@Body() body: any) {
    return {
      message: 'Post created successfully',
      post: { id: `p-${Date.now()}`, ...body },
    };
  }
}
