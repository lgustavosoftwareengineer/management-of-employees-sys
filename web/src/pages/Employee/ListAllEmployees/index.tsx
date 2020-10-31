import React, { ChangeEvent, FormEvent, useState } from "react";
import { useHistory } from "react-router-dom";

// import { FiPlus } from "react-icons/fi";

import "./styles.css";
import Sidebar from "../../../components/Sidebar";
import api from "../../../services/api";

export default function ListAllEmployees() {
  const history = useHistory();

  const [name, setName] = useState("");
  const [last_name, setLastName] = useState("");
  const [role_id, setRoleId] = useState(0);
  const [birth_date, setBirthDate] = useState("");
  const [salary, setSalary] = useState(0);

  // /** HANDLERS */
  async function handleSubmit(event: FormEvent) {
    event.preventDefault();

    const data = { name, last_name, role_id, birth_date, salary };
    console.log(data);

    //await api.post("users/v1", data);

    alert('Cadastro realizado com sucesso"');

    history.push("/");
  }

  return (
    <div id="page-create-orphanage">
      <Sidebar />
      <main>
        <form onSubmit={handleSubmit} className="create-orphanage-form">
          <fieldset>
            <legend>Aqui está a lista dos seus funcionários</legend>
          </fieldset>
        </form>
      </main>
    </div>
  );
}

// return `https://a.tile.openstreetmap.org/${z}/${x}/${y}.png`;
