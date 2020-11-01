import React, { useEffect, useState } from "react";
import {
  FiArrowRight,
  FiBriefcase,
  FiEdit2,
  FiPlus,
  FiTrash,
} from "react-icons/fi";
import { Link, useHistory } from "react-router-dom";
import Sidebar from "../../../components/Sidebar";

import api from "../../../services/api";

import "./styles.css";

interface Role {
  id: number;
  name: string;
  description: string;
}

export default function ListAllRoles() {
  const [roles, setRoles] = useState<Role[]>([]);
  const history = useHistory();

  function handlerDeleteARole(id: number) {
    api.delete(`/roles/v1/${id}`).then(() => {
      history.push("/roles");
    });
  }
  useEffect(() => {
    api.get("roles/v1/").then((response) => {
      setRoles(response.data.data.role);
    });
  }, [roles]);

  return (
    <div id="page-create-role">
      <Sidebar />

      <main id="list-all-roles">
        <form className="create-role-form">
          <fieldset>
            <div className="title">
              <FiBriefcase size={50} color="#0aa8ad" id="icon" />
              <legend>
                Seja bem-vindo(a)! Aqui está a lista dos cargos da sua empresa
              </legend>
            </div>

            {!(roles === undefined || roles === null || roles.length === 0) ? (
              roles?.map((role) => {
                return (
                  <>
                    <div key={role.id} className="role-content">
                      <h1>{role.name}</h1>

                      <p>{role.description}</p>
                      <div className="buttons-container">
                        <button
                          className="role-button"
                          id="edit-button"
                          onClick={() => {
                            history.push(`/role-edit/${role.id}`);
                          }}
                        >
                          <FiEdit2 id="role-button-icon" />
                          Editar cargo
                        </button>

                        <button
                          className="role-button"
                          id="details-button"
                          onClick={() => {
                            history.push(`/role/${role.id}`);
                          }}
                        >
                          <FiPlus id="role-list-all-button-details" />
                          <span>Detalhes</span>
                        </button>
                        <button
                          className="role-button"
                          id="delete-button"
                          onClick={() => {
                            handlerDeleteARole(role.id);
                          }}
                        >
                          <FiTrash id="role-button-icon" />
                          Deletar cargo
                        </button>
                      </div>
                    </div>
                  </>
                );
              })
            ) : (
              <p>😴 Nenhum cargo por enquanto.</p>
            )}
          </fieldset>
          <button
            className="confirm-button"
            id="list-all-roles"
            onClick={() => history.push("/role/create")}
          >
            Adicione um cargo
          </button>
        </form>
      </main>
    </div>
  );
}
