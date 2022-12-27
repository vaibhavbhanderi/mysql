import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { User } from './typeorm/entity/User';
import { UsersModule } from './users/users.module';
import { Profile } from './typeorm/entity/Profile';
import { Post } from './typeorm/entity/Post';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port:49153,
      username: 'root',
      password: 'mysqlpw',
      database: 'demo1',
      entities: [User,Post,Profile],
      synchronize: true,
    }),
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
