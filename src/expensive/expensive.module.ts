import { Module } from '@nestjs/common';
import { ExpensiveController } from './expensive.controller';
import { ExpensiveService } from './expensive.service';

@Module({
  controllers: [ExpensiveController],
  providers: [ExpensiveService]
})
export class ExpensiveModule {}
