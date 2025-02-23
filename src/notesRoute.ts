import NotesController from './controller';
const express = require('express');
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