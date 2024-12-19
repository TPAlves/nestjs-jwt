import { Module } from '@nestjs/common';
import { TaskModule } from './task/task.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { DbModule } from './db/db.module';

@Module({
  imports: [
    TaskModule,
    UserModule,
    AuthModule,
    ConfigModule.forRoot({ isGlobal: true }),
    DbModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
