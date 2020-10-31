import React, { FormEvent, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";

import Sidebar from "../../../components/Sidebar";
import api from "../../../services/api";

interface Role {
  id: number;
  name: string;
  description: string;
}

interface RoleParams {
  id: string;
}

export default function RoleDetails() {
  const history = useHistory();

  const params = useParams<RoleParams>();
  const [role, setRole] = useState<Role>();

  useEffect(() => {
    api.get(`roles/v1/${params.id}`).then((response) => {
      setRole(response.data.data.role);
    });
  }, []);

  if (!role) {
    return <p>Carregando ...</p>;
  }
  return (
    <div id="page-create-orphanage">
      <Sidebar />
      <main>
        <form className="create-orphanage-form">
          <fieldset>
            {role ? (
              <div key={role.id}>
                <legend>{role.name}</legend>

                <p> {role.description}</p>

                <button
                  onClick={() => {
                    history.push(`/role-edit/${role.id}`);
                  }}
                >
                  Editar role
                </button>
              </div>
            ) : (
              <div></div>
            )}
          </fieldset>
        </form>
      </main>
    </div>
  );
}
