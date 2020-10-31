import React from "react";
import { FiArrowRight } from "react-icons/fi";
import { Link } from "react-router-dom";

import "../styles/pages/landing.css";

import logoImg from "../images/logo.png";
import planning from "../images/landing.jpg";

function Landing() {
  return (
    <div id="page-landing">
      <div className="content-wrapper">
        <img src={logoImg} alt="logo" width="100" id="logo" />

        <main>
          <h1>Seja bem vindo(a) ao Employee Management</h1>
          <div className="content-enter-app">
            <p>Quer gerenciar os seus funcionários?</p>
            <Link to="/employees" className="enter-app">
              <FiArrowRight size={26} color="rgba(0,0,0, 0.6 )" />
            </Link>
          </div>

          {/* <img src={planning} alt="logo" width="200" /> */}
        </main>

        {/* <div className="location">
          <strong>Pernambuco</strong>
          <span>Palmares</span>
        </div> */}
      </div>
      <div className="image-wrapper">
        <img src={planning} />
      </div>
    </div>
  );
}

export default Landing;
