import NotesController from '../controller/notes.controller';
import express from 'express';
import { validateNoteBody, validateNoteId } from '../validator/notes.validator';
const router = express.Router();

// Define the routes for this router
router.get('/', 
  NotesController.getNotes
);

router.get('/:id',
  validateNoteId,
  NotesController.getNoteById
);

router.post('/', 
  validateNoteBody,
  NotesController.createNote
);

router.put('/:id',
  validateNoteId,
  validateNoteBody,
  NotesController.updateNote
);

router.delete('/:id',
  validateNoteId,
  NotesController.deleteNote
)

export default router;