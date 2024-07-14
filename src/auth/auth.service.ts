import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { RegisterUserDto } from './dto/register.dto';
import * as bcrypt from 'bcrypt';
import {LoginDto} from './dto/login.dto'
 import { DatabaseService } from '../database/database.service';
import { emit } from 'process';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class AuthService {
  constructor(
    private readonly dataservice:DatabaseService,
    
    private readonly jwtservice:JwtService
  ){}
  async login(loginData:LoginDto){
    const {email,password}=loginData
    const user=await this.dataservice.user.findFirst({
      where:{
        email:email
      }
    })
    if(!user){
      throw new NotFoundException("No user with this email")
    }
    const validatePassword=await bcrypt.compare(password,user.password)
    if(!validatePassword){
      throw new NotFoundException("Wrong Password")
    }
    return {
      token:this.jwtservice.sign({email})
    }

  }
   async register(registerData: RegisterUserDto) {
    const user =await this.dataservice.user.findFirst({
      where:{
        email:registerData.email
      }
    })
    if(user){
    throw new Error('UserExist');

  }
  registerData.password=await  bcrypt.hash(registerData.password,10)
  const res=await this.dataservice.user.create({data:registerData})
  return res
}
  create(createAuthDto: CreateAuthDto) {
    return 'This action adds a new auth';
  }

  findAll() {
    return `This action returns all auth`;
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  update(id: number, updateAuthDto: UpdateAuthDto) {
    return `This action updates a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }
}
