import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { EStatusFriends } from 'utils/enums';

import { User } from './User';

@Entity('friends')
class Friend {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  requester_user_id: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'requester_user_id' })
  requester_user: User;

  @Column()
  requested_user_id: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'requested_user_id' })
  requested_user: User;

  @Column({ type: 'enum', enum: EStatusFriends })
  status: EStatusFriends;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export { Friend };
