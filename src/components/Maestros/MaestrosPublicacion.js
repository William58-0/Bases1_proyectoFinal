import React, { useState, useEffect } from 'react'
import { Link, Redirect } from 'react-router-dom';
import { Button } from "react-bootstrap";
import Table from 'react-bootstrap/Table';


import NavBar from './MaestrosNavBar';

let publicaciones = [
  {
    tema: 'tarea 1',
    descripcion: 'blabla',
    fecha: 'hoy'
  },
  {
    tema: 'tarea 1',
    descripcion: 'blabla',
    fecha: 'hoy'
  },
  {
    tema: 'tarea 1',
    descripcion: 'blabla',
    fecha: 'hoy'
  },
  {
    tema: 'tarea 1',
    descripcion: 'blabla',
    fecha: 'hoy'
  },
  {
    tema: 'tarea 1',
    descripcion: 'blabla',
    fecha: 'hoy'
  },
  {
    tema: 'tarea 1',
    descripcion: 'blabla',
    fecha: 'hoy'
  },
  {
    tema: 'tarea 1',
    descripcion: 'blabla',
    fecha: 'hoy'
  },
  {
    tema: 'tarea 1',
    descripcion: 'blabla',
    fecha: 'hoy'
  },
]

function AplicanteLogin() {
  const [dpi, setDPI] = useState("")
  const [departamento, setDep] = useState("")
  const [puesto, setPuesto] = useState("")
  const [password, setPassword] = useState("");
  const [primer, setPrimer] = useState(1);
  const [redirect, setRedirect] = useState(false);
  const [indiceR, setIndiceR] = useState(0);

  const renderRedirect = () => {
    if (redirect) {
      if (primer == 1) {
        return <Redirect to={'/aplicante/verificacion/' + dpi + "/" + departamento + "/" + puesto} />
      } else {
        return <Redirect to={'/aplicante/revision/' + dpi + "/" + departamento + "/" + puesto} />
      }
    }
  }

  const IniciarSesion = () => {
    console.log("iniciando sesion");
  }

  return (

    <div style={{ backgroundColor: 'rgba(130, 173, 202, 0.842)' }}>
      <NavBar maestro="Profesor" />
      <br />
      <h1 style={{ color: 'rgb(45, 88, 138)', textAlign: 'center' }}>Publicaciones</h1>
      <br />
      <br />
      <div style={{ height: '479px', display: 'block' }}>


        <Table responsive variant="light" style={{ margin: '0 auto', width: '90%' }}>
          <thead>
            <tr>
              <th>Asunto</th>
              <th>Fecha</th>
            </tr>
          </thead>
          <tbody>
            {
              publicaciones.slice(indiceR, indiceR + 10).map((log) =>
                <>
                  <tr key={log.id}>
                    <td>
                      <Link to="/administrador">
                        {log['tema']}
                      </Link>

                    </td>
                    <td>
                      {log['fecha']}
                    </td>
                  </tr>
                </>
              )}
          </tbody>
        </Table>
      </div>
    </div>
  );
}

export default AplicanteLogin;