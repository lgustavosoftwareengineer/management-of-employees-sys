import React, { useEffect, useState } from "react";
import { FiArrowRight, FiPlus } from "react-icons/fi";
import { Link, useHistory } from "react-router-dom";

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
    localStorage.setItem("id", String(id));
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
    <div>
      {roles.map((role) => {
        return (
          <div key={role.id}>
            <p>{role.name}</p>
            <p>{role.id}</p>
            <p>{role.description}</p>
            <button>
              <Link to={`role/edit/${role.id}/`}>Editar</Link>
            </button>
            <button
              onClick={() => {
                handlerDeleteARole(role.id);
              }}
            >
              Deletar
            </button>
          </div>
        );
      })}
    </div>
  );
}
