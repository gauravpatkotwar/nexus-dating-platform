import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('Admin & Moderation')
@Controller('api/admin')
export class AdminController {
  @Get('metrics')
  @ApiOperation({ summary: 'Get overview dashboard metrics' })
  async getMetrics() {
    return {
      activeUsers: 28490,
      monthlyRevenue: 42850,
      pendingReports: 14,
      pendingVerifications: 8,
    };
  }

  @Post('ban-user')
  @ApiOperation({ summary: 'Ban user for safety violations' })
  async banUser(@Body() body: { userId: string; reason: string }) {
    return {
      message: `User ${body.userId} banned successfully`,
    };
  }
}
