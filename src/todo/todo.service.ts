/**import { Injectable } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { DatabaseService } from 'src/database/database.service';
import { Prisma } from '@prisma/client'
import { error } from 'console';


@Injectable()
export class TodoService {
  constructor(private readonly databaseService:DatabaseService,){}
   
   async create(createTodoDto: CreateTodoDto,email: string) {
    try{
      const user=await this.databaseService.user.findUnique({where:{email}})
      if(!user){
        throw new error('user not found')
      }
      const data: Prisma.TodoCreateInput = {
        task: createTodoDto.task,
        description: createTodoDto.description,
        status: 'ACTIVE',  // Default status for new todos
        user:{
          connect:{email:user.email}
        }
      };
      console.log(data)
      return this.databaseService.todo.create({ data });
    }

    catch(err){
      return err
    }

   }

   async findAll() {
    return await this.databaseService.todo.findMany()
  }

  async findOne(id: number) {
    return   await this.databaseService.todo.findFirst({
      where :{
        id:id
      }
    })
  }

  async update(id: number, updateTodoDto: UpdateTodoDto) {
    return   await this.databaseService.todo.update({
      where :{
        id:id
      },
      data:updateTodoDto
    })
  }

  async remove(id: number) {
    return   await this.databaseService.todo.delete({
      where :{
        id:id
      }
    })
  }
}
**/
import { Injectable } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { DatabaseService } from 'src/database/database.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class TodoService {
  constructor(private readonly databaseService: DatabaseService) {}

  async create(createTodoDto: CreateTodoDto, email: string) {
    try {
      const user = await this.databaseService.user.findUnique({ where: { email } });
      if (!user) {
        throw new Error('User not found');
      }
      const data: Prisma.TodoCreateInput = {
        task: createTodoDto.task,
        description: createTodoDto.description,
        status: 'ACTIVE', // Default status for new todos
        user: {
          connect: { email: user.email },
        },
      };
      console.log(data);
      return this.databaseService.todo.create({ data });
    } catch (err) {
      return err;
    }
  }

  async findAll(email: string) {
    return await this.databaseService.todo.findMany({
      where: {
        userEmail: email,
      },
    });
  }

  async findOne(id: number) {
    return await this.databaseService.todo.findFirst({
      where: {
        id: id,
      },
    });
  }

  async update(id: number, updateTodoDto: UpdateTodoDto) {
    return await this.databaseService.todo.update({
      where: {
        id: id,
      },
      data: updateTodoDto,
    });
  }

  async remove(id: number) {
    return await this.databaseService.todo.delete({
      where: {
        id: id,
      },
    });
  }
}
