/* eslint-disable camelcase */
import Role from '../models/Role'; // Importo para a minha classe saber qual a estrutura de um usuário
import RoleRepository from '../repositories/RolesRepository'; // Importo para a minha classe saber o que eu devo fazer como  meu usuário

interface CreateRoleDTO {
  name: string;
  description: string;
}

class CreateRoleService {
  private roleRepository: RoleRepository;

  constructor(roleRepository: RoleRepository) {
    this.roleRepository = roleRepository;
  }

  public execute({ name, description }: CreateRoleDTO): Role {
    const findRole = this.roleRepository.findByName({ name });
    if (findRole) {
      throw Error('Role already exists');
    }
    const role = this.roleRepository.create({
      name,
      description,
    });
    return role;
  }
}
export default CreateRoleService;
