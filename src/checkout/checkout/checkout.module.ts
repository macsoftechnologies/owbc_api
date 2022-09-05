import { Module } from '@nestjs/common';
import { CheckoutService } from './checkout.service';
import { CheckoutController } from './checkout.controller';
import { checkout, checkoutSchema } from './schema/checkout.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports:[MongooseModule.forFeature([{name:checkout.name,schema:checkoutSchema}])],
  controllers: [CheckoutController],
  providers: [CheckoutService]
})
export class CheckoutModule {}
