import { Module } from '@nestjs/common';
import { AssignmentService } from './assignment.service';
import { AssignmentController } from './assignment.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { assignment, assignmentSchema } from './schema/assignment.schema';

@Module({
  imports:[MongooseModule.forFeature([{name:assignment.name,schema:assignmentSchema}])],
  controllers: [AssignmentController],
  providers: [AssignmentService]
})
export class AssignmentModule {}
