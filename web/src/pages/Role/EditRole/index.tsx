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

export default function EditRole() {
  const history = useHistory();

  const params = useParams<RoleParams>();
  const [role, setRole] = useState<Role>();
  const [name, setName] = useState(role?.name);
  const [description, setDescription] = useState(role?.description);

  useEffect(() => {
    api.get(`roles/v1/${params.id}`).then((response) => {
      setRole(response.data.data.role);
    });
  }, [params.id]);

  if (!role) {
    return <Loading />;
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();

    const data = { name, description };
    setName(role?.name);
    setDescription(role?.description);
    await api.put(`roles/v1/${params.id}`, data);

    alert("Dados editados com sucesso");

    history.push("/roles");
  }

  return (
    <div id="page-create-role">
      <Sidebar />
      <main>
        <form className="create-role-form" onSubmit={handleSubmit}>
          <fieldset>
            <div className="title" id="title-role">
              <FiFileText size={50} color="#0aa8ad" id="role-icon" />
              <legend>Edite um cargo</legend>
            </div>

            <div className="input-block">
              <label htmlFor="name">Nome do cargo</label>
              <input
                id="name"
                defaultValue={role.name}
                onChange={(event) => setName(event.target.value)}
              />
            </div>

            <div className="input-block">
              <label htmlFor="description">Descrição do cargo</label>
              <textarea
                id="description"
                defaultValue={role.description}
                onChange={(event) => setDescription(event.target.value)}
                contentEditable={"true"}
                suppressContentEditableWarning={true}
              />
            </div>
          </fieldset>

          <button className="confirm-button" id="edit-role" type="submit">
            Confirmar
          </button>
        </form>
      </main>
    </div>
  );
}
