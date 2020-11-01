import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import Landing from "./pages/Landing";
/* GET PAGES */
import ListAllEmployees from "./pages/Employee/ListAllEmployees";
import ListAllRoles from "./pages/Role/ListAllRoles";
import EmployeeDetails from "./pages/Employee/EmployeeDetails";

/* POST PAGES */
import CreateEmployee from "./pages/Employee/CreateEmployee";
import CreateRole from "./pages/Role/CreateRole";

/* DELETE PAGES */
import EditEmployee from "./pages/Employee/EditEmployee";
import EditRole from "./pages/Role/EditRole/";
import RoleDetails from "./pages/Role/RoleDetails";

/**
 * Terá 6 páginas:
 * // Empregado
 * 1 - Criar um empregado (name, last_name, job_post (relação a tabela Role), birth_date, salary)
 * 2 - Ver um empregado
 * 3 - Editar um empregado (name, last_name, job_post, birth_date, salary)
 *
 * // Cargo
 * 1 - Criar um cargo (name, description)
 * 2 - Ver um cargo
 * 3 - Editar a descrição de um cargo (descrição)
 */

/**
 * Páginas que tem que ser criadas:
 * Página com toda a lista dos empregados
 * Página com toda a lista de cargos
 *
 * Página de criação de um empregado
 * Página de criação de um cargo
 *
 * Página de edição de um empregado
 * Página de edição de um cargo
 *
 * Página de visualização de um empregado
 * Página de edição de um empregado
 *
 * Função de excluir um empregado
 * Função de excluir um cargo
 *
 *
 */

function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Landing} />

        <Route path="/employee/create" component={CreateEmployee} />
        <Route path="/employee/:id" component={EmployeeDetails} />
        <Route path="/employee-edit/:id" component={EditEmployee} />
        <Route path="/employees" component={ListAllEmployees} />

        <Route path="/role/create" component={CreateRole} />
        <Route path="/role/:id" component={RoleDetails} />
        <Route path="/role-edit/:id" exact component={EditRole} />
        <Route path="/roles" component={ListAllRoles} />
      </Switch>
    </BrowserRouter>
  );
}

export default Routes;
