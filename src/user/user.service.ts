import { ConflictException, Injectable } from '@nestjs/common';
import { UserDto } from './dto/user.dto';
import { v4 as uuid } from 'uuid';
import { hashSync as bcryptHashSync } from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../db/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async create(user: UserDto) {
    const userAlreadyExists = await this.findByUserName(user.username);
    if (userAlreadyExists) {
      throw new ConflictException('Usuário já cadastrado no banco');
    }

    const userEntity = new UserEntity();
    userEntity.id = uuid();
    userEntity.username = user.username;
    userEntity.passwordHash = bcryptHashSync(user.password, 10);
    const { id, username } = await this.userRepository.save(userEntity);
    const messageSuccess = 'Usuário cadastrado com sucesso';
    return { status: messageSuccess, id, username };
  }

  async findByUserName(username: string): Promise<UserDto | null> {
    const userFound = await this.userRepository.findOne({
      where: { username },
    });
    if (userFound) {
      return {
        id: userFound.id,
        username: userFound.username,
        password: userFound.passwordHash,
      };
    }

    return null;
  }
}
