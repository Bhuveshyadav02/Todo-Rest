/*import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { TodoService } from './todo.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';

import { JwtAuthGuard } from 'src/auth/auth.guard'; // Make sure the path is correct
import { UserEmail } from 'src/common/decorators/user-email.decorator';

@Controller('todo')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  create(@Body() createTodoDto: CreateTodoDto, @UserEmail() userEmail: string) {
    return this.todoService.create(createTodoDto, userEmail);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  async findAll(@UserEmail() userEmail: string) {
    return this.todoService.findAll(userEmail);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  findOne(@Param('id') id: string) {
    return this.todoService.findOne(+id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  update(@Param('id') id: string, @Body() updateTodoDto: UpdateTodoDto) {
    return this.todoService.update(+id, updateTodoDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  remove(@Param('id') id: string) {
    return this.todoService.remove(+id);
  }
}
*/
import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { TodoService } from './todo.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { JwtAuthGuard } from "../auth/auth.guard"
import { UserEmail } from 'src/common/decorators/user-email.decorator';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Todo')
@Controller('todo')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}
  @ApiBearerAuth()
  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({description:"To create a todo with task as mandatory field and desc optional",summary:"Creating todo"})
  create(@Body() createTodoDto: CreateTodoDto, @UserEmail() userEmail: string) {
    return this.todoService.create(createTodoDto, userEmail);
  }
  @ApiBearerAuth()
  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({description:"To get all  todos ",summary:"Get all task specific to  user email"})
  async findAll(@UserEmail() userEmail: string) {
    return this.todoService.findAll(userEmail);
  }
@ApiBearerAuth()
  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({description:"To get   paticular  todo  ",summary:"get a single task on the basis of id of task"})
  findOne(@Param('id') id: string) {
    return this.todoService.findOne(+id);
  }


  @ApiBearerAuth()
  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({description:"To update the task deatils",summary:"Edit the task"})
  update(@Param('id') id: string, @Body() updateTodoDto: UpdateTodoDto) {
    return this.todoService.update(+id, updateTodoDto);
  }
  
  @ApiBearerAuth()
  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ description: "To delete a particular task on the basis of id", summary: "Delete task" })
  remove(@Param('id') id: string) {
    return this.todoService.remove(+id);
  }
}
