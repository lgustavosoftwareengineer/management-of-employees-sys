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
    <div>
      {role ? (
        <div key={role.id}>
          <h1>{role.name}</h1>
          <p>{role.description}</p>
          <button onClick={() => history.push("/roles")}>Voltar</button>
        </div>
      ) : (
        <div>
          <p>Carregando...</p>
        </div>
      )}
    </div>
  );
}
