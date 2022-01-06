import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { PageableDto } from '../dto/pageable.dto';

@Injectable()
export class UsersService {

constructor(
  @InjectRepository(User)
  private readonly userRepository: Repository<User>
) {}

  create(createUserDto: CreateUserDto): Promise<CreateUserDto> {
    const user = new User();
    user.name = createUserDto.name;
    user.username = createUserDto.username;
    user.password = bcrypt.hashSync(createUserDto.password, 8);
    return this.userRepository.save(user);
  }

  async findAll(): Promise<CreateUserDto[]> {
    const listUser = await this.userRepository.find();
    if (listUser.length < 1) {
      throw new HttpException(listUser, HttpStatus.NO_CONTENT);
    }
    return listUser;
  }

  async findAllPageable(pageable: PageableDto): Promise<CreateUserDto[]> {
    const listUser = await this.userRepository.find({skip: pageable.page, take: pageable.size});
    if (listUser.length < 1) {
        throw new HttpException(listUser, HttpStatus.NO_CONTENT);
    }
    return listUser;
  }

  async findOne(id: number): Promise<CreateUserDto> {
    const user = await this.userRepository.findOne(id)
    if (!user) {
      throw new HttpException(user, HttpStatus.NO_CONTENT);
    }
    return user;
  }

  findOneByUsername(username: string): Promise<User | undefined> {
    return this.userRepository.findOne({username: username});
  }

  update(id: number, updateUserDto: UpdateUserDto): Promise<UpdateResult> {
    return this.userRepository.update(id, updateUserDto);
  }

  remove(id: number): Promise<DeleteResult> {
    return this.userRepository.delete(id);
  }
}
