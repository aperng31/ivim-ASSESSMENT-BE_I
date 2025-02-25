import { body, param, validationResult } from 'express-validator';

const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400)
    next(new Error(errors.array()[0].msg));
  }
};

export const validateNoteId = [
  param('id').isMongoId().withMessage('Invalid Note ID'),
  handleValidationErrors
];

export const validateNoteBody = [
  body('title').exists().isString().withMessage('Missing title field').bail(),
  body('description').exists().isString().withMessage('Missing description field').bail(),
  handleValidationErrors
]