import { NextFunction, Request, Response } from 'express';
import { Note } from '../model/notes.model';
import mongoose from 'mongoose';

class NotesController {
  getNotes = async (req: Request, res: Response) => {
    const notes = await Note.find({});
    res.status(200).json(notes);
  }

  getNoteById = async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;
    if (mongoose.Types.ObjectId.isValid(id)) {
      const note = await Note.findById(id);
      if (!note) {
        res.status(404);
        return next(new Error('Note not found'));
      }
      res.status(200).json(note);
    } else {
      res.status(404);
      next(new Error('Provided note ID is not valid'));
    }
  }

  createNote = async (req: Request, res: Response) => {
    const { title, description } = req.body;
    // check if title and description validation or will crash app
    const note = await Note.create({ title, description });
    res.status(201).json(note);
  }

  updateNote = async (req: Request, res: Response, next: NextFunction) => {
    const { title, description } = req.body;
    const id = req.params.id;
    // previous validation middleware for id as well
    if (mongoose.Types.ObjectId.isValid(id)) {
      const note = await Note.findByIdAndUpdate(id, { title, description }, { new: true });
      if (!note) {
        res.status(404);
        return next(new Error('Note not found'));
      };
      res.status(201).json(note);
    } else {
      res.status(404);
      next(new Error('Provided note ID is not valid'));
    }
  }

  deleteNote = async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;
    if (mongoose.Types.ObjectId.isValid(id)) {
      const note = await Note.findByIdAndDelete(id);
      if (!note) {
        res.status(404);
        return next(new Error('Note not found'));
      }
      res.status(200).send(`Successfully deleted note with ID: ${id}`);
    } else {
      res.status(404);
      next(new Error('Provided note ID is not valid'));
    }
  }
}

export default new NotesController()