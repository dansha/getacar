import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'fs_cars' })
export class Car {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  make: string;

  @Column()
  model: string;

  @Column()
  color: string;
}
