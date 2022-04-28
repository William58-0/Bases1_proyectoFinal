import React from 'react'

import { Switch, Route } from 'react-router-dom';

// ------------------------------------------------------------------------------ ADMINISTRADOR
import AdminUsuarios from '../components/Administrador/AdminUsuarios';
import CrearUsuario from '../components/Administrador/CrearUsuario';
import EliminarUsuario from '../components/Administrador/EliminarUsuario';
import CargaMasiva from '../components/Administrador/CargaMasiva';
import EditarUsuario from '../components/Administrador/EditarUsuario';

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
      <Route
        path="/admin/eliminarusuario"
        exact
        strict
        component={EliminarUsuario}
      />
      <Route
        path="/admin/cargamasiva"
        exact
        strict
        component={CargaMasiva}
      />
      <Route
        path="/admin/editarusuario"
        exact
        strict
        component={EditarUsuario}
      />
    </Switch>
  );
};

export default Administrador