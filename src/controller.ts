import { Request, Response } from 'express';

class NotesController {
  getNotes = async (req: Request, res: Response) => {
    res.send('helloworld from controller!');
  }

  getNoteById = async (req: Request, res: Response) => {
    res.send('note id: ' + req.params.id)
  }

  createNote = async (req: Request, res: Response) => {
    console.log(req.params.id, req.body.description);
    res.send('create note: ' + req.body.description)
  }

  updateNote = async (req: Request, res: Response) => {
    res.send('update note id: ' + req.params.id + req.body.description)
  }

  deleteNote = async (req: Request, res: Response) => {
    res.send('delete note id: ' + req.params.id)
  }
}

export default new NotesController()