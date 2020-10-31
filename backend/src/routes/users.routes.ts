/* eslint-disable camelcase */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Router } from 'express';
import dump from '../tools/dump';
import hashingFunction from '../tools/hashing';
import UsersRepository from '../repositories/UsersRepository';
import CreateUsersService from '../services/CreateUserService';

const userRouter = Router();

const usersRepository = new UsersRepository();

userRouter.get('/v1/', (request, response) => {
  const users = usersRepository.all();

  return dump({ codeParam: 200, jsonParam: users, response });
});

userRouter.get('/v1/:id', (request, response) => {
  const { id } = request.params;
  const user = usersRepository.findByID({ id });

  return dump({ codeParam: 200, jsonParam: user, response });
});

userRouter.post('/v1/', (request, response) => {
  try {
    const { name, last_name, role_id, birth_date, salary } = request.body;
    const createUserService = new CreateUsersService(usersRepository);
    const user = createUserService.execute({
      name,
      last_name,
      role_id,
      birth_date,
      salary,
    });

    return dump({
      codeParam: 201,
      jsonParam: { message: 'User created successfully', user },
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
userRouter.put('/v1/:id', (request, response) => {
  const { id } = request.params;
  const { name, last_name, role_id, birth_date } = request.body;

  if (name) {
    try {
      usersRepository.update({ id, name, theChange: 'name' });
      return dump({
        codeParam: 200,
        jsonParam: usersRepository.findByID({ id }),
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
  if (last_name) {
    try {
      usersRepository.update({ id, last_name, theChange: 'last_name' });
      return dump({
        codeParam: 200,
        jsonParam: usersRepository.findByID({ id }),
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
  if (role_id) {
    try {
      usersRepository.update({ id, role_id, theChange: 'role_id, ' });
      return dump({
        codeParam: 200,
        jsonParam: usersRepository.findByID({ id }),
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

  if (birth_date) {
    try {
      usersRepository.update({ id, birth_date, theChange: 'birth_date, ' });
      return dump({
        codeParam: 200,
        jsonParam: usersRepository.findByID({ id }),
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

userRouter.delete('/v1/:id', (request, response) => {
  const { id } = request.params;
  try {
    usersRepository.delete({ id });
    dump({
      codeParam: 200,
      jsonParam: { msg: 'Success' },
      response,
    });
  } catch (error) {
    dump({ codeParam: 200, jsonParam: { msg: error.message }, response });
  }
});
export default userRouter;
