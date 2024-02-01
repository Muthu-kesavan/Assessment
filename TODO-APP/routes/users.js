import express from 'express';
import {register, login, getUser} from '../controllers/user.js';
import Auth from '../middleware/Auth.js';

const router = express.Router();

router.post("/login", login);
router.post("/register", register);
router.get("/user/:id", Auth, getUser);

export default router;