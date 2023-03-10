import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AdminModule } from './admin/admin.module';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';
import { CheckInModule } from './check-in/check-in.module';
import { CheckoutModule } from './checkout/checkout/checkout.module';
import { PollingModule } from './polling/polling/polling.module';
import { ProductsModule } from './products/products.module';
import { ClientModule } from './client/client.module';
import { AssignmentModule } from './assignment/assignment.module';
import { SharedService } from './shared/shared.service';
 
@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://macsof:macsof@nextlevelcarwash.yjs3i.mongodb.net/owbc?retryWrites=true&w=majority',
    ),
    AdminModule,
    UserModule,
    CheckInModule,
    CheckoutModule,
    PollingModule,
    ProductsModule,
    ClientModule,
    AssignmentModule,
  ],
  controllers: [AppController],
  providers: [AppService, SharedService],
})
export class AppModule {}
