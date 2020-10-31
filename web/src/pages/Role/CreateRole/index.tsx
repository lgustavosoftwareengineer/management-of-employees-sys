import React, { ChangeEvent, FormEvent, useState } from "react";
import { useHistory } from "react-router-dom";

// import { FiPlus } from "react-icons/fi";

import "./styles.css";
import Sidebar from "../../../components/Sidebar";
import api from "../../../services/api";

export default function CreateRole() {
  const history = useHistory();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  // /** HANDLERS */
  async function handleSubmit(event: FormEvent) {
    event.preventDefault();

    const data = { name, description };
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
            <legend>Crie um cargo</legend>

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

          <button className="confirm-button" type="submit">
            Confirmar
          </button>
        </form>
      </main>
    </div>
  );
}

// return `https://a.tile.openstreetmap.org/${z}/${x}/${y}.png`;
