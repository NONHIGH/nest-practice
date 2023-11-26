import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  create(createUserDto: CreateUserDto) {
    const newUser = this.userRepository.create(createUserDto);
    return this.userRepository.save(newUser);
  }

  async findAll(): Promise<User[]> {

    const users = await this.userRepository.find();
    if(users.length < 1){
      throw new NotFoundException(`No se encontraron usuarios en la base de datos`);
    }
    return users;
  }

  async findOne(id: number) {
    const userFound = await this.userRepository.findOne({ where: { user_id: id } });
    if (!userFound) {
      throw new NotFoundException('Usuario no encontrado');
    }
    return userFound;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    return await this.userRepository.update(id, updateUserDto);
  }

  async remove(id: number) {
    const userFound = await this.findOne(id);
    return await this.userRepository.remove(userFound);
  }
}
