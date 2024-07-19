// routes/contact.js
import express from 'express';
import { addContact } from '../controllers/contactController.js';

const router = express.Router();

router.route('/').post(addContact);

export default router;
