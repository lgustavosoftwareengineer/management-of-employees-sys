import { Request, Response } from "express";
import { getRepository } from "typeorm";
import Role from "../models/Role";
import Employee from "../models/Employee";
import dump from "../tools/dump";

interface EmployeeDTO {
  id: number;
  name: string;
  last_name: string;
  role?: string | number;
  birth_date: string;
  salary: number;
}

export default {
  async show(request: Request, response: Response) {
    const { id } = request.params;

    const employeeRepository = getRepository(Employee);
    const roleRepository = getRepository(Role);

    const employee = await employeeRepository.findOneOrFail(id);
    const role = await roleRepository.findOneOrFail(employee.role_id);

    return dump({
      codeParam: 201,
      jsonParam: {
        message: "SUCCESS",
        params: {
          name: employee.name,
          last_name: employee.last_name,
          role: role.name,
          birth_date: employee.birth_date,
          salary: employee.salary,
        },
      },
      response,
    });
  },

  async index(request: Request, response: Response) {
    const employeeRepository = getRepository(Employee);

    const employees = await employeeRepository.find({});

    return dump({
      codeParam: 201,
      jsonParam: { message: "SUCCESS", employees },
      response,
    });
  },

  async create(request: Request, response: Response) {
    const { name, last_name, role_id, birth_date, salary } = request.body;

    try {
      const employeesRepository = getRepository(Employee);

      const data = {
        name,
        last_name,
        role_id,
        birth_date,
        salary,
      };

      const employee = employeesRepository.create(data);

      await employeesRepository.save(employee);

      return dump({
        codeParam: 201,
        jsonParam: { message: "EMPLOYEE CREATED SUCCESSFULLY", employee },
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
    const employeeRepository = getRepository(Employee);
    const { id } = request.params;

    const { name, last_name, role_id, birth_date, salary } = request.body;

    const employee = await employeeRepository.findOne(id);

    if (!employee) {
      return dump({
        codeParam: 201,
        jsonParam: { message: "[ERROR] IN UPDATED EMPLOYEE SUCCESSFULLY" },
        response,
      });
    }

    await employeeRepository.save({
      id: employee.id,
      name,
      last_name,
      role_id,
      birth_date,
      salary,
    });

    const updatedEmployee = await employeeRepository.findOne(id);

    return dump({
      codeParam: 201,
      jsonParam: { message: "EMPLOYEE UPDATED SUCCESSFULLY", updatedEmployee },
      response,
    });
  },

  async delete(request: Request, response: Response) {
    const employeeRepository = getRepository(Employee);
    const { id } = request.params;
    await employeeRepository.delete(id);
    return dump({
      codeParam: 201,
      jsonParam: { message: "EMPLOYEE DELETED SUCCESSFULLY" },
      response,
    });
  },
};
