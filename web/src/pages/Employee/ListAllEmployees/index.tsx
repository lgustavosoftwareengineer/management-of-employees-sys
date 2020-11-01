import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

// import { FiPlus } from "react-icons/fi";

import "./styles.css";
import Sidebar from "../../../components/Sidebar";
import api from "../../../services/api";
import {
  FiEdit2,
  FiPlus,
  FiTrash,
  FiUsers,
  FiUser,
  FiHome,
} from "react-icons/fi";
import Loading from "../../../components/Loading";

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
  const [company, setCompany] = useState<any>(
    JSON.parse(String(localStorage.getItem("CompanyData")))
  );

  // /** HANDLERS */
  useEffect(() => {
    console.log(company);
    api.get("employees/v1/").then((response) => {
      setEmployees(response.data.data.employees);
    });

    api.get("roles/v1/").then((response) => {
      setRoles(response.data.data.role);
    });

    return () => setLoading(true);
  }, [employees]);

  async function handlerDeleteEmployee(id: number) {
    await api.delete(`employees/v1/${id}`);
  }

  if (!employees) {
    return <Loading />;
  }

  return (
    <>
      <div id="page-create-role">
        <Sidebar page="employee" />

        <main id="list-all-roles">
          <form className="create-role-form">
            <fieldset>
              <div className="title">
                <FiUsers size={50} color="#0aa8ad" id="icon" />
                <legend>
                  <span style={{ color: "#0aa8ad" }}>Seja bem-vindo(a)</span>,{" "}
                  {company?.name}! Aqui está a lista dos funcionários da{" "}
                  {company.companyName}
                </legend>
              </div>

              {!(
                employees === undefined ||
                employees === null ||
                employees.length === 0
              ) ? (
                employees?.map((employee) => {
                  return (
                    <>
                      <div key={employee.id} className="role-content">
                        <h1 style={{ color: "#5c8599" }}>
                          {employee.name} {employee.last_name}
                        </h1>

                        <p>
                          Salário:{" "}
                          <span style={{ color: "#7e7d7d" }}>
                            R$ {employee.salary}
                          </span>{" "}
                        </p>

                        {roles?.map((role) => {
                          if (role.id === employee.role_id) {
                            return (
                              <p>
                                {" "}
                                Cargo:{" "}
                                <span style={{ color: "#0aa8ad" }}>
                                  {role.name}
                                </span>
                              </p>
                            );
                          }
                          return <div></div>;
                        })}
                        <div className="buttons-container">
                          <button
                            className="employee-button"
                            id="edit-button"
                            onClick={() => {
                              history.push(`/employee-edit/${employee.id}`);
                            }}
                          >
                            <FiEdit2 id="role-button-icon" />
                            Editar funcionário
                          </button>

                          <button
                            className="employee-button"
                            id="details-button"
                            onClick={() => {
                              history.push(`/employee/${employee.id}`);
                            }}
                          >
                            <FiPlus id="role-button-icon" />
                            Detalhes
                          </button>
                          <button
                            className="employee-button"
                            id="delete-button"
                            onClick={() => {
                              handlerDeleteEmployee(employee.id);
                            }}
                          >
                            <FiTrash id="role-button-icon" />
                            Deletar funcionário
                          </button>
                        </div>
                      </div>
                    </>
                  );
                })
              ) : (
                <p>😴 Nenhum funcionário por enquanto!</p>
              )}
            </fieldset>
            <button
              className="confirm-button"
              id="list-all-roles"
              onClick={() => history.push("/employee/create")}
            >
              Adicione um funcionário
            </button>
          </form>
        </main>

        <div id="company-data" onClick={() => history.push("/")}>
          <div
            id="company-content"
            style={{ marginTop: 10, paddingTop: 20, paddingBottom: -20 }}
          >
            <FiUser id="company-icon" />
            <p>{company.name}</p>
          </div>
          <div id="company-content" style={{ marginTop: -18 }}>
            <FiHome id="company-icon" style={{ marginBottom: 60 }} />
            <p>{company.companyName}</p>
          </div>
        </div>
      </div>
    </>
  );
}

// return `https://a.tile.openstreetmap.org/${z}/${x}/${y}.png`;
