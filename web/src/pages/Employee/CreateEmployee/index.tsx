import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

// import { FiPlus } from "react-icons/fi";

import "./styles.css";
import Sidebar from "../../../components/Sidebar";
import api from "../../../services/api";

interface Role {
  id: number;
  name: string;
  description: string;
}

export default function CreateEmployee() {
  const history = useHistory();

  const [name, setName] = useState<string>();
  const [last_name, setLastName] = useState<string>();
  const [role_id, setRoleId] = useState<number>(0);
  const [birth_date, setBirthDate] = useState<string>();
  const [salary, setSalary] = useState<number>();
  const [roles, setRoles] = useState<Role[]>([]);

  // /** HANDLERS */
  async function handleSubmit(event: FormEvent) {
    event.preventDefault();

    const data = { name, last_name, role_id, birth_date, salary };
    if (
      !(name || last_name || role_id || birth_date || salary) ||
      !(name && last_name && role_id && birth_date && salary)
    ) {
      alert("Algum campo está faltando");
    } else {
      await api.post("employees/v1", data);
      localStorage.setItem("employeeInLocalStorage", JSON.stringify(data));

      alert("Cadastro realizado com sucesso!");

      history.push("/employees/");
    }
  }

  useEffect(() => {
    api.get("roles/v1").then((response) => {
      setRoles(response.data.data.role);
    });
  }, [roles]);

  return (
    <div id="page-create-employee">
      <Sidebar page="employee" />
      <main>
        <form onSubmit={handleSubmit} className="create-employee-form">
          <fieldset>
            <legend>Crie um funcionário</legend>

            <div className="input-block">
              <label htmlFor="name">Nome</label>
              <input
                id="name"
                value={name}
                onChange={(event) => setName(event.target.value)}
              />
            </div>

            <div className="input-block">
              <label htmlFor="last_name">Sobrenome</label>
              <input
                id="last_name"
                value={last_name}
                onChange={(event) => setLastName(event.target.value)}
              />
            </div>

            <div className="input-block">
              <label htmlFor="birth_date">Data de nascimento</label>
              <input
                id="birth_date"
                value={birth_date}
                placeholder="Ex: '19/09/2001'"
                onChange={(event) => setBirthDate(event.target.value)}
              />
            </div>
          </fieldset>

          <div className="input-block">
            <label htmlFor="role">Cargo</label>
            <select
              className="custom-select m3"
              id="inputGroupSelect01"
              onChange={(event) => {
                setRoleId(Number(event.target.value));
              }}
            >
              <option defaultValue="Clique aqui para escolher o cargo" hidden>
                Clique aqui para escolher o cargo
              </option>
              {roles.map((role) => {
                return (
                  <>
                    <option value={role.id}>{role.name}</option>
                  </>
                );
              })}
            </select>
          </div>

          <label htmlFor="role">Salário</label>

          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <span className="input-group-text">R$</span>
            </div>
            <input
              id="salary"
              value={salary}
              className="form-control"
              onChange={(event) => setSalary(Number(event.target.value))}
            />
          </div>

          <button className="confirm-button" id="create-employee" type="submit">
            Confirmar
          </button>
        </form>
      </main>
    </div>
  );
}

// return `https://a.tile.openstreetmap.org/${z}/${x}/${y}.png`;
