import { Injectable, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    try {
      // Check if a user with the same email already exists
      const existingUser = await this.userRepository.findOne({
        where: {
          email: createUserDto.email,
        },
      });
      if (existingUser) {
        // Handle duplicate email error
        throw new ConflictException('User with this email already exists.');
      }

      // Hash the password before saving it
      const hashedPassword = await bcrypt.hash(createUserDto.password, 10);

      // Create a new user
      const newUser = new User();
      newUser.username = createUserDto.username;
      newUser.email = createUserDto.email;
      newUser.password = hashedPassword;

      // Save the user to the database
      return await this.userRepository.save(newUser);
    } catch (error) {
      throw new ConflictException('User creation has an error: {error}');
    }
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    return await this.userRepository.findOne({ 
      where: {
        email: email,
      },
    });
  }

  async findAll() {
    return this.userRepository.find();
  }

  async findOne(id: number): Promise<User> {
    return this.userRepository.findOne({
      where: {
        id: id,
      },
    });
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  async remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
