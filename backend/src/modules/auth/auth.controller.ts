import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('Authentication')
@Controller('api/auth')
export class AuthController {
  @Post('register')
  @ApiOperation({ summary: 'Register a new anonymous 18+ adult user' })
  async register(@Body() body: any) {
    return {
      message: 'User registered successfully',
      user: { id: 'usr-101', email: body.email, isVerified18: true },
      accessToken: 'jwt_mock_token_nexus_18_plus',
    };
  }

  @Post('login')
  @ApiOperation({ summary: 'Authenticate user with email and password' })
  async login(@Body() body: any) {
    return {
      message: 'Login successful',
      accessToken: 'jwt_mock_token_nexus_18_plus',
    };
  }

  @Post('google')
  @ApiOperation({ summary: 'Authenticate with Google OAuth' })
  async googleAuth(@Body() body: any) {
    return {
      message: 'Google login successful',
      accessToken: 'jwt_mock_token_nexus_google',
    };
  }
}
