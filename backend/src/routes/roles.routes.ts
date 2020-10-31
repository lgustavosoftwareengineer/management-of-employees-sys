/* eslint-disable camelcase */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Router } from 'express';
import dump from '../tools/dump';
import RolesRepository from '../repositories/RolesRepository';
import CreateRoleService from '../services/CreateRoleService';

const roleRouter = Router();

const rolesRepository = new RolesRepository();

roleRouter.get('/v1/', (request, response) => {
  const roles = rolesRepository.all();

  return dump({ codeParam: 200, jsonParam: roles, response });
});

roleRouter.get('/v1/:id', (request, response) => {
  const { id } = request.params;
  const role = rolesRepository.findByID({ id });

  return dump({ codeParam: 200, jsonParam: role, response });
});

roleRouter.post('/v1/', (request, response) => {
  try {
    const { name, description } = request.body;
    const createRoleService = new CreateRoleService(rolesRepository);
    const user = createRoleService.execute({
      name,
      description,
    });

    return dump({
      codeParam: 201,
      jsonParam: { message: 'Role created successfully', user },
      response,
    });
  } catch (err) {
    return dump({
      codeParam: 401,
      jsonParam: { message: err.message },
      response,
    });
  }
});

// eslint-disable-next-line consistent-return
roleRouter.put('/v1/:id', (request, response) => {
  const { id } = request.params;
  const { name, description, role_id, birth_date } = request.body;

  if (name) {
    try {
      rolesRepository.update({ id, name, theChange: 'name' });
      return dump({
        codeParam: 200,
        jsonParam: rolesRepository.findByID({ id }),
        response,
      });
    } catch (error) {
      return dump({
        codeParam: 401,
        jsonParam: error.message,
        response,
      });
    }
  }
  if (description) {
    try {
      rolesRepository.update({ id, description, theChange: 'description' });
      return dump({
        codeParam: 200,
        jsonParam: rolesRepository.findByID({ id }),
        response,
      });
    } catch (error) {
      return dump({
        codeParam: 401,
        jsonParam: error.message,
        response,
      });
    }
  }
});

roleRouter.delete('/v1/:id', (request, response) => {
  const { id } = request.params;
  try {
    rolesRepository.delete({ id });
    dump({
      codeParam: 200,
      jsonParam: { msg: 'Success' },
      response,
    });
  } catch (error) {
    dump({ codeParam: 200, jsonParam: { msg: error.message }, response });
  }
});
export default roleRouter;
