import { User } from './entities/user.entity';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}
  // 用户注册
  async register(createUser: CreateUserDto) {
    const { username } = createUser;

    const existUser = await this.userRepository.findOne({
      where: { username },
    });
    if (existUser) throw new HttpException('用户名已存在', HttpStatus.BAD_REQUEST);
    const newUser = this.userRepository.create(createUser);
    await this.userRepository.save(newUser);
    return await this.userRepository.findOne({ where: { username } });
  }

  async findOne(id) {
    console.log(id);
    return await this.userRepository.findOne({ where: { id } });
  }
}
