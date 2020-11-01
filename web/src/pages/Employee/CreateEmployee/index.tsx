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
    <div id="page-create-role">
      <Sidebar page="employee" />
      <main>
        <form onSubmit={handleSubmit} className="create-role-form">
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
                placeholder={"Digite aqui sobrenome do funcionário..."}
                onChange={(event) => setLastName(event.target.value)}
              />
            </div>

            <div className="input-block">
              <label htmlFor="birth_date">Data de nascimento</label>
              <input
                id="birth_date"
                value={birth_date}
                onChange={(event) => setBirthDate(event.target.value)}
              />
            </div>
          </fieldset>

          <div className="input-block">
            <select
              className="custom-select m3"
              id="inputGroupSelect01"
              onChange={(event) => {
                setRoleId(Number(event.target.value));
                console.log(role_id);
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

// return `https://a.tile.openstreetmap.org/${z}/${x}/${y}.png`;
