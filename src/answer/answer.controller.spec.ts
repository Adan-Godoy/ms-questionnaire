import { Test, TestingModule } from '@nestjs/testing';
import { AnswersController } from './answer.controller';
import { AnswersService } from './answer.service';

describe('AnswerController', () => {
  let controller: AnswersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AnswersController],
      providers: [AnswersService],
    }).compile();

    controller = module.get<AnswersController>(AnswersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
