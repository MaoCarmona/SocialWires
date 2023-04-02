import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository ,FindOneOptions} from 'typeorm';
import { User } from '../entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async findByUsername(username: string): Promise<User | null> {
    return await this.userRepository.findOne({ where: { username } });
  }

  async findById(id: string): Promise<User | null> {
    const options: FindOneOptions<User> = { where: { id } };
    return await this.userRepository.findOne(options);
  }
  

  async create(user: User): Promise<User> {
    return await this.userRepository.save(user);
  }
}
