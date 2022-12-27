import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/typeorm/entity/User';
import { UsersController } from './controllers/users/users.controller';
import { UsersService } from './services/users/users.service';
import { Profile } from '../typeorm/entity/Profile';
import { Post } from '../typeorm/entity/Post';
import { JwtModule } from '@nestjs/jwt';

@Module({


  imports: [TypeOrmModule.forFeature([User,Profile,Post]),JwtModule.register({
    secret:"ewuhwqe0iodpka[pd",
    signOptions:{expiresIn:"1d"}
  })],

  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
