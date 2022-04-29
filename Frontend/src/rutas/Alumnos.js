import React from 'react'

import { Switch, Route } from 'react-router-dom';

// ------------------------------------------------------------------------------ ALUMNOS
import AlumnosPublicacion from '../components/Alumnos/AlumnosPublicacion';
import AlumnosActividades from '../components/Alumnos/AlumnosActividades';
import AlumnosVerActividad from '../components/Alumnos/AlumnosVerActividad';
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
        path="/alumnos/actividades/:identificacion/:asig_act"
        exact
        strict
        component={AlumnosVerActividad}
      />
      <Route
        path="/alumnos/notas/:identificacion"
        exact
        strict
        component={AlumnosNotas}
      />
      <Route
        path="/alumnos/notificaciones/:identificacion"
        exact
        strict
        component={AlumnosNotificaciones}
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
    </Switch>
  );
};

export default Alumnos