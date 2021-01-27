import { Request, Response } from "express";
import { getRepository } from "typeorm";
import Role from "../models/Role";
import dump from "../tools/dump";

export default {
  async show(request: Request, response: Response) {
    const { id } = request.params;

    const roleRepository = getRepository(Role);

    const role = await roleRepository.findOneOrFail(id);
    return dump({
      codeParam: 201,
      jsonParam: { message: "SUCCESS", role },
      response,
    });
  },

  async index(request: Request, response: Response) {
    const roleRepository = getRepository(Role);

    const role = await roleRepository.find({});

    return dump({
      codeParam: 201,
      jsonParam: { message: "SUCCESS", role },
      response,
    });
  },

  async create(request: Request, response: Response) {
    const { name, description } = request.body;

    try {
      const rolesRepository = getRepository(Role);
      const data = {
        name,
        description,
      };

      const role = rolesRepository.create(data);

      await rolesRepository.save(role);

      return dump({
        codeParam: 201,
        jsonParam: { message: "Role created successfully", role },
        response,
      });
    } catch (err) {
      return dump({
        codeParam: 401,
        jsonParam: { message: err.message },
        response,
      });
    }
  },

  async update(request: Request, response: Response) {
    const roleRepository = getRepository(Role);
    const { id } = request.params;

    const { name, description } = request.body;
    const role = await roleRepository.findOne(id);

    if (!role) {
      return dump({
        codeParam: 201,
        jsonParam: { message: "Role don't find" },
        response,
      });
    }

    await roleRepository.save({
      id: role.id,
      name,
      description,
    });

    const updatedRole = await roleRepository.findOne(id);

    return dump({
      codeParam: 201,
      jsonParam: { message: "Role updated successfully", updatedRole },
      response,
    });
  },

  async delete(request: Request, response: Response) {
    const roleRepository = getRepository(Role);
    const { id } = request.params;
    await roleRepository.delete(id);
    return dump({
      codeParam: 201,
      jsonParam: { message: "ROLE DELETED SUCCESFULLY" },
      response,
    });
  },
};
