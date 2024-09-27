import { Injectable } from '@nestjs/common';
import { CreateAnswerDto } from './dto/create-answer.dto';
import { UpdateAnswerDto } from './dto/update-answer.dto';

@Injectable()
export class AnswerService {
  private readonly answers = []; // Puedes usar una base de datos aquí

  create(createAnswerDto: CreateAnswerDto) {
    const answer = { id: Date.now(), ...createAnswerDto }; // Simulación de ID
    this.answers.push(answer);
    return answer;
  }

  findAll() {
    return this.answers;
  }

  findOne(id: string) {
    return this.answers.find(a => a.id === +id);
  }

  update(id: string, updateAnswerDto: UpdateAnswerDto) {
    const index = this.answers.findIndex(a => a.id === +id);
    if (index !== -1) {
      this.answers[index] = { ...this.answers[index], ...updateAnswerDto };
      return this.answers[index];
    }
    return null; // O maneja el error según tu preferencia
  }

  remove(id: string) {
    const index = this.answers.findIndex(a => a.id === +id);
    if (index !== -1) {
      return this.answers.splice(index, 1);
    }
    return null; // O maneja el error según tu preferencia
  }
}
