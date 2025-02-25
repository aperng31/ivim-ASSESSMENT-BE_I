import { body, param, validationResult } from 'express-validator';

const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400)
    return next(new Error(errors.array()[0].msg));
  }
  next();
};

export const validateNoteId = [
  param('id').isMongoId().withMessage('Invalid Note ID'),
  handleValidationErrors
];

export const validateNoteBody = [
  body('title')
    .exists().withMessage('Missing title field').bail()
    .isString().withMessage('Invalid title field').bail(),
  body('description')
    .exists().withMessage('Missing description field').bail()
    .isString().withMessage('Invalid description field'),
  handleValidationErrors
]