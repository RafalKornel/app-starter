import {
  Column,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { AuthEntity } from './auth.entity';

@Entity({ name: 'user' })
@Unique(['email'])
@Unique(['username'])
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  username: string;

  @OneToOne(() => AuthEntity, (authEntity) => authEntity.user, {
    nullable: true,
    cascade: true,
  })
  auth: AuthEntity;
}
