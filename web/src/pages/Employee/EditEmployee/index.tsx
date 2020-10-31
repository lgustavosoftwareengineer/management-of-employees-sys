import React, { FormEvent, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";

import Sidebar from "../../../components/Sidebar";
import api from "../../../services/api";

interface Employee {
  id: number;
  name: string;
  last_name: string;
  birth_date: string;
  salary: number;
  role_id: number;
}

interface Role {
  id: number;
  name: string;
  description: string;
}

interface EmployeeParams {
  id: string;
}

export default function EditEmployee() {
  const history = useHistory();

  const params = useParams<EmployeeParams>();
  const [employee, setEmployee] = useState<Employee>();
  const [name, setName] = useState<string>();
  const [last_name, setLastName] = useState<string>();
  const [role_id, setRoleId] = useState<number>();
  const [birth_date, setBirthDate] = useState<string>();
  const [salary, setSalary] = useState<number>();
  const [roles, setRoles] = useState<Role[]>();

  useEffect(() => {
    api.get(`employees/v1/${params.id}/`).then((response) => {
      setEmployee(response.data.data.params);
    });

    api.get("roles/v1").then((response) => {
      setRoles(response.data.data.role);
    });
  }, [params.id, roles, employee]);

  if (!employee) {
    return <p>Carregando ...</p>;
  }

  return (
    <div id="page-create-orphanage">
      <Sidebar />
      <main>
        <form className="create-orphanage-form">
          <fieldset>
            <legend>Edite um Funcionário</legend>

            <div className="input-block">
              <label htmlFor="name">Nome do cargo</label>
              <input
                id="name"
                defaultValue={employee.name}
                onChange={(event) => setName(event.target.value)}
              />
            </div>

            <div className="input-block">
              <label htmlFor="last_name">Sobrenome</label>
              <input
                id="last_name"
                value={last_name}
                defaultValue={employee.last_name}
                onChange={(event) => setLastName(event.target.value)}
              />
            </div>
            <div className="input-block">
              <label htmlFor="birth_date">Data de nascimento</label>
              <input
                id="birth_date"
                value={birth_date}
                defaultValue={employee.birth_date}
                onChange={(event) => setBirthDate(event.target.value)}
              />
            </div>
          </fieldset>

          <div className="input-block">
            <select
              className="custom-select m3"
              id="inputGroupSelect01"
              defaultValue={employee.role_id}
              onChange={(event) => {
                setRoleId(Number(event.target.value));
                console.log(role_id);
              }}
            >
              <option defaultValue="Clique aqui para escolher o cargo" hidden>
                Clique aqui para escolher o cargo
              </option>
              {roles ? (
                roles.map((role) => {
                  return (
                    <>
                      <option value={role.id}>{role.name}</option>
                    </>
                  );
                })
              ) : (
                <div></div>
              )}
            </select>
          </div>

          <div className="input-block ">
            <label htmlFor="salary">Salário</label>
            <div className="input-group">
              <div className="input-group-prepend">
                <span className="input-group-text" id="inputGroupFileAddon01">
                  R$
                </span>
              </div>
              <input
                id="salary"
                value={salary}
                defaultValue={employee.salary}
                onChange={(event) => setSalary(Number(event.target.value))}
              />
            </div>
          </div>

          <button className="confirm-button" type="submit">
            Confirmar
          </button>
        </form>
      </main>
    </div>
  );
}
