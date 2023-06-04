import IAddress from './IAddress';

export default interface IPersonalInfo {
  id: number;

  name: string;

  email: string;

  cpf?: string;

  phone?: string;

  address: IAddress;

  [key: string]: any;
}
