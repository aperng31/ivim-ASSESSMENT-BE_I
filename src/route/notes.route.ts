import NotesController from '../controller/notes.controller';
import express from 'express';
const router = express.Router();

// Define the routes for this router
router.get('/', 
  NotesController.getNotes
);

router.get('/:id',
  NotesController.getNoteById
);

router.post('/', 
  NotesController.createNote
);

router.put('/:id',
  NotesController.updateNote
);

router.delete('/:id',
  NotesController.deleteNote
)

export default router;