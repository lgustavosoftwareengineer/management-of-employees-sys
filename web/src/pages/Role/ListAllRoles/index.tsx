import React, { useEffect, useState } from "react";
import { FiArrowRight, FiPlus } from "react-icons/fi";
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
    <div id="page-create-orphanage">
      <Sidebar />
      <main>
        <form className="create-orphanage-form">
          <fieldset>
            <legend>Aqui está a lista dos cargos da sua empresa</legend>

            {!(roles === undefined || roles === null || roles.length === 0) ? (
              roles?.map((role) => {
                return (
                  <>
                    <div key={role.id}>
                      <h1>{role.name}</h1>

                      <p>{role.description}</p>
                      <button
                        onClick={() => {
                          history.push(`/role-edit/${role.id}`);
                        }}
                      >
                        Editar cargo
                      </button>

                      <button
                        onClick={() => {
                          history.push(`/role/${role.id}`);
                        }}
                      >
                        Ver detalhes do cargo
                      </button>
                      <button
                        onClick={() => {
                          handlerDeleteARole(role.id);
                        }}
                      >
                        Deletar cargo
                      </button>
                    </div>
                  </>
                );
              })
            ) : (
              <p>Nenhum cargo por enquanto!</p>
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
