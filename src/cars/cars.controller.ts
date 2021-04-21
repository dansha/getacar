import { Controller, Get, Req } from '@nestjs/common';
import { Request } from 'express';
import { Car } from './car.entity';
import { CarsService } from './cars.service';

@Controller('cars')
export class CarsController {
  constructor(private carsService: CarsService) {}
  @Get()
  async findCars(@Req() request: Request): Promise<Car[]> {
    return this.carsService.findAll();
    /*
    console.log(request.query);
    return 'test';
    */
  }
}
