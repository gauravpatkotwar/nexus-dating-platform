import { Controller, Get, Put, Body, Param } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('Users & Profiles')
@Controller('api/users')
export class UsersController {
  @Get('me')
  @ApiOperation({ summary: 'Get current authenticated user profile & avatar' })
  async getProfile() {
    return {
      id: 'usr-me',
      username: 'CyberValkyrie',
      age: 25,
      isVerified18: true,
      coinsBalance: 250,
      avatar: {
        theme: 'cyberpunk',
        hairStyle: 'neon-spikes',
        hairColor: '#06B6D4',
        eyeColor: '#7C3AED',
      },
    };
  }

  @Put('avatar')
  @ApiOperation({ summary: 'Update vector avatar configuration' })
  async updateAvatar(@Body() avatarConfig: any) {
    return {
      message: 'Avatar updated successfully',
      avatar: avatarConfig,
    };
  }
}
