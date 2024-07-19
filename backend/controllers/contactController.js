// controllers/contactController.js
import Contact from '../models/contactModel.js';

export const addContact = (req, res) => {
  const { name, email, message } = req.body;

  const newContact = new Contact({ name, email, message });

  newContact
    .save()
    .then(() => res.json('Contact added!'))
    .catch((err) => res.status(400).json('Error: ' + err));
};
