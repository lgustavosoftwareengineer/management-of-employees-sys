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

export default function EditRole() {
  const history = useHistory();

  const params = useParams<RoleParams>();
  const [role, setRole] = useState<Role>();
  const [name, setName] = useState(role?.name);
  const [description, setDescription] = useState(role?.description);

  // function async handlerGettingRole(){

  // }
  useEffect(() => {
    console.log(params.id);
    api.get(`roles/v1/${params.id}`).then((response) => {
      setRole(response.data.data.role);
    });
  }, [params.id]);

  if (!role) {
    return <p>Carregando ...</p>;
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();

    const data = { name, description };
    console.log(data);
    setName(role?.name);
    setDescription(role?.description);
    await api.put(`roles/v1/${params.id}`, data);

    alert("Dados editados com sucesso");

    history.push("/roles");
  }

  return (
    <div id="page-create-orphanage">
      <Sidebar />
      <main>
        <form className="create-orphanage-form" onSubmit={handleSubmit}>
          <fieldset>
            <legend>Edite um cargo</legend>

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

          <button className="confirm-button" type="submit">
            Confirmar
          </button>
        </form>
      </main>
    </div>
  );
}
