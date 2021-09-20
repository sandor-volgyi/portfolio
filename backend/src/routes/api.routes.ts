import express from 'express';
import cors from 'cors';

import { userController, commentController } from '../controllers/';

const router = express.Router();

router.use(cors());
router.use(express.json());
router.use(express.urlencoded({ extended: true }));

router.post('/login', userController.login);
router.post('/register', userController.register);

router.get('/comment', commentController.get);

/*
router.post('/comment', commentController.post);

router.use(authenticateRequest);
router.put('/comment', commentController.put);
router.delete('/comment', commentController.delete);
*/

export default router;
