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
      name: Yup.string(),
      email: Yup.string().email(),
      password: Yup.string()
        .min(6)
        .when('old_password', (old_password, field) =>
          old_password ? field.required() : field
        ),
      confirm_password: Yup.string('passowrd', (password, field) =>
        password ? field.required().oneOf([Yup.ref('password')]) : field
      ),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation faild' });
    }

    const recipient = await Recipient.findByPk(req.RecipientId);

    const { id, name } = await recipient.update(req.body);

    return res.json({
      id,
      name,
    });
  }
}

export default new RecipientController();
