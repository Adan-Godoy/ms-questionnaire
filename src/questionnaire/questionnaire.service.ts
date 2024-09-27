import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Questionnaire, QuestionnaireDocument } from './schemas/questionnaire.schema';


@Injectable()
export class QuestionnaireService {
    constructor(@InjectModel(Questionnaire.name) private questionnaireModel: Model<QuestionnaireDocument>) {}

    async create(createQuestionnaireDto: any): Promise<Questionnaire> {
        const createdQuestionnaire = new this.questionnaireModel(createQuestionnaireDto);
        return createdQuestionnaire.save();
    }

    async findAll(): Promise<Questionnaire[]> {
        return this.questionnaireModel.find().exec();
    }

    async findOne(id: string): Promise<Questionnaire> {
      const questionnaire = await this.questionnaireModel.findById(id).exec();
      if (!questionnaire) {
          throw new NotFoundException(`Questionnaire with ID ${id} not found`);
      }
      return questionnaire;
  }

  async update(id: string, updateQuestionnaireDto: any): Promise<Questionnaire> {
      const updatedQuestionnaire = await this.questionnaireModel
          .findByIdAndUpdate(id, updateQuestionnaireDto, { new: true })
          .exec();
      if (!updatedQuestionnaire) {
          throw new NotFoundException(`Questionnaire with ID ${id} not found`);
      }
      return updatedQuestionnaire;
  }

  async remove(id: string): Promise<Questionnaire> {
      const deletedQuestionnaire = await this.questionnaireModel.findByIdAndDelete(id).exec();
      if (!deletedQuestionnaire) {
          throw new NotFoundException(`Questionnaire with ID ${id} not found`);
      }
      return deletedQuestionnaire;
  }
}