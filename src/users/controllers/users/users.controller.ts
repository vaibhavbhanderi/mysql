import { BadRequestException, Body, Controller, Get, Post } from '@nestjs/common';
import { Delete, Param, Put } from '@nestjs/common/decorators';
import { ParseIntPipe } from '@nestjs/common/pipes';
import { creaeteUserDto } from 'src/users/dtos/createuser.dto';
import { UpdateUserDto } from 'src/users/dtos/Updateuser.dto';
import { UsersService } from 'src/users/services/users/users.service';
import { CreateprofileDto } from '../../dtos/createprofile.dto';
import { CreateUserPostDto } from '../../dtos/createUserPost.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Controller('users')
export class UsersController {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService
  ) {
  }

  @Get()
  getUsers() {
    return this.userService.findUsers();
  }

  @Post()
  creaeteUser(@Body() createuserdto: creaeteUserDto) {
    return this.userService.createUser(createuserdto);
  }

  @Put(':id')
  async updateUserById(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateuserdto: UpdateUserDto,
  ) {
    return await this.userService.updateUser(id, updateuserdto);
  }

  @Delete(':id')
  async deleteUserByid(@Param('id', ParseIntPipe) id: number) {
    return await this.userService.deleteUser(id);
  }

  @Post(':id/profiles')
  async createUserProfile(@Param('id', ParseIntPipe) id: number, @Body() createuserProfiledto: CreateprofileDto) {
    return this.userService.createUserprofile(id, createuserProfiledto);
  }

  @Post(':id/posts')
  async createUserPost(@Param('id', ParseIntPipe) id: number, @Body() createUserpostdto: CreateUserPostDto) {
    return this.userService.createUserPost(id, createUserpostdto);
  }

  @Post('login')
  async loginuser(@Body('username')username: string,
                  @Body('password')password: string) {
    const user = await this.userService.loginuserfind(username);
    // console.log(user);
    if (!user) {
      throw new BadRequestException('invalid credentials');
    }

    const passwordvalid = await bcrypt.compare(password, user.password);

    console.log(passwordvalid);
    if (!passwordvalid) {
      throw new BadRequestException('invalid credentials');
    }
    const jwt= await  this.jwtService.signAsync({usename:user.username})
    return jwt;

  }


}
