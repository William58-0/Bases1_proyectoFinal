import React from 'react'

import { Switch, Route } from 'react-router-dom';

// ------------------------------------------------------------------------------ ADMINISTRADOR
import AdminUsuarios from '../components/Administrador/AdminUsuarios';
import CrearUsuario from '../components/Administrador/CrearUsuario';

const Administrador = () => {
  return (
    <Switch>
      <Route
        path="/admin"
        exact
        strict
        component={AdminUsuarios}
      />
      <Route
        path="/admin/crearusuario"
        exact
        strict
        component={CrearUsuario}
      />
    </Switch>
  );
};

export default Administrador