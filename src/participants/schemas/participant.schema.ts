import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ParticipantDocument = Participant & Document;

@Schema({
  timestamps: true,
  collection: 'sorteo_21-06-2025_participants',
})
export class Participant {
  @Prop({
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
    match: [
      /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
      'Email debe tener un formato válido',
    ],
  })
  email: string;

  @Prop({
    required: true,
    trim: true,
    minlength: [2, 'El nombre debe tener al menos 2 caracteres'],
    maxlength: [100, 'El nombre no puede exceder 100 caracteres'],
  })
  fullName: string;

  @Prop({
    required: false,
    trim: true,
    default: null,
  })
  phone?: string;

  @Prop({ default: Date.now })
  createdAt: Date;

  @Prop({ default: Date.now })
  updatedAt: Date;
}

export const ParticipantSchema = SchemaFactory.createForClass(Participant);

ParticipantSchema.index({ createdAt: -1 });

ParticipantSchema.pre('save', function (next) {
  this.updatedAt = new Date();
  next();
});

ParticipantSchema.pre('findOneAndUpdate', function (next) {
  this.set({ updatedAt: new Date() });
  next();
});
