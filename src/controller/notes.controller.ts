import { NextFunction, Request, Response } from 'express';
import { Note } from '../model/notes.model';
import mongoose from 'mongoose';

class NotesController {
  getNotes = async (req: Request, res: Response) => {
    const notes = await Note.find({});
    res.status(200).json(notes);
  }

  getNoteById = async (req: Request, res: Response, next: NextFunction) => {
    if (mongoose.Types.ObjectId.isValid(req.params.id)) {
      const note = await Note.findById(req.params.id);
      res.status(200).json(note);
    } else {
      res.status(404);
      next(new Error('Provided note ID is not valid'));
    }
  }

  createNote = async (req: Request, res: Response) => {
    const { title, description } = req.body;
    const note = await Note.create({ title, description });
    res.status(201).json(note);
  }

  updateNote = async (req: Request, res: Response, next: NextFunction) => {
    const { title, description } = req.body;
    const id = req.params.id;
    if (mongoose.Types.ObjectId.isValid(req.params.id)) {
      const note = await Note.findByIdAndUpdate(id, { title, description }, { new: true });
      res.status(201).json(note);
    } else {
      res.status(404);
      next(new Error('Provided note ID is not valid'));
    }
  }

  deleteNote = async (req: Request, res: Response) => {
    res.send('delete note id: ' + req.params.id)
  }
}

export default new NotesController()