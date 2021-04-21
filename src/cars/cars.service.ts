import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Car } from './car.entity';

@Injectable()
export class CarsService {
  constructor(
    @InjectRepository(Car)
    private CarsRepository: Repository<Car>,
  ) {}

  async findAll(): Promise<Car[]> {
    // return new Promise<Car[]>((resolve) => {
    //   resolve([]);
    // });
     return await this.CarsRepository.find();
  }
}
