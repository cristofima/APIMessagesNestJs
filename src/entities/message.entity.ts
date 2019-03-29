import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Message {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 25 })
  nick: string;

  @Column({ length: 100 })
  message: string;
}
