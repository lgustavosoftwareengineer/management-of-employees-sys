/* eslint-disable camelcase */
import { uuid } from 'uuidv4';

class Role {
  id: string;

  name: string;

  description: string;

  constructor({ name, description }: Omit<Role, 'id'>) {
    this.id = uuid();
    this.name = name;
    this.description = description;
  }
}
export default Role;
