import React from 'react'

import { Switch, Route } from 'react-router-dom';

// ------------------------------------------------------------------------------ ADMINISTRADOR
import AdminUsuarios from '../components/Administrador/AdminUsuarios';
import CrearUsuario from '../components/Administrador/CrearUsuario';

import EliminarUsuario from '../components/Administrador/EliminarUsuario/EliminarUsuario';
import EliminarMaestros from '../components/Administrador/EliminarUsuario/EliminarMaestros';
import EliminarAlumnos from '../components/Administrador/EliminarUsuario/EliminarAlumnos';

import CargaMasiva from '../components/Administrador/CargaMasiva';

import EditarUsuario from '../components/Administrador/EditarUsuario/EditarUsuario';
import EditarMaestros from '../components/Administrador/EditarUsuario/EditarMaestros';
import EditarAlumnos from '../components/Administrador/EditarUsuario/EditarAlumnos';

import AsignarCursos from '../components/Administrador/AsignarCursos/AsignarCursos';
import AsignarMaestros from '../components/Administrador/AsignarCursos/AsignarMaestros';
import AsignarAlumnos from '../components/Administrador/AsignarCursos/AsignarAlumnos';

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
        path="/admin/eliminarusuario/maestros"
        exact
        strict
        component={EliminarMaestros}
      />
      <Route
        path="/admin/eliminarusuario/alumnos"
        exact
        strict
        component={EliminarAlumnos}
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
      <Route
        path="/admin/editarusuario/maestros"
        exact
        strict
        component={EditarMaestros}
      />
      <Route
        path="/admin/editarusuario/alumnos"
        exact
        strict
        component={EditarAlumnos}
      />

      <Route
        path="/admin/asignarcursos"
        exact
        strict
        component={AsignarCursos}
      />
      <Route
        path="/admin/asignarcursos/maestros"
        exact
        strict
        component={AsignarMaestros}
      />
      <Route
        path="/admin/asignarcursos/alumnos"
        exact
        strict
        component={AsignarAlumnos}
      />
    </Switch>
  );
};

export default Administrador