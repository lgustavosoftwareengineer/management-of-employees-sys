import React from "react";
import { FiArrowLeft, FiBriefcase, FiUsers } from "react-icons/fi";
import { useHistory } from "react-router-dom";

import mapMarkerImg from "../../images/logo.png";

import "./styles.css";

export default function Sidebar() {
  const { goBack, push } = useHistory();

  return (
    <aside className="app-sidebar">
      {/* <img src={mapMarkerImg} alt="wallet" width="64" /> */}
      <button type="button" onClick={() => push("/roles/")}>
        <FiBriefcase size={24} color="#FFF" />
      </button>
      <button type="button" onClick={() => push("/employees/")}>
        <FiUsers size={24} color="#FFF" />
      </button>
      <footer>
        <button type="button" onClick={goBack}>
          <FiArrowLeft size={24} color="#FFF" />
        </button>
      </footer>
    </aside>
  );
}
