import React, { useState } from "react";
import { FiArrowRight } from "react-icons/fi";
import { Link } from "react-router-dom";

import "../styles/pages/landing.css";

import logoImg from "../images/logo.png";
import planning from "../images/landing.jpg";

function Landing() {
  const [colorLink, setColorLink] = useState<string>();

  return (
    <div id="page-landing">
      <div className="content-wrapper">
        {/* <img src={logoImg} alt="logo" width="100" id="logo" /> */}

        <main>
          <h1>
            <span>Seja bem-vindo(a) </span> ao Employee Management
          </h1>
          <div
            className="content-enter-app"
            onMouseEnter={() => {
              setColorLink("#0aa8ad");
              console.log(colorLink);
            }}
          >
            <p>Quer gerenciar os seus funcionários?</p>
            <Link to="/employees" className="enter-app" color={`${colorLink}`}>
              <FiArrowRight size={26} color={"rgba(0,0,0, 0.6 )"} />
            </Link>
          </div>
        </main>
      </div>
      <div className="image-wrapper">
        <img src={planning} />
      </div>
    </div>
  );
}

export default Landing;
