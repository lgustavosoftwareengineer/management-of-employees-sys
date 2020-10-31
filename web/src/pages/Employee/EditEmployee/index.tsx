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
  role: string;
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
  const [role, setRole] = useState<string>();
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
  }, [params.id]);

  if (!employee) {
    return <p>Carregando ...</p>;
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();

    const data = {
      name,
      last_name,
      role_id,
      birth_date,
      salary,
    };
    console.log(data);
    setName(employee?.name);
    setLastName(employee?.last_name);
    setRole(employee?.role);
    setBirthDate(employee?.birth_date);
    await api.put(`employees/v1/${params.id}`, data);
    setSalary(employee?.salary);

    alert("Dados editados com sucesso");

    history.push("/employees");
  }

  return (
    <div id="page-create-orphanage">
      <Sidebar />
      <main>
        <form onSubmit={handleSubmit} className="create-orphanage-form">
          <fieldset>
            <legend>Crie um funcionário</legend>

            <div className="input-block">
              <label htmlFor="name">Nome</label>
              <input
                id="name"
                value={name}
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
                placeholder={"Digite aqui sobrenome do funcionário..."}
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
            {console.log(role, role_id)}

            <select
              className="custom-select m3"
              id="inputGroupSelect01"
              defaultValue={employee.role}
              onChange={(event) => {
                setRoleId(Number(event.target.value.split(":")[0]));
                setRole(String(event.target.value.split(":")[1]));
              }}
            >
              <option defaultValue={role} hidden>
                {role}
              </option>
              {roles ? (
                roles.map((role) => {
                  return (
                    <>
                      <option key={role.id} value={`${role.id}:${role.name}`}>
                        {role.name}
                      </option>
                    </>
                  );
                })
              ) : (
                <option></option>
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
                type="number"
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
