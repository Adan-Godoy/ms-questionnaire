
import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { QuestionnaireService } from './questionnaire.service';
import { Questionnaire } from './schemas/questionnaire.schema';

@Controller('questionnaire')
export class QuestionnaireController {
    constructor(private readonly questionnaireService: QuestionnaireService) {}

    @Post()
    async create(@Body() createQuestionnaireDto: any): Promise<Questionnaire> {
        return this.questionnaireService.create(createQuestionnaireDto);
    }

    @Get()
    async findAll(): Promise<Questionnaire[]> {
        return this.questionnaireService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id') id: string): Promise<Questionnaire> {
        return this.questionnaireService.findOne(id);
    }

    @Put(':id')
    async update(@Param('id') id: string, @Body() updateQuestionnaireDto: any): Promise<Questionnaire> {
        return this.questionnaireService.update(id, updateQuestionnaireDto);
    }

    @Delete(':id')
    async remove(@Param('id') id: string): Promise<Questionnaire> {
        return this.questionnaireService.remove(id);
    }
}
