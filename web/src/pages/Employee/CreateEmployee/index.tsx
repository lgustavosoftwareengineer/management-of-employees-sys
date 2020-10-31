import React, { ChangeEvent, FormEvent, useState } from "react";
import { useHistory } from "react-router-dom";

// import { FiPlus } from "react-icons/fi";

import "./styles.css";
import Sidebar from "../../../components/Sidebar";
import api from "../../../services/api";

export default function CreateEmployee() {
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
            <legend>Crie um funcionário</legend>

            {/* <Map
              center={[-8.6798175, -35.5844157]}
              style={{ width: "100%", height: 280 }}
              zoom={15}
              onClick={handleMapClick}
            >
              <TileLayer url="https://a.tile.openstreetmap.org/{z}/{x}/{y}.png" />

              {position.latitude !== 0 && (
                <Marker
                  interactive={false}
                  icon={mapIcon}
                  position={[position.latitude, position.longitude]}
                />
              )}

              
            </Map> */}

            <div className="input-block">
              <label htmlFor="name">Nome</label>
              <input
                id="name"
                value={name}
                onChange={(event) => setName(event.target.value)}
              />
            </div>

            <div className="input-block">
              <label htmlFor="last_name">Sobrenome</label>
              <input
                id="last_name"
                value={last_name}
                onChange={(event) => setLastName(event.target.value)}
              />
            </div>

            <div className="input-block">
              <label htmlFor="birth_date">Data de nascimento</label>
              <input
                id="birth_date"
                value={birth_date}
                onChange={(event) => setBirthDate(event.target.value)}
              />
            </div>
          </fieldset>

          <div className="input-block">
            <label htmlFor="role_id">Cargo</label>
            <textarea
              id="role_id"
              value={role_id}
              onChange={(event) => setRoleId(Number(event.target.value))}
            />
          </div>

          <div className="input-block">
            <label htmlFor="salary">Salário</label>
            <input
              id="salary"
              value={salary}
              onChange={(event) => setSalary(Number(event.target.value))}
            />
          </div>

          <button className="confirm-button" type="submit">
            Confirmar
          </button>
        </form>
      </main>
    </div>
  );
}

// return `https://a.tile.openstreetmap.org/${z}/${x}/${y}.png`;
