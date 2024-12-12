import PeopleType from './peopleType';

export interface LoginRequestEntityType {
  email: string;
  password: string;
}
export interface LoginResponseEntityType {
  token: string;
  role: string;
  people: PeopleType;
}
