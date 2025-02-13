import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Coffee } from '../../database/entities/coffee.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class CoffeeService {
  constructor(
    @InjectRepository(Coffee)
    private readonly coffeeRepository: Repository<Coffee>,
  ) {}

  async create(name: string) {
    return await this.coffeeRepository.insert({ name });
  }

  findAll() {
    return this.coffeeRepository.find();
  }
}
