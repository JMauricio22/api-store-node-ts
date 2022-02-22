export interface CreateCategory {
  name: string;
}

export interface UpdateCategory extends Partial<CreateCategory> {}
