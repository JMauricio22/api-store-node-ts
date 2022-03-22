import { getRepository } from 'typeorm';
import { User } from '../entities/User';
import Boom from '@hapi/boom';
import { CreateUser, UpdateUser } from '../types/user.model';
import { validateOrReject } from 'class-validator';
import bcrypt from 'bcrypt';

class UserService {
  async find() {
    const result = await getRepository(User).find({
      select: ['id', 'email'],
    });
    return result;
  }

  async create(body: CreateUser) {
    const user = new User(body.email, body.password, body.role);
    await validateOrReject(user);
    const result = await getRepository(User).save(user);
    delete result.password;
    return result;
  }

  async findOne(id: string): Promise<User> {
    const user = await getRepository(User).findOne(id);
    if (!user) {
      throw Boom.notFound();
    }
    return user;
  }

  async findByEmail(email: string): Promise<User> {
    const user = await getRepository(User).findOne({ where: { email } });
    if (!user) {
      throw Boom.notFound();
    }
    return user;
  }

  async update(id: string, body: UpdateUser) {
    const user = await this.findOne(id);
    Object.keys(body).forEach((key: string) => {
      user[key] = body[key];
    });
    await validateOrReject(user);
    const result = await getRepository(User).save(user as User);
    return result;
  }

  async delete(id: string) {
    const user = await this.findOne(id);
    const result = await getRepository(User).remove(user as User);
    return result;
  }
}

export default UserService;
