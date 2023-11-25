export type User = {
  id: number,
  username: string,
  password: string,
  firstName: string,
  lastName: string,
};

export type UserWithOutPassword = Omit<User, 'password'>;

export type NewUser = Omit<User, 'id'>;
