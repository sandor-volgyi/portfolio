import express from 'express';
import cors from 'cors';

import { authenticateRequest } from '../middlewares/authentication';
import { userController, commentController } from '../controllers/';

const router = express.Router();

router.use(cors());
router.use(express.json());
router.use(express.urlencoded({ extended: true }));

router.post('/login', userController.login);
router.post('/register', userController.register);
router.get('/comment', commentController.get);

router.use(authenticateRequest);
router.post('/comment/', commentController.post);
router.delete('/comment/:id', commentController.del);
//router.put('/comment/:id', commentController.put);

export default router;
