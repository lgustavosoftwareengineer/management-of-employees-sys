/* eslint-disable camelcase */
import { uuid } from 'uuidv4';

class Users {
  // id
  id: string;

  // nome
  name: string;

  // last_name
  last_name: string;

  // senha
  birth_date: string;

  job_post: string;

  salary: number;

  constructor({
    name,
    last_name,
    birth_date,
    job_post,
    salary,
  }: Omit<Users, 'id'>) {
    this.id = uuid();
    this.name = name;
    this.last_name = last_name;
    this.birth_date = birth_date;
    this.job_post = job_post;
    this.salary = salary;
  }
}
export default Users;
