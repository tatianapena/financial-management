import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { IncomeModule } from './income/income.module';
import { ExpensiveModule } from './expensive/expensive.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    IncomeModule,
    ExpensiveModule,
    MongooseModule.forRoot(
      'mongodb+srv://financial:ikualo1234@financialmangement.mcxbrnb.mongodb.net/',
    ),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
