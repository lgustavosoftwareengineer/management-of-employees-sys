/* eslint-disable camelcase */
import Role from '../models/Role';

interface CreateRoleDTO {
  name: string;
  description: string;
}

interface FindByDTO {
  name?: string;
  id?: string;
}
interface UpdateRoleDTO {
  id: string;
  theChange?: string;
  name?: string;
  description?: string;
}
class RoleRepository {
  private roles: Role[];

  constructor() {
    this.roles = [];
  }

  public all(): Role[] {
    return this.roles;
  }

  public create({ name, description }: CreateRoleDTO): Role {
    const role = new Role({ name, description });

    this.roles.push(role);

    return role;
  }

  public findByName({ name }: FindByDTO): Role | null {
    const roleName = this.roles.find(
      findRoleName => name === findRoleName.name,
    );
    if (roleName) {
      return roleName;
    }
    return null;
  }

  public findByID({ id }: FindByDTO): Role | null {
    const role = this.roles.find(roleFind => roleFind.id === id);
    if (role) {
      return role;
    }
    return null;
  }

  public update({
    id,
    theChange = '',
    name = '',
    description = '',
  }: UpdateRoleDTO): Role {
    const roleUpdated = this.roles.find(role => role.id === id);

    if (roleUpdated) {
      if (theChange.toLowerCase() === 'name') {
        roleUpdated.name = name;
        return roleUpdated;
      }
      if (theChange.toLowerCase() === 'description') {
        roleUpdated.description = description;
        return roleUpdated;
      }

      roleUpdated.name = name;
      roleUpdated.name = name;

      return roleUpdated;
    }

    throw Error(`Don't find role with the id passed`);
  }

  public delete({ id }: FindByDTO): Role {
    const findRole = this.findByID({ id });
    if (findRole) {
      const indexOfRole = this.roles.indexOf(findRole);
      this.roles.splice(indexOfRole, 1);
      return findRole;
    }
    throw Error(`Don't find role with the id passed`);
  }
}

export default RoleRepository;
