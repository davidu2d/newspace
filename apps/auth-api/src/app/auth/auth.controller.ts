import { Controller, Post, Request, Headers, UseGuards, Get, Body } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiHeader, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(AuthGuard('basic'))
  @Post('token')
  @ApiOperation({ summary: 'Get Access Token' })
  @ApiResponse({ status: 201, description: 'Created' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiHeader({
    name: 'Authorization',
    description: 'Authorization type Basic. Example: "Authorization: Basic dGVzdGVAdGVzdGUuY29tOjEyMzQ1Ng=="',
  })
  async create(@Body() createAuthDto: CreateAuthDto, @Headers('Authorization') basic: string) {
    const user = await this.authService.decodeUsernameAndPassword(basic);
    return this.authService.getAccessToken(user);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('profile')
  getProfile(@Request() req) {
      return req.user;
  }
}
