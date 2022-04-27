import React, { Component } from 'react';
import Home from './components/Home';

import Maestros from './rutas/Maestros';
import Alumnos from './rutas/Alumnos';
import Administrador from './rutas/Administrador';

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
              <Route path="/" exact component={Home} />
              <Route path='/home' component={Home} />
              <Route path='/maestros' component={Maestros} />
              <Route path='/alumnos' component={Alumnos} />
              <Route path='/admin' component={Administrador} />

              <Redirect to="/" />
            </Switch>
          </Container>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
