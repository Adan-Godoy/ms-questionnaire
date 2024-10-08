import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { QuestionnaireModule } from './questionnaire/questionnaire.module';
import { AnswerModule } from './answer/answer.module';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.MONGODB_URI, {
    dbName: process.env.MONGODB_DATABASE,
  }),
    QuestionnaireModule,
    AnswerModule,
],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
