import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AdminModule } from './admin/admin.module';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';
import { CheckInModule } from './check-in/check-in.module';
import { CheckoutModule } from './checkout/checkout/checkout.module';
import { PollingModule } from './polling/polling/polling.module';
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
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
