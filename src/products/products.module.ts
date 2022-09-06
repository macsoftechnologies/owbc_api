import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { product, productSchema } from './schema/product.schema';

@Module({
  imports:[MongooseModule.forFeature([{name:product.name, schema:productSchema}])],
  controllers: [ProductsController],
  providers: [ProductsService]
})
export class ProductsModule {}
