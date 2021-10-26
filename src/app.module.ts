import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/product.module';
import { UsersModule } from './users/user.module';

import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { CoursesModule } from './courses/courses.module';
import { ClassesModule } from './classes/classes.module';
import { NotisModule } from './notis/notis.module';

@Module({
  imports: [
    AuthModule,
    ProductsModule,
    UsersModule,
    // connect postgres -> from env local
    ConfigModule.forRoot({ isGlobal: true }),
    // TypeOrmModule.forRoot({
    //   type: `postgres`,
    //   host: process.env.DB_HOST, // local host (ex : 127.0.0.1)
    //   port: parseInt(<string>process.env.DB_PORT), // port (default : 5432)
    //   username: process.env.DB_USERNAME, // user name for postgres
    //   password: process.env.DB_PASS, // pass
    //   database: process.env.DB, // name Database
    //   autoLoadEntities: true,
    //   synchronize: true,
    // }),
    TypeOrmModule.forRoot({
      type: `postgres`,
      host: process.env.DB_HOST_PRODUCTION,
      port: 5432,
      username: process.env.DB_USERNAME_PRODUCTION,
      password: process.env.DB_PASS_PRODUCTION,
      database: process.env.DB_PRODUCTION,
      autoLoadEntities: true,
      synchronize: true,
      dropSchema: false,
      logging: true,
      ssl: true,
      extra: {
        ssl: {
          rejectUnauthorized: false,
        },
      },
    }),
    CoursesModule,
    ClassesModule,
    NotisModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
