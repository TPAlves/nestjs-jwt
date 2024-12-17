import { Injectable } from '@nestjs/common';
import { UserDto } from './dto/user.dto';
import { v4 as uuid } from 'uuid';
import { hashSync as bcryptHashSync } from 'bcrypt';

@Injectable()
export class UserService {
  private readonly users: UserDto[] = [];

  create(user: UserDto) {
    user.id = uuid();
    user.password = bcryptHashSync(user.password, 10);
    this.users.push(user);
  }

  findByUserName(username: string): UserDto | null {
    return this.users.find((u) => u.username === username);
  }
}
