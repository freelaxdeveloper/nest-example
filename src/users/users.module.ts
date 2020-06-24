import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UserService } from './users.service';
import { userProviders } from './user.providers';
import { DatabaseModule } from '../database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [UsersController],
  providers: [
      ...userProviders,
      UserService
  ],
  exports: [UserService]
})
export class UsersModule {}
