import mongoose from 'mongoose';

export interface INote {
  title: string;
  description: string;
};

const noteSchema = new mongoose.Schema<INote>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
  },
  { 
    timestamps: true
  }
);

export const Note = mongoose.model<INote>('Note', noteSchema);