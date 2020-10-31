import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

// import { FiPlus } from "react-icons/fi";

import "./styles.css";
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

export default function ListAllEmployees() {
  const history = useHistory();

  const [employees, setEmployees] = useState<Employee[]>();
  const [roles, setRoles] = useState<Role[]>();
  const [loading, setLoading] = useState(false);

  // /** HANDLERS */
  useEffect(() => {
    api.get("employees/v1/").then((response) => {
      setEmployees(response.data.data.employees);
    });

    api.get("roles/v1/").then((response) => {
      setRoles(response.data.data.role);
    });

    setLoading(true);
  }, [employees]);

  async function handlerDeleteEmployee(id: number) {
    await api.delete(`employees/v1/${id}`);
  }

  return (
    <div id="page-create-orphanage">
      <Sidebar />
      <main>
        <form className="create-orphanage-form">
          <fieldset>
            <legend>Aqui está a lista dos seus funcionários</legend>

            {!(
              employees === undefined ||
              employees === null ||
              employees.length === 0
            ) ? (
              employees?.map((employee) => {
                return (
                  <>
                    <div key={employee.id}>
                      <h1>
                        {employee.name} {employee.last_name}
                      </h1>
                      {roles?.map((role) => {
                        if (role.id === employee.role_id) {
                          return <p> Cargo: {role.name}</p>;
                        }
                        return <div></div>;
                      })}

                      <p>Salário: R$ {employee.salary}</p>
                      <button
                        onClick={() => {
                          history.push(`/employee-edit/${employee.id}`);
                        }}
                      >
                        Editar funcionário
                      </button>

                      <button
                        onClick={() => {
                          history.push(`/employee/${employee.id}`);
                        }}
                      >
                        Ver detalhes do funcionário
                      </button>
                      <button
                        onClick={() => {
                          handlerDeleteEmployee(employee.id);
                        }}
                      >
                        Deletar funcionário
                      </button>
                    </div>
                  </>
                );
              })
            ) : (
              <p>Nenhum funcionário por enquanto!</p>
            )}
          </fieldset>
          <button
            className="confirm-button"
            id="list-all-employees"
            onClick={() => history.push("/employee/create")}
          >
            Criar um funcionário
          </button>
        </form>
      </main>
    </div>
  );
}

// return `https://a.tile.openstreetmap.org/${z}/${x}/${y}.png`;
