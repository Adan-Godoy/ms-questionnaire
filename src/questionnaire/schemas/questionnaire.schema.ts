import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type QuestionnaireDocument = Questionnaire & Document;

@Schema() 
export class Questionnaire extends Document {
    @Prop({ type: String, required: true })
    title: string;

    @Prop({ type: String, required: true })
    description: string; 
}

// Crea el modelo de Mongoose
export const QuestionnaireSchema = SchemaFactory.createForClass(Questionnaire);