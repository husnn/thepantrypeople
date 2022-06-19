import { NextFunction, Request, Response, Router } from 'express';
import { body } from 'express-validator';
import ListController from '../controllers/ListController';
import authMiddleware from '../middleware/authMiddleware';

export default function init(listController: ListController): Router {
  const router = Router();

  router.post(
    '/',
    body('items').exists().isArray({ min: 1 }),
    body('items.*.id').exists().isInt(),
    body('items.*.quantity').optional().isInt({ min: 1, max: 10 }),
    authMiddleware,
    (req: Request, res: Response, next: NextFunction) =>
      listController.create(req, res, next)
  );

  return router;
}