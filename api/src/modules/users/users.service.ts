import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/database/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly repository: Repository<UserEntity>,
  ) {}

  public async getUserByEmail(email: string) {
    return await this.repository.findOne({ where: { email } });
  }

  public async registerUser(email: string, password: string, username: string) {
    const user = new UserEntity();

    user.email = email;
    user.password = password;
    user.username = username;

    return await this.repository.save(user);
  }
}
