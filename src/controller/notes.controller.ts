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
    const note = await Note.findById(id);
    if (!note) {
      res.status(404);
      return next(new Error('Note not found, retrieval unsuccessful'));
    };
    res.status(200).json(note);
  };

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
    const note = await Note.findByIdAndUpdate(id, { title, description }, { new: true });
    if (!note) {
      res.status(404);
      return next(new Error('Note not found, update unsuccessful'));
    };
    res.status(201).json(note);
  }

  deleteNote = async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;
    const note = await Note.findByIdAndDelete(id);
    if (!note) {
      res.status(404);
      return next(new Error('Note not found, deletion unsuccessful'));
    };
    res.status(200).send(`Successfully deleted note with ID: ${id}`);
  }
}

export default new NotesController()