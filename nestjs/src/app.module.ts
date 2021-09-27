import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/product.module';
import { UsersModule } from './users/user.module';

@Module({
  imports: [ProductsModule , UsersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
