/* eslint-disable camelcase */
import User from '../models/Users'; // Importo para a minha classe saber qual a estrutura de um usuário
import UserRepository from '../repositories/UsersRepository'; // Importo para a minha classe saber o que eu devo fazer como  meu usuário

interface CreateUserDTO {
  name: string;
  last_name: string;
  job_post: string;
  birth_date: string;
  salary: number;
}

class CreateUserService {
  private usersRepository: UserRepository;

  constructor(usersRepository: UserRepository) {
    this.usersRepository = usersRepository;
  }

  public execute({
    name,
    last_name,
    job_post,
    birth_date,
    salary,
  }: CreateUserDTO): User {
    const findUser = this.usersRepository.findByName({ name });
    if (findUser) {
      throw Error('User already exists');
    }
    const user = this.usersRepository.create({
      name,
      last_name,
      job_post,
      birth_date,
      salary,
    });
    return user;
  }
}
export default CreateUserService;
