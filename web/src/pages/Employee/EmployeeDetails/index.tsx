import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";

// import { FiPlus } from "react-icons/fi";

import "./styles.css";
import Sidebar from "../../../components/Sidebar";
import api from "../../../services/api";

interface Employee {
  id: number;
  name: string;
  last_name: string;
  birth_date: string;
  salary: number;
  role: string;
}

interface Role {
  id: number;
  name: string;
  description: string;
}

interface EmployeeParams {
  id: string;
}

export default function EmployeeDetail() {
  const history = useHistory();
  const params = useParams<EmployeeParams>();

  const [employee, setEmployee] = useState<Employee>();
  const [role, setRole] = useState<Role>();
  const [loading, setLoading] = useState(false);

  // /** HANDLERS */
  useEffect(() => {
    api.get(`employees/v1/${params.id}`).then((response) => {
      setEmployee(response.data.data.params);
    });

    setLoading(true);
  }, [employee, role]);

  return (
    <div id="page-create-orphanage">
      <Sidebar />
      <main>
        <form className="create-orphanage-form">
          <fieldset>
            {employee ? (
              <div key={employee.id}>
                <legend>
                  {employee.name} {employee.last_name}
                </legend>

                <p> Cargo: {employee.role}</p>
                <p>Salário: R$ {employee.salary}</p>
                <button
                  onClick={() => {
                    history.push(`/employee-edit/${employee.id}`);
                  }}
                >
                  Editar funcionário
                </button>
              </div>
            ) : (
              <div></div>
            )}
          </fieldset>
        </form>
      </main>
    </div>
  );
}

// return `https://a.tile.openstreetmap.org/${z}/${x}/${y}.png`;
