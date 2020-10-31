/* eslint-disable camelcase */
import User from '../models/User';

interface CreateUserDTO {
  name: string;
  last_name: string;
  role_id: number;
  birth_date: string;
  salary: number;
}

interface FindByDTO {
  name?: string;
  id?: string;
}
interface UpdateUserDTO {
  id: string;
  theChange?: string;
  name?: string;
  last_name?: string;
  role_id?: number;
  birth_date?: string;
  salary?: number;
}
class UserRepository {
  private users: User[];

  constructor() {
    this.users = [];
  }

  public all(): User[] {
    return this.users;
  }

  public create({
    name,
    last_name,
    role_id,
    birth_date,
    salary,
  }: CreateUserDTO): User {
    const user = new User({ name, last_name, role_id, birth_date, salary });

    this.users.push(user);

    return user;
  }

  public findByName({ name }: FindByDTO): User | null {
    const userName = this.users.find(
      findUserName => name === findUserName.name,
    );
    if (userName) {
      return userName;
    }
    return null;
  }

  public findByID({ id }: FindByDTO): User | null {
    const user = this.users.find(userFind => userFind.id === id);
    if (user) {
      return user;
    }
    return null;
  }

  public update({
    id,
    theChange = '',
    name = '',
    last_name = '',
    role_id = 0,
    birth_date = '',
    salary = 0,
  }: UpdateUserDTO): User {
    const userUpdated = this.users.find(user => user.id === id);

    if (userUpdated) {
      if (theChange.toLowerCase() === 'name') {
        userUpdated.name = name;
        return userUpdated;
      }
      if (theChange.toLowerCase() === 'last_name') {
        userUpdated.last_name = last_name;
        return userUpdated;
      }
      if (theChange.toLowerCase() === 'role_id') {
        userUpdated.role_id = role_id;
        return userUpdated;
      }

      if (theChange.toLowerCase() === 'birth_date') {
        userUpdated.birth_date = birth_date;
        return userUpdated;
      }

      if (theChange.toLowerCase() === 'salary') {
        userUpdated.salary = salary;
        return userUpdated;
      }

      userUpdated.birth_date = birth_date;
      userUpdated.name = name;
      userUpdated.last_name = last_name;
      userUpdated.role_id = role_id;
      userUpdated.salary = salary;

      return userUpdated;
    }

    throw Error(`Don't find user with the id passed`);
  }

  public delete({ id }: FindByDTO): User {
    const findUser = this.findByID({ id });
    if (findUser) {
      const indexOfUser = this.users.indexOf(findUser);
      this.users.splice(indexOfUser, 1);
      return findUser;
    }
    throw Error(`Don't find user with the id passed`);
  }
}

export default UserRepository;
