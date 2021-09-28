import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/product.module';
import { UsersModule } from './users/user.module';

import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TestModule } from './test/test.module';

@Module({
  imports: [
    ProductsModule,
    UsersModule,
    // connect postgres -> from env local
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: `postgres`,
      host: process.env.DB_HOST, // local host (ex : 127.0.0.1)
      port: parseInt(<string>process.env.DB_PORT), // port (default : 5432)
      username: process.env.DB_USER, // user name for postgres
      password: process.env.DB_PASS, // pass
      database: process.env.DC_NAME, // name Database
      autoLoadEntities: true,
      synchronize: true,
    }),
    TestModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
