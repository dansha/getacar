import {
  Controller,
  Get,
  HttpException,
  Req,
  HttpStatus,
} from '@nestjs/common';
import { Request } from 'express';
import { Car } from './car.entity';
import { CarsService } from './cars.service';

interface IFindCarsParams {
  page: number;
  make?: string;
  model?: string;
}

@Controller('cars')
export class CarsController {
  constructor(private carsService: CarsService) {}

  @Get()
  async findCars(@Req() request: Request): Promise<Car[]> {
    const params = this.assertAndGetfindCarsParams(request.query);

    return await this.carsService.findCars(
      params.page,
      params.make,
      params.model,
    );
  }

  assertAndGetfindCarsParams(query): IFindCarsParams {
    const { page, make, model } = query;

    if (!page)
      throw new HttpException('page number required', HttpStatus.BAD_REQUEST);

    if (page < 1)
      throw new HttpException(
        'page number must be larger then 1',
        HttpStatus.BAD_REQUEST,
      );

    if (model && !make)
      throw new HttpException(
        'cant find model without make',
        HttpStatus.BAD_REQUEST,
      );

    const tmpRes: IFindCarsParams = {
      page: page,
      make: make ? make.toString() : make,
      model: model ? model.toString() : model,
    };
    return tmpRes;
  }
}
