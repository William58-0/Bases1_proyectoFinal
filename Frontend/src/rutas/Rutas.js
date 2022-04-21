import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';

import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';

// ------------------------------------------------------------------------------ PROFESORES
import MaestrosPublicaciones from '../components/Maestros/MaestrosPublicaciones';
import MaestrosActividades from '../components/Maestros/MaestrosActividades';
import MaestrosNotas from '../components/Maestros/MaestrosNotas';

// ------------------------------------------------------------------------------ ALUMNOS
import AlumnosPublicacion from '../components/Alumnos/AlumnosPublicacion';
import AlumnosActividades from '../components/Alumnos/AlumnosActividades';
import AlumnosEntregarActividad from '../components/Alumnos/AlumnosEntregarActividad';
import AlumnosNotas from '../components/Alumnos/AlumnosNotas';
import AlumnosExamenes from '../components/Alumnos/AlumnosExamenes';
import AlumnosHacerExamen from '../components/Alumnos/AlumnosHacerExamen';
import AlumnosNotificaciones from '../components/Alumnos/AlumnosNotificaciones';

const Alumnos = () => {
  return (
    <Switch>
      <Route
        path="/alumnos/publicaciones/:identificacion"
        exact
        strict
        component={AlumnosPublicacion}
      />
      <Route
        path="/alumnos/actividades/:identificacion"
        exact
        strict
        component={AlumnosActividades}
      />
      <Route
        path="/alumnos/actividades/:identificacion/:actividad"
        exact
        strict
        component={AlumnosEntregarActividad}
      />
      <Route
        path="/alumnos/notas/:identificacion"
        exact
        strict
        component={AlumnosNotas}
      />
      <Route
        path="/alumnos/examenes/:identificacion"
        exact
        strict
        component={AlumnosExamenes}
      />
      <Route
        path="/alumnos/examenes/:identificacion/:examen"
        exact
        strict
        component={AlumnosHacerExamen}
      />
      <Route
        path="/alumnos/notificaciones/:identificacion"
        exact
        strict
        component={AlumnosNotificaciones}
      />
    </Switch>
  );
};

const Maestros = () => {
  return (
    <Switch>
      <Route
        path="/maestros/publicaciones/:identificacion"
        exact
        strict
        component={MaestrosPublicaciones}
      />
      <Route
        path="/maestros/actividades/:identificacion"
        exact
        strict
        component={MaestrosActividades}
      />
      <Route
        path="/maestros/notas/:identificacion"
        exact
        strict
        component={MaestrosNotas}
      />
    </Switch>
  );
};

export {
  Alumnos,
  Maestros,
} 