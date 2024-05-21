import { User } from './entities/user.entity';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
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

  // 修改用户信息
  async updateInfo(id, updateUser: UpdateUserDto) {
    const { nickname, avatar, email, github, csdn, juejin, role, intro, warehouseFacePage } = updateUser;
    const user = this.userRepository.findOne({ where: { id } });
    if (!user) throw new HttpException('用户不存在', HttpStatus.BAD_REQUEST);
    if (nickname && nickname !== undefined) (await user).nickname = nickname;
    if (avatar && avatar !== undefined) (await user).avatar = avatar;
    if (email && email !== undefined) (await user).email = email;
    if (github && github !== undefined) (await user).github = github;
    if (csdn && csdn !== undefined) (await user).csdn = csdn;
    if (juejin && juejin !== undefined) (await user).juejin = juejin;
    if (role && role !== undefined) (await user).role = role;
    if (intro && intro !== undefined) (await user).intro = intro;
    if (warehouseFacePage && warehouseFacePage !== undefined) (await user).warehouseFacePage = warehouseFacePage;
    await this.userRepository.save(await user);
    return await this.userRepository.findOne({ where: { id } });
  }

  async findOne(id) {
    return await this.userRepository.findOne({ where: { id } });
  }
}
