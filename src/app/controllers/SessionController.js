import jwt from 'jsonwebtoken';
import * as Yup from 'yup';

import User from '../models/Users';
import authConfig from '../../config/auth';

class SessionController {
  // If the help of Yup builder a schema to validate the request fields
  async store(req, res) {
    const schema = Yup.object().shape({
      email: Yup.string()
        .email()
        .required(),
      password: Yup.string().required(),
    });

    // Compare the schema with request fields
    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation faild' });
    }

    // In the body of the request, create a constant email and password
    const { email, password } = req.body;

    // Search for a user using email
    const user = await User.findOne({ where: { email } });

    // If the user does not exist, return an error
    if (!user) {
      return res.status(401).json({ error: 'User not found' });
    }

    // Verify the password
    if (!(await user.checkPassword(password))) {
      return res.status(401).json({ error: 'Password does not match' });
    }

    // From the user, take id and name
    const { id, name } = user;

    // Return to the user the id, name, email and the token
    return res.json({
      user: {
        id,
        name,
        email,
      },
      // The token is created using the lib jsonwebtoken
      token: jwt.sign({ id }, authConfig.secret, {
        expiresIn: authConfig.expiresIn,
      }),
    });
  }
}

export default new SessionController();
