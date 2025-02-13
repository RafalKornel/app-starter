import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'Coffee' })
export class Coffee {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ nullable: true })
  flavor?: string;

  @Column({ nullable: true })
  createdAt?: Date;
}
