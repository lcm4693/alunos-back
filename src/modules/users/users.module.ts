import { UsersController } from './users.controller';
import { UserSchema } from '../../domain/user.domain';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersRepository } from './users.repository';
import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from '../../domain/user.domain';
import { CalendarModule } from '../calendar/calendar.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
    ]),
    CalendarModule
  ],
  controllers: [UsersController],
  providers: [UsersService, UsersRepository],
  exports: [UsersService]
})
export class UsersModule {}
