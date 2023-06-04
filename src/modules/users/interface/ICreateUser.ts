import IPersonalInfo from '@/shared/interface/IPersonalInfo';

export default interface ICreateUser extends IPersonalInfo {
  password: string;
}
