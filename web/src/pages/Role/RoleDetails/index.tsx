import React, { FormEvent, useEffect, useState } from "react";
import { FiFileText } from "react-icons/fi";
import { useHistory, useParams } from "react-router-dom";
import Loading from "../../../components/Loading";

import Sidebar from "../../../components/Sidebar";
import api from "../../../services/api";

import "./styles.css";
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
    return <Loading />;
  }
  return (
    <div id="page-create-role">
      <Sidebar />
      <main>
        <form className="create-role-form">
          <fieldset>
            {role ? (
              <div key={role.id}>
                <div className="title" id="title-role">
                  <FiFileText size={50} color="#0aa8ad" id="role-icon" />
                  <legend>{role.name}</legend>
                </div>

                <p> {role.description}</p>

                <button
                  className="edit-role"
                  onClick={() => {
                    history.push(`/role-edit/${role.id}`);
                  }}
                >
                  Editar cargo
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
