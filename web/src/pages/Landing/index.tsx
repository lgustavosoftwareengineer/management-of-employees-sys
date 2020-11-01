import React, { FormEvent, useEffect, useState } from "react";
import { FiArrowRight, FiUser } from "react-icons/fi";
import { Link, useHistory } from "react-router-dom";

import "./styles.css";

import planning from "../../images/landing.jpg";

function Landing() {
  const history = useHistory();

  const [companyName, setCompanyName] = useState<string>();
  const [name, setName] = useState<string>();

  async function handlerSetCompanyData(event: FormEvent) {
    event.preventDefault();

    console.log(name, companyName);

    if (!name && !companyName) {
      alert("Preencha todos os dados");
    } else {
      const data = { name, companyName };
      await localStorage.setItem("CompanyData", JSON.stringify(data));

      console.log(localStorage.getItem("CompanyData"));
      history.push("/employees");
    }
  }

  useEffect(() => {
    console.log(name, companyName);
  }, [name, companyName]);

  return (
    <div id="page-landing">
      <div className="content-wrapper">
        <main>
          <h1>
            <span>Seja bem-vindo(a) </span> ao Employee Management
          </h1>
          <div className="content-enter-app">
            <p>Quer gerenciar os seus funcionários?</p>
            <Link to="/employees" className="enter-app">
              <FiArrowRight size={26} color={"rgba(0,0,0, 0.6 )"} />
            </Link>
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
                <legend>Digite os dados da sua empresa</legend>
              </div>

              <div className="input-block" style={{ marginTop: -30 }}>
                <label htmlFor="name">Nome</label>
                <input
                  id="name"
                  placeholder="Qual o seu nome?"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                />
              </div>
              <div className="input-block">
                <label htmlFor="name">Empresa</label>
                <input
                  id="name"
                  placeholder="Qual o nome da sua empresa?"
                  value={companyName}
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
