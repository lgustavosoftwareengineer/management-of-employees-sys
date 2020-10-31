import React from "react";
import { FiArrowLeft } from "react-icons/fi";
import { useHistory } from "react-router-dom";

import mapMarkerImg from "../../images/logo.png";

import "./styles.css";

export default function Sidebar() {
  const { goBack } = useHistory();

  return (
    <aside className="app-sidebar">
      <img src={mapMarkerImg} alt="wallet" width="64" />

      <footer>
        <button type="button" onClick={goBack}>
          <FiArrowLeft size={24} color="#FFF" />
        </button>
      </footer>
    </aside>
  );
}
