import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { CarsModule } from '../src/cars/cars.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Car } from '../src/cars/car.entity';

describe('CarsController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        CarsModule,
        TypeOrmModule.forRoot({
          type: 'mysql',
          host: 'localhost',
          port: 3306,
          username: 'dans',
          password: '0122',
          database: 'getacar',
          entities: [Car],
        }),
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('/ (GET) first page ', async () => {
    const res = await request(app.getHttpServer())
      .get('/cars?page=1')
      .expect('Content-Type', /csv/)
      .expect(200);

    const carsArray = res.text.split('\n');
    expect(carsArray.length).toEqual(22);
    expect(carsArray[0]).toEqual('"id","make","model","color"\r');

    const firstRow = carsArray[1].split(',');
    expect(firstRow[0]).toEqual('1');

    const lastRow = carsArray[21].split(',');
    expect(lastRow[0]).toEqual('21');
    //console.log(carsArray);

    return res;
  });

  it('/ (GET) make kia ', async () => {
    const res = await request(app.getHttpServer())
      .get('/cars?page=1&make=Kia')
      .expect('Content-Type', /csv/)
      .expect(200);

    const carsArray = res.text.split('\n');
    // expect(carsArray.length).toEqual(22);
    // expect(carsArray[0]).toEqual('"id","make","model","color"\r');

    // const firstRow = carsArray[1].split(',');
    // expect(firstRow[0]).toEqual('1');

    // const lastRow = carsArray[21].split(',');
    // expect(lastRow[0]).toEqual('21');
    console.log(carsArray);

    return res;
  });
});
