import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Car } from './cars/car.entity';
import { CarsModule } from './cars/cars.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      name: 'default',
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'dans',
      password: '0122',
      database: 'getacar',
      entities: [Car],
      //synchronize: true,
    }),
    CarsModule,
  ],
})
export class AppModule {}
