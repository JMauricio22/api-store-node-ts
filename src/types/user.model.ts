export interface CreateUser {
  email: string;
  password: string;
}
export interface UpdateUser extends Partial<CreateUser> {}
