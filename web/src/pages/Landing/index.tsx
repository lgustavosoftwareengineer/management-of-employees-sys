import React, { FormEvent, useState } from "react";
import { FiArrowRight, FiUser } from "react-icons/fi";
import { useHistory } from "react-router-dom";

import "./styles.css";

function Landing() {
  const history = useHistory();

  const [companyName, setCompanyName] = useState<string>();
  const [name, setName] = useState<string>();

  async function handlerSetCompanyData(event: FormEvent) {
    event.preventDefault();

    if (!name && !companyName) {
      alert("Preencha todos os dados");
    } else {
      const data = { name, companyName };
      await localStorage.setItem("CompanyData", JSON.stringify(data));

      history.push("/employees");
    }
  }

  return (
    <div id="page-landing">
      <div className="content-wrapper">
        <main>
          <h1 style={{ color: "#fff" }}>
            <span>Seja bem-vindo(a) </span> ao Employee Management
          </h1>
          <div className="content-enter-app">
            <p style={{ color: "#fff" }}>
              Quer gerenciar os seus funcionários?
            </p>
            <div className="enter-app">
              <FiArrowRight size={26} color={"#fff"} />
            </div>
          </div>

          <form
            className="create-role-form"
            style={{ position: "fixed", top: -5, right: 100 }}
            onSubmit={handlerSetCompanyData}
          >
            <fieldset>
              <div className="title" id="title-employee">
                <FiUser
                  size={50}
                  color="#0aa8ad"
                  id="employee-icon-edit"
                  style={{ marginTop: -7, marginRight: 10 }}
                />
                <legend>Digite os dados</legend>
              </div>

              <div className="input-block" style={{ marginTop: -30 }}>
                <label htmlFor="name">Nome do administrador</label>
                <input
                  id="name"
                  placeholder="Qual o seu nome? (Primeiro nome, por favor)"
                  value={name}
                  maxLength={15}
                  onChange={(event) => setName(event.target.value)}
                />
              </div>
              <div className="input-block">
                <label htmlFor="name">Nome da Empresa</label>
                <input
                  id="company"
                  placeholder="Qual o nome da sua empresa? (Sigla, por favor)"
                  value={companyName}
                  maxLength={24}
                  onChange={(event) => setCompanyName(event.target.value)}
                />
              </div>
            </fieldset>

            {/* <button
              className="confirm-button"
              id="edit-employee"
              type="submit"
              onClick={() => history.push("/employees/")}
            >
              Confirmar
            </button> */}
            <button className="confirm-button" id="edit-employee" type="submit">
              Confirmar
            </button>
          </form>
        </main>
      </div>
      <div className="image-wrapper">{/* <img src={planning} /> */}</div>
    </div>
  );
}

export default Landing;
