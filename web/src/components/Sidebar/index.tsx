import React from "react";
import { FiArrowLeft, FiBriefcase, FiUsers } from "react-icons/fi";
import { useHistory } from "react-router-dom";

import "./styles.css";

interface SidebarProps {
  page?: string;
}

export default function Sidebar({ page = "role" }: SidebarProps) {
  const { goBack, push } = useHistory();
  if (page === "employee") {
    return (
      <aside className="app-sidebar">
        {/* <img src={mapMarkerImg} alt="wallet" width="64" /> */}
        <button type="button" onClick={() => push("/roles/")}>
          <FiBriefcase size={24} color="#FFF" />
        </button>
        <button
          type="button"
          onClick={() => push("/employees/")}
          style={{ backgroundColor: "#0aa8ad" }}
        >
          <FiUsers size={24} color="#FFF" />
        </button>
        <footer>
          <button type="button" onClick={goBack}>
            <FiArrowLeft size={24} color="#FFF" />
          </button>
        </footer>
      </aside>
    );
  } else {
    return (
      <aside className="app-sidebar">
        {/* <img src={mapMarkerImg} alt="wallet" width="64" /> */}
        <button
          type="button"
          onClick={() => push("/roles/")}
          style={{ backgroundColor: "#0aa8ad" }}
        >
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
}
