import React from 'react'

import { Switch, Route } from 'react-router-dom';

// ------------------------------------------------------------------------------ MAESTROS
import MaestrosPublicacion from '../components/Maestros/MaestrosPublicacion';
import MaestrosEditarPublicacion from '../components/Maestros/MaestrosEditarPublicacion';
import MaestrosActividades from '../components/Maestros/MaestrosActividades';
import MaestrosEditarActividad from '../components/Maestros/MaestrosEditarActividad';
import MaestrosEntregas from '../components/Maestros/MaestrosEntregas';
import MaestrosCalificar from '../components/Maestros/MaestrosCalificar';
import MaestrosExamenes from '../components/Maestros/MaestrosExamenes';
import MaestrosCrearExamen from '../components/Maestros/MaestrosCrearExamen';

const Maestros = () => {
  return (
    <Switch>
      <Route
        path="/maestros/publicaciones/:identificacion"
        exact
        strict
        component={MaestrosPublicacion}
      />
      <Route
        path="/maestros/publicaciones/:identificacion/:publicacion"
        exact
        strict
        component={MaestrosEditarPublicacion}
      />
      <Route
        path="/maestros/actividades/:identificacion"
        exact
        strict
        component={MaestrosActividades}
      />
      <Route
        path="/maestros/actividades/:identificacion/:actividad"
        exact
        strict
        component={MaestrosEditarActividad}
      />
      <Route
        path="/maestros/entregas/:identificacion"
        exact
        strict
        component={MaestrosEntregas}
      />
      <Route
        path="/maestros/entregas/:identificacion/:entrega"
        exact
        strict
        component={MaestrosCalificar}
      />
      <Route
        path="/maestros/examenes/:identificacion"
        exact
        strict
        component={MaestrosExamenes}
      />
      <Route
        path="/maestros/examenes/crear/:identificacion"
        exact
        strict
        component={MaestrosCrearExamen}
      />
    </Switch>
  );
};

export default Maestros