import * as Yup from 'yup';

import Recipient from '../models/Recipient';

class RecipientController {
  async index(req, res) {
    const recipient = await Recipient.findAll();
    return res.json(recipient);
  }

  async show(req, res) {
    // If the help of Yup builder a schema to validate the request fields
    const schema = Yup.object().shape({
      id: Yup.number()
        .positive()
        .required(),
    });

    // Compare the schema with request fields
    if (!(await schema.isValid(req.params))) {
      return res.status(400).json({ error: 'Id invalid' });
    }

    // Receive id from request params
    const { id } = req.params;

    // Find recipient from id
    const recipient = await Recipient.findOne({ where: { id } });

    // Return the recipient to user
    return res.json(recipient);
  }

  async store(req, res) {
    // If the help of Yup builder a schema to validate the request fields
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      rua: Yup.string().required(),
      numero: Yup.number()
        .required()
        .positive(),
      complemento: Yup.string(),
      estado: Yup.string().required(),
      cidade: Yup.string().required(),
      // Example: xxxxx-xxx
      cep: Yup.string()
        .required()
        .length(9),
    });

    // Compare the schema with request fields
    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation faild' });
    }

    // Insert the new recipient in the database
    const { id, name, estado, cidade } = await Recipient.create(req.body);

    // Return the id, name, state, city to user
    return res.json({
      id,
      name,
      estado,
      cidade,
    });
  }

  async update(req, res) {
    // If the help of Yup builder a schema to validate the request fields
    const schema = Yup.object().shape({
      id: Yup.number()
        .positive()
        .required(),
      name: Yup.string(),
      rua: Yup.string(),
      numero: Yup.number().positive(),
      complemento: Yup.string(),
      estado: Yup.string(),
      cidade: Yup.string(),
      cep: Yup.string().length(9),
    });

    // Compare the schema with request fields
    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation faild' });
    }

    // Create a constant with the value of the id
    const { id } = req.body;

    // Search for the recipient of the id
    const recipient = await Recipient.findByPk(id);

    // If the recipient is not found return to the user id invalid
    if (!recipient) {
      return res.status(400).json({ error: 'Id invalid' });
    }

    // Update the recipient with the data in the body of the request
    const { name, estado, cidade } = await recipient.update(req.body);

    // Return the id, name, state, city to user
    return res.json({
      id,
      name,
      estado,
      cidade,
    });
  }

  async delete(req, res) {
    // If the help of Yup builder a schema to validate the request fields
    const schema = Yup.object().shape({
      id: Yup.number()
        .positive()
        .required(),
    });

    // Compare the schema with request fields
    if (!(await schema.isValid(req.params))) {
      return res.status(400).json({ error: 'Id invalid' });
    }

    // Receive id from request params
    const { id } = req.params;

    // Delete recipient from id
    await Recipient.destroy({ where: { id } });

    // Return a message  success to user
    return res.json({ message: 'Recipient has been delete' });
  }
}

export default new RecipientController();
