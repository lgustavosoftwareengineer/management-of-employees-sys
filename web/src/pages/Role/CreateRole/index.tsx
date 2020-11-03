import React, { ChangeEvent, FormEvent, useState } from "react";
import { useHistory } from "react-router-dom";

// import { FiPlus } from "react-icons/fi";

import "./styles.css";
import Sidebar from "../../../components/Sidebar";
import api from "../../../services/api";

export default function CreateRole() {
  const history = useHistory();

  const [name, setName] = useState<string>();
  const [description, setDescription] = useState<string>();

  // /** HANDLERS */
  async function handleSubmit(event: FormEvent) {
    event.preventDefault();

    const data = { name, description };

    if (!(name && description) || !(name || description)) {
      alert("Preencha os campos");
    }
    const role = localStorage.setItem(
      "roleInLocalStorage",
      JSON.stringify(data)
    );
    await api.post("roles/v1/", data);

    alert('Cadastro realizado com sucesso"');

    history.push("/roles");
  }

  return (
    <div id="page-create-role">
      <Sidebar />
      <main>
        <form onSubmit={handleSubmit} className="create-role-form">
          <fieldset>
            <legend>Crie um cargo</legend>
            <div className="input-block">
              <label htmlFor="name">Nome do cargo</label>
              <input
                id="name"
                value={name}
                onChange={(event) => setName(event.target.value)}
              />
            </div>

            <div className="input-block">
              <label htmlFor="description">Descrição do cargo</label>
              <textarea
                id="description"
                value={description}
                onChange={(event) => setDescription(event.target.value)}
              />
            </div>
          </fieldset>

          <button className="confirm-button" id="create-role" type="submit">
            Confirmar
          </button>
        </form>
      </main>
    </div>
  );
}
