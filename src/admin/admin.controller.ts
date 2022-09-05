import { Controller } from '@nestjs/common';
import { Body, Get, HttpStatus, Post, UploadedFiles } from '@nestjs/common';
import { adminDto } from './dto/admin.dto';
import { ApiTags, ApiBearerAuth, ApiConsumes, ApiBody } from '@nestjs/swagger';
import { AdminService } from './admin.service';

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}
  @ApiTags('Admin')
  @ApiBody({
    type: adminDto,
  })
  @Post('/register')
  async create(@Body() req: adminDto) {
    try {
      const result = await this.adminService.Create(req);
      console.log('result', result);

      return result;
    } catch (error) {
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: error.message,
      };
    }
  }

  @ApiTags('Admin')
  @ApiBody({
    type: adminDto,
  })
  @Post('/login')
  async login(@Body() req: adminDto) {
    try {
      const result = await this.adminService.Login(req);
      return result;
    } catch (error) {
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: error.message,
      };
    }
  }
}
