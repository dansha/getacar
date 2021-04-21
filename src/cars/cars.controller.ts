import { Controller, Get, Req } from '@nestjs/common';
import { Request } from 'express';

@Controller('cars')
export class CarsController {
  @Get()
  findCars(@Req() request: Request): string {
    console.log(request.query);
    return 'test';
  }
}
