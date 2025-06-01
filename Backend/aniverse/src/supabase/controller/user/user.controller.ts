import {
  Controller,
  Body,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreateUserDTo } from 'src/DTOs/create-user.dto';
import { EmailDto } from 'src/DTOs/email.dto';
import { UserService } from 'src/supabase/service/user/user.service';
@Controller('supabase/user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Post('/create')
  create(@Body() createUserDto: CreateUserDTo) {
    return this.userService.createUser(createUserDto);
  }
  @Post('/customize/profile/image')
  @UseInterceptors(FileInterceptor('file'))
  uploadProfile(
    @UploadedFile() file: Express.Multer.File,
    @Body() body: EmailDto,
  ) {
    return this.userService.updateProfile(file, body.email);
  }

  @Post('/customize/email')
  updateEmail(@Body() body: { email: string; NewEmail: string }) {
    console.log(body.email, body.NewEmail);
    return this.userService.updateEmail(body.email, body.NewEmail);
  }

  @Post('/customize/username')
  updateUsername(@Body() body: { username: string; email: string }) {
    return this.userService.updateUsername(body.username, body.email);
  }
}
