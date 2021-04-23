import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Car } from './car.entity';
import { CarsController } from './cars.controller';
import { CarsService } from './cars.service';

describe('CarsController', () => {
  let controller: CarsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [TypeOrmModule.forRoot(), TypeOrmModule.forFeature([Car])],
      providers: [CarsService],
      controllers: [CarsController],
    }).compile();

    controller = module.get<CarsController>(CarsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
