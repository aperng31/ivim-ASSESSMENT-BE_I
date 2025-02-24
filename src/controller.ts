import { Request, Response } from 'express';
import { Note } from './model';

class NotesController {
  getNotes = async (req: Request, res: Response) => {
    const notes = await Note.find({});
    res.status(200).json(notes);
  }

  getNoteById = async (req: Request, res: Response) => {
    res.send('note id: ' + req.params.id)
  }

  createNote = async (req: Request, res: Response) => {
    const { title, description } = req.body;
    const note = await Note.create({ title, description });
    res.status(200).json(note);
  }

  updateNote = async (req: Request, res: Response) => {
    res.send('update note id: ' + req.params.id + req.body.description)
  }

  deleteNote = async (req: Request, res: Response) => {
    res.send('delete note id: ' + req.params.id)
  }
}

export default new NotesController()