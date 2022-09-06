import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { AnyFilesInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { extname } from 'path';
import { userDto } from './dto/user.dto';
import { UserService } from './user.service';
import { diskStorage } from 'multer';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiTags('User')
  @ApiBody({
    type: userDto,
  })
  @Post('/addUser')
  @UseInterceptors(
    AnyFilesInterceptor({
      storage: diskStorage({
        destination: './files',
        filename: (req, file, cb) => {
          const randomName = Array(32)
            .fill(null)
            .map(() => Math.round(Math.random() * 16).toString(16))
            .join('');
          cb(null, `${randomName}${extname(file.originalname)}`);
        },
      }),
    }),
  )
  async create(@Body() req: userDto) {
    try {
      const result = await this.userService.Create(req);
      console.log('result', result);

      return result;
    } catch (error) {
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: error.message,
      };
    }
  }

  @ApiTags('User')
  @ApiBody({
    type: userDto,
  })
  @Post('/login')
  async login(@Body() req: userDto) {
    try {
      const result = await this.userService.Login(req);
      return result;
    } catch (error) {
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: error.message,
      };
    }
  }

  @ApiTags('User')
  @Get('/getUsersList')
  async getUsersList() {
    try {
      const getAll = await this.userService.getUsers();
      return getAll;
    } catch (error) {
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: error.message,
      };
    }
  }

  @ApiTags('User')
  @ApiBody({
    type: userDto,
  })
  @Post('/getUserById')
  async getUserById(@Body() req: userDto) {
    try {
      const getUser = await this.userService.getUserThroughId(req);
      return getUser;
    } catch (error) {
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: error.message,
      };
    }
  }

  @ApiTags('User')
  @ApiBody({
    type: userDto,
  })
  @Post('/update')
  async updateUser(@Body() req: userDto) {
    try {
      const moderate = await this.userService.userUpdatation(req);
      return moderate;
    } catch (error) {
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: error.message,
      };
    }
  }

  @ApiTags('User')
  @ApiBody({
    type: userDto,
  })
  @Post('/delete')
  async deleteUser(@Body() req: userDto) {
    try {
      const remove = await this.userService.userDeletion(req);
      return remove;
    } catch (error) {
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: error.message,
      };
    }
  }

}
