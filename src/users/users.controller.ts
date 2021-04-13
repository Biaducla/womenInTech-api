import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from './users.service';

@Controller('users')
export class UsersController {
  private userService = new UserService();
  @Post()
  public ceateUser(@Body() user: any) {
    const createdUser = this.userService.createUser(user);
    return createdUser;
  }
}
