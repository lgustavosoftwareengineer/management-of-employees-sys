import React, { useState } from "react";
import { FiArrowRight } from "react-icons/fi";
import { Link } from "react-router-dom";

import "./styles.css";

import planning from "../../images/landing.jpg";

function Landing() {
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
        </main>
      </div>
      <div className="image-wrapper">
        <img src={planning} />
      </div>
    </div>
  );
}

export default Landing;
