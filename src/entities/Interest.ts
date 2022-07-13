import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('interests')
class Interest {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;
}

export { Interest };
