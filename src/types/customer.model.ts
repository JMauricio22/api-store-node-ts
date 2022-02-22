import { CreateUser } from './user.model';

export interface CreateCustomer {
  firstName: string;
  lastName: string;
  phone: string;
  user: CreateUser;
}

export interface UpdateCustomer extends Partial<CreateCustomer> {}
