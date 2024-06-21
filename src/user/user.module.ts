import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import EventEmitter from 'events';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { Otherservice } from './other.service';

@Module({
  imports: [EventEmitterModule.forRoot()],
  controllers: [UserController],
  providers: [UserService, Otherservice]
})
export class UserModule {}
