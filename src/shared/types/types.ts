import { FindOneOptions } from 'typeorm';

export type UserResponse = {
  id: number;
  name: string;
  access_token: string;
};

export type UserPayload = {
  id: number;
  name: string;
  email: string;
};

export enum RepositoryType {
  User = 'user',
  Customer = 'customer',
}

export type ValidateById = {
  id: number;
  repositoryType: RepositoryType;
  options?: FindOneOptions<any>;
};
