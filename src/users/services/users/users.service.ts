import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/typeorm/entity/User';
import {

  CreatePostsParams,
  CreateProfileParams,
  CreateUserParams,
  UpdateUserParams,
} from 'src/users/utils/type';
import { Repository } from 'typeorm';
import { Profile } from '../../../typeorm/entity/Profile';
import { Post } from '../../../typeorm/entity/Post';
import { encodepassword } from '../../../Utils/bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Profile) private ProfileRepository: Repository<Profile>,
    @InjectRepository(Post) private PostRepository: Repository<Post>,
  ) {
  }

  findUsers() {
    return this.userRepository.find();
  }

  createUser(UserDetails: CreateUserParams) {
    const password = encodepassword(UserDetails.password);
    console.log(password);
    const newUser = this.userRepository.create({
      ...UserDetails, password,
      createAt: new Date(),
    });
    // console.log(newUser);

    return this.userRepository.save(newUser);
  }

  updateUser(id: number, updateuserdetails: UpdateUserParams) {
    return this.userRepository.update({ id }, { ...updateuserdetails });
  }

  deleteUser(id: number) {
    return this.userRepository.delete({ id });
  }

  async createUserprofile(id: number, ProfileDetails: CreateProfileParams) {
    const user = await this.userRepository.findOneBy({ id });
    if (!user) throw new HttpException('User not found cannot create profile', HttpStatus.BAD_REQUEST);
    const newprofile = this.ProfileRepository.create(ProfileDetails);
    const saveprofile = await this.ProfileRepository.save(newprofile);
    user.profile = saveprofile;
    return this.userRepository.save(user);
  }

  async createUserPost(id: number, createuserpostsdetails: CreatePostsParams) {
    const user = await this.userRepository.findOneBy({ id });
    if (!user) throw new HttpException('User not found cannot create profile', HttpStatus.BAD_REQUEST);
    const newpost = this.PostRepository.create({ ...createuserpostsdetails, user });
    return this.PostRepository.save(newpost);


  }

  // login part
  async loginuserfind(username:string) {
 return  await this.userRepository.findOneBy({username})
  }


}

