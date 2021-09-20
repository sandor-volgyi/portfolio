import express from 'express';
import cors from 'cors';

import { userController } from '../controllers/';

const router = express.Router();

router.use(cors());
router.use(express.json());
router.use(express.urlencoded({ extended: true }));

router.post('/login', userController.login);
router.post('/register', userController.register);

export default router;
