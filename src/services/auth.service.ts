import Boom from '@hapi/boom';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';
import UserService from '../services/users.service';
import Config from '../config/config';
import { MailInfo, Auth } from '../types/auth.model';

const userService = new UserService();

class AuthService {
  async getUserByEmail(email: string, password: string) {
    const user = await userService.findByEmail(email);
    if (!user) {
      throw Boom.unauthorized();
    }
    const match = await bcrypt.compare(password, user.password as string);
    if (!match) {
      throw Boom.unauthorized();
    }
    return user;
  }

  signToken(user: { id: number; role: string }) {
    const payload = {
      sub: user.id,
      role: user.role,
    };
    const token = jwt.sign(payload, Config.jwtSecret as string);
    return { user, token };
  }

  async recoveryPassword(email: string) {
    const user = await userService.findByEmail(email);
    if (!user) {
      throw Boom.notFound(`There is no user with email: ${email}`);
    }

    const payload = {
      sub: user.id,
    };

    const token = jwt.sign(payload, Config.jwtRecoverySecret as string, {
      expiresIn: '15min',
    });
    const link = `http://myfrontend.com/recovery?token=${token}`;
    await userService.update(user.id.toString(), { token });

    const testAccount = await nodemailer.createTestAccount();

    const mailConfig = {
      from: testAccount.user, // sender address
      to: email, // list of receivers
      subject: 'Recover password', // Subject line
      html: `<b>Go to this link to recovert your password => </b><a href='${link}'>${link}</a>`, // html body
    };
    const rta = this.sendEmail(mailConfig, {
      user: testAccount.user,
      pass: testAccount.pass,
    });
    return rta;
  }

  async sendEmail(mailInfo: MailInfo, auth: Auth) {
    const transport = nodemailer.createTransport({
      host: 'smtp.ethereal.email',
      port: 587,
      secure: false,
      auth,
    });

    const info = await transport.sendMail(mailInfo);

    console.log('Message sent: %s', info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

    // Preview only available when sending through an Ethereal account
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
    // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...

    return {
      message: 'Mail sent',
    };
  }

  async changePassword(newPassword: string, token: string) {
    try {
      const payload: any = jwt.verify(
        token,
        Config.jwtRecoverySecret as string
      );

      const user = await userService.findOne(payload.sub);
      if (user.token !== token) {
        throw Boom.unauthorized();
      }
      await userService.update(user.id.toString(), {
        password: newPassword,
        token: null,
      });

      return {
        message: 'Password changed',
      };
    } catch (error) {
      throw Boom.unauthorized();
    }
  }
}

export default AuthService;
