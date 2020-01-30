import * as Yup from 'yup';

import Recipient from '../models/Recipient';

class RecipientController {
  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      rua: Yup.string().required(),
      numero: Yup.number()
        .required()
        .positive(),
      complemento: Yup.string(),
      estado: Yup.string().required(),
      cidade: Yup.string().required(),
      cep: Yup.string()
        .required()
        .length(9),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation faild' });
    }

    const { id, name, estado, cidade } = await Recipient.create(req.body);

    return res.json({
      id,
      name,
      estado,
      cidade,
    });
  }

  async update(req, res) {
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

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation faild' });
    }

    const { id } = req.body;

    const recipient = await Recipient.findByPk(id);

    if (!recipient) {
      return res.status(400).json({ error: 'Id invalid' });
    }

    const { name, estado, cidade } = await recipient.update(req.body);

    return res.json({
      id,
      name,
      estado,
      cidade,
    });
  }
}

export default new RecipientController();
