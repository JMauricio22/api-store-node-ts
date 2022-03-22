export interface CreateUser {
  email: string;
  password: string;
  role: 'admin' | 'customer' | 'seller';
}
export interface UpdateUser extends Partial<CreateUser> {
  token?: string | null;
}
