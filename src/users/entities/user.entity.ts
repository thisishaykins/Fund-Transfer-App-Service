import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BeforeInsert,
  BeforeUpdate,
  OneToMany,
  CreateDateColumn,
} from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Account } from 'src/accounts/entities/account.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  username: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @CreateDateColumn()
  createdAt: Date;

  // @OneToMany(() => Account, (account) => account.user) // Establish a one-to-many relationship with Account
  // accounts: Account[]; // Accounts associated with this user

  // @BeforeInsert()
  // @BeforeUpdate()
  // async hashPassword() {
  //   this.password = await bcrypt.hash(this.password, 10);
  // }
}