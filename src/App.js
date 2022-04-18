import React, { Component } from 'react';
import Home from './components/Home';

// ------------------------------------------------------------------------------ PROFESORES
import MaestrosPublicacion from './components/Maestros/MaestrosPublicacion';
import MaestrosActividades from './components/Maestros/MaestrosActividades';
import MaestrosNotas from './components/Maestros/MaestrosNotas';

// ------------------------------------------------------------------------------ ALUMNOS
import AlumnosPublicacion from './components/Alumnos/AlumnosPublicacion';
import AlumnosActividades from './components/Alumnos/AlumnosActividades';
import AlumnosNotas from './components/Alumnos/AlumnosNotas';

// ------------------------------------------------------------------------------ ADMINISTRADOR
import AdminHome from './components/Administrador/AdminHome';

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
                path="/alumnos/publicacion/:identificacion"
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
                path="/alumnos/notas/:identificacion"
                exact
                strict
                component={AlumnosNotas}
              />
              <Route
                path="/alumnos/examenes/:identificacion"
                exact
                strict
                component={AlumnosNotas}
              />

              <Route
                path="/maestros/publicacion/:identificacion"
                exact
                strict
                component={MaestrosPublicacion}
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
                path="/administrador"
                exact
                strict
                component={AdminHome}
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
