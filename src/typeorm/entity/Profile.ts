import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';


@Entity({ name: 'user_profile' })
export class Profile {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  fristname: string;
  @Column()
  lastname: string;
  @Column()
  age: number;
  @Column()
  dob: string;

}