import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query, ValidationPipe } from '@nestjs/common';
import {UserService} from "./user.service"
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiOkResponse, ApiQuery } from '@nestjs/swagger';
@Controller('user')
export class UserController {

  constructor(private readonly userService: UserService) { }

  @ApiOkResponse({ type: CreateUserDto, isArray: true })
  @ApiQuery({type: "role", required: false})
  @Get()
  findAll(@Query("role") role?: "INTEN" | "ADMIN" | "DOCTOR" ) {
    return this.userService.findAll(role)
  }
 
  
  // @Get("intens") //user/intens
  // findAllIntens(): string {
  //   return "ckecking"
  // }

  @Get(":id") 
  findOne(@Param("id", ParseIntPipe) id:number) {
    return  this.userService.findOne(id)
  }


  @Post()
  create(@Body(ValidationPipe) user: CreateUserDto) {
    return this.userService.create(user)
  }

  @Patch(":id")
  update(@Param('id', ParseIntPipe) id:number, @Body(ValidationPipe) userUpdate: UpdateUserDto) {
    return this.userService.update(id, userUpdate)
  }

  @Delete(":id")
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.userService.delete(id)
  }
}
