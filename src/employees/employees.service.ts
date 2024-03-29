import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class EmployeesService {
  constructor(private readonly databaseService: DatabaseService) {}

  async create(createEmployeeDto: Prisma.UserCreateInput) {
    return this.databaseService.user.create({
      data: createEmployeeDto,
    });
  }

  async findAll(role: 'INTERN' | 'ENGINEER' | 'ADMIN') {
    if (role) {
      return this.databaseService.user.findMany({
        where: {
          role,
        },
      });
    }

    return this.databaseService.user.findMany();
  }

  async findOne(id: number) {
    const user = this.databaseService.user.findUnique({
      where: {
        id,
      },
    });

    if (!user) throw new NotFoundException('No user found with this id');

    return user;
  }

  async update(id: number, updateEmployeeDto: Prisma.UserUpdateInput) {
    const updatedUser = this.databaseService.user.update({
      where: {
        id,
      },
      data: updateEmployeeDto,
    });

    if (!updatedUser)
      throw new NotFoundException('Failed to update user with this id');

    return updatedUser;
  }

  async remove(id: number) {
    const deletedUser = this.databaseService.user.delete({
      where: {
        id,
      },
    });

    if (!deletedUser)
      throw new NotFoundException('Failed to delete user with this id');

    return deletedUser;
  }
}
