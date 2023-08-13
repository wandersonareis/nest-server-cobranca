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
  repositoryType: RepositoryType;
  options: FindOneOptions;
};

export type ObjectKey<T> = keyof T;
