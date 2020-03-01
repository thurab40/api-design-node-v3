import { Router } from 'express';

// fake controller for now
const controller = (req, res) => {
  res.send({ message: 'not implemented yet' });
};

const router = Router();
// these routers only know there relative routes -
// this route is equivalent to '/api/item'
router
  .route('/')
  .get(controller)
  .post(controller);

// this route is equivalent to '/api/item/:id'
router
  .route('/:id')
  .put(controller)
  .delete(controller)
  .get(controller);

export default router;
