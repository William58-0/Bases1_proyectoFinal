import React, { Component } from 'react';
import Home from './components/Home';

// ------------------------------------------------------------------------------ PROFESORES
import MaestrosPublicaciones from './components/Maestros/MaestrosPublicaciones';
import MaestrosActividades from './components/Maestros/MaestrosActividades';
import MaestrosNotas from './components/Maestros/MaestrosNotas';

// ------------------------------------------------------------------------------ ALUMNOS
import AlumnosPublicacion from './components/Alumnos/AlumnosPublicacion';
import AlumnosActividades from './components/Alumnos/AlumnosActividades';
import AlumnosEntregarActividad from './components/Alumnos/AlumnosEntregarActividad';
import AlumnosNotas from './components/Alumnos/AlumnosNotas';
import AlumnosExamenes from './components/Alumnos/AlumnosExamenes';
import AlumnosHacerExamen from './components/Alumnos/AlumnosHacerExamen';
import AlumnosNotificaciones from './components/Alumnos/AlumnosNotificaciones';

// ------------------------------------------------------------------------------ ADMINISTRADOR
import AdminUsuarios from './components/Administrador/AdminUsuarios';

import styled from 'styled-components';

import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';


const Container = styled.div`
  margin: 0 auto;
`;

class App extends Component {
  render() {
    return (
      <div >
        <BrowserRouter>
          <Container >
            <Switch>
              <Redirect
                from="/home"
                to="/create"
              />
              <Route
                path="/"
                exact
                component={Home}
              />

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

              <Route
                path="/admin"
                exact
                strict
                component={AdminUsuarios}
              />

              <Redirect to="/" />
            </Switch>
          </Container>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
