import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { EStatusAllFriendFinder } from 'utils/enums';

import { User } from './User';

@Entity('relations')
class Relation {
  @PrimaryColumn()
  id: string;

  @Column()
  type: 'FRIEND' | 'FINDER';

  @Column()
  relation_id: string;

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

  @Column({ type: 'enum', enum: EStatusAllFriendFinder })
  status: EStatusAllFriendFinder;
}

export { Relation };
