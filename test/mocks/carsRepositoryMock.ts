import { Repository, EntityRepository } from 'typeorm';
import { Car } from 'src/cars/car.entity';

@EntityRepository(Car)
export class CarRepository extends Repository<Car> {
    
}
