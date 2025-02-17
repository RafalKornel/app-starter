import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserEntity } from './user.entity';

@Entity({ name: 'authorization' })
export class AuthEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => UserEntity, (userEntity) => userEntity.auth)
  @JoinColumn({ name: 'userId' })
  user: UserEntity;

  @Column()
  passwordHash: string;

  @Column({ type: 'uuid', nullable: true })
  activeRefreshTokenUuid?: string | null;
}
