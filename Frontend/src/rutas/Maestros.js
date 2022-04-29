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

import AdminAlumnos from '../components/Maestros/AdminAlumnos/AdminAlumnos';
import CargaMasiva from '../components/Maestros/AdminAlumnos/CargaMasiva';
import CrearAlumno from '../components/Maestros/AdminAlumnos/CrearAlumno';
import EditarAlumno from '../components/Maestros/AdminAlumnos/EditarAlumno';
import EliminarAlumno from '../components/Maestros/AdminAlumnos/EliminarAlumno';
import AlumnosNotas from '../components/Maestros/AdminAlumnos/AlumnosNotas';

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

      <Route
        path="/maestros/adminalumnos/:identificacion"
        exact
        strict
        component={AdminAlumnos}
      />
      <Route
        path="/maestros/adminalumnos/cargamasiva/:identificacion"
        exact
        strict
        component={CargaMasiva}
      />
      <Route
        path="/maestros/adminalumnos/crearalumno/:identificacion"
        exact
        strict
        component={CrearAlumno}
      />
      <Route
        path="/maestros/adminalumnos/editaralumno/:identificacion"
        exact
        strict
        component={EditarAlumno}
      />
      <Route
        path="/maestros/adminalumnos/eliminaralumno/:identificacion"
        exact
        strict
        component={EliminarAlumno}
      />
      <Route
        path="/maestros/adminalumnos/notas/:identificacion"
        exact
        strict
        component={AlumnosNotas}
      />
    </Switch>
  );
};

export default Maestros