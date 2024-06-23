import { Injectable, Delete, NotFoundException } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { EventEmitter } from 'stream';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { Otherservice } from './other.service';

@Injectable()
export class UserService {

  // constructor(private eventEmitter: EventEmitter2) { }
  private users = [
    {
      "id": 1,
      "name": "Gbolahan",
      "email": "Olajaye@gmail.com",
      "role": "INTERN"
    },
    {
      "id": 2,
      "name": "Wassi",
      "email": "Wassi@gmail.com",
      "role": "ADMIN"
    },
    {
      "id": 3,
      "name": "Lina",
      "email": "Lina@gmail.com",
      "role": "DOCTOR"
    },
    {
      "id": 4,
      "name": "Kay",
      "email": "Kay@gmail.com",
      "role": "ADMIN"
    },

  ]

  findAll(role?: "INTEN" | "ADMIN" | "DOCTOR") {
    if (role) {
      const roleArray = this.users.filter(user => user.role === role)
      if (roleArray.length === 0) throw new NotFoundException("User Role Not Found")
      return roleArray
    }
   
    return this.users
  }

  async findOne(id: number) {
    const user = this.users.find(user => user.id === id)
    if (!user) throw new NotFoundException("User Not Found")
  
    // const title = "event emmiter in user service"
    // const result = await this.eventEmitter.emitAsync("video.created", { title })
    // console.log(result)
    return user
  }

  create(user: CreateUserDto) {
    const newId = [...this.users].sort((a, b) => b.id - a.id)
    const newUser = {
      id: newId[0].id + 1,
      ...user
    }
    this.users.push(newUser)
    return newUser
  }

  update(id: number, updateUser: UpdateUserDto) {
    this.users = this.users.map(user => {
      if (user.id === id) {
        return { ...user, ...updateUser }
      }
      return user
    })
    return this.findOne(id)
  }


  delete(id: number) {
    const removedUser = this.findOne(id)

    this.users = this.users.filter(user => user.id !== id)
    
    return removedUser
  }


}
