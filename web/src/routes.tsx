import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import Landing from "./pages/Landing";
import OrphanagesMap from "./pages/OrphanagesMap";
import Orphanage from "./pages/Orphanage";
import CreateOrphanage from "./pages/CreateOrphanage";

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

function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={CreateOrphanage} />
        <Route path="/app" component={OrphanagesMap} />

        <Route path="/employee/create" component={Landing} />
        <Route path="/employee/:id" component={Orphanage} />
        <Route path="/employee-edit/:id" component={Orphanage} />

        <Route path="/role/create" component={Landing} />
        <Route path="/role/:id" component={Orphanage} />
        <Route path="/role-edit/:id" component={Orphanage} />
      </Switch>
    </BrowserRouter>
  );
}

export default Routes;
