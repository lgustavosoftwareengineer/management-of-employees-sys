/* eslint-disable camelcase */
import { uuid } from 'uuidv4';

class User {
  // id
  id: string;

  // nome
  name: string;

  // last_name
  last_name: string;

  // senha
  birth_date: string;

  role_id: number;

  salary: number;

  constructor({
    name,
    last_name,
    birth_date,
    role_id,
    salary,
  }: Omit<User, 'id'>) {
    this.id = uuid();
    this.name = name;
    this.last_name = last_name;
    this.birth_date = birth_date;
    this.role_id = role_id;
    this.salary = salary;
  }
}
export default User;
