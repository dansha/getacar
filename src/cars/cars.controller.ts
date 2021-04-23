import {
  Controller,
  Get,
  HttpException,
  Req,
  Res,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { Parser } from 'json2csv';
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
  async findCars(@Req() request: Request, @Res() response: Response) {
    const params = this.assertAndGetfindCarsParams(request.query);

    const jsonResult = await this.carsService.findCars(
      params.page,
      params.make,
      params.model,
    );

    const csvResult = this.transformDataToCsv(jsonResult);
    this.sendCsvFile(response, csvResult);
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

  transformDataToCsv(json: Car[]) {
    const json2csvParser = new Parser();
    const csv = json2csvParser.parse(json);

    return csv;
  }

  sendCsvFile(response, csvResult) {
    response.setHeader('Content-disposition', 'attachment; filename=data.csv');
    response.set('Content-Type', 'text/csv');
    response.status(200).send(csvResult);
  }
}
