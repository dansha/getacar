import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Car } from './car.entity';
import { PAGE_SIZE } from '../constans';

@Injectable()
export class CarsService {
  constructor(
    @InjectRepository(Car)
    private CarsRepository: Repository<Car>,
  ) {}

  async findCars(page: number, make?: string, model?: string): Promise<Car[]> {
    const query = this.CarsRepository.createQueryBuilder('Car');
    if (make) query.where('Car.Make = :make', { make });
    if (model) query.where('Car.Model = :model', { model });
    query.limit(PAGE_SIZE);
    query.offset((page - 1) * PAGE_SIZE);

    return await query.getMany();
  }
}
