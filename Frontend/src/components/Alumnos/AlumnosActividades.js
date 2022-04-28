import React, { useState, useEffect } from 'react'
import { Link, Redirect, useParams } from 'react-router-dom';
import { Button } from "react-bootstrap";
import { Table, Card } from 'react-bootstrap';

import {
  getAlumno, getActividadesAlumno
} from '../../endpoints/endpoints';

import NavBar from './AlumnosNavBar';
import Container from './FondoAlumnos';
import './alumno.css';

function AlumnosPublicacion() {
  const [id_alumno, setIdAlumno] = useState(1);
  const [nombre_alumno, setNombreAlumno] = useState("")
  const [indice, setIndice] = useState(0);
  const [asig_act, setAsigAct] = useState(useParams().asig_act)
  const [actividades, setActs] = useState([]);
  const [redirect, setRedirect] = useState(false);
  //
  const [asunto, setAsunto] = useState("");
  const [descripcion, setDesc] = useState("");
  const [fecha_publicacion, setFecha] = useState("");
  const [autor, setAutor] = useState("");

  useEffect(() => {
    // obtener los datos del alumno
    getAlumno(id_alumno).then((response) => {
      if (response.data.length > 0) {
        setNombreAlumno(response.data[0].nombre + " " + response.data[0].apellido)
      }
    });
    // obtener actividades para el alumno
    getActividadesAlumno(id_alumno).then((response) => {
      setActs(response.data);
    });
  }, [])

  const VerActividad = (row) => {
    alert(row);
    // obtener los datos para la publicacion seleccionada
    setAsigAct(row.id_asignacion_actividad);
    setRedirect(true);

  }

  const renderRedirect = () => {
    if (redirect) {
      return <Redirect to={'/alumnos/actividades/' + id_alumno + '/' + asig_act} />
    }
  }

  return (
    <>

      <Container>
        <NavBar alumno={nombre_alumno} id_alumno={id_alumno} />
        <br />
        <br />
        <div className='principal'>
          <div className="d-flex  justify-content-end align-items-center" style={{ marginLeft: '2%' }}>
            <h2>Actividades</h2>
            <div className="card-body d-flex justify-content-between align-items-center"
              style={{ marginLeft: '62.5%' }}>
              Grupo:
              <Button onClick={() => VerActividad(0)}>{'<'}</Button>
              {(indice / 10) + 1}
              <Button onClick={() => VerActividad(0)}>{'>'}</Button>
            </div>
          </div>
          <div class="bg-light container-tabla" >
            <Table striped bordered hover >
              <thead>
                <tr>
                  <th>Publicacion</th>
                  <th>Título</th>
                  <th>Descripcion</th>
                  <th>Estado</th>
                </tr>
              </thead>
              <tbody>
                {
                  actividades.slice(indice, indice + 10).map((log) =>
                    <>
                      <tr key={log.id} onClick={() => VerActividad(log)}>

                        <td style={{ maxWidth: '100px' }}>
                          {log['fecha_publicacion']}
                        </td>

                        <td style={{ maxWidth: '150px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                          {log['titulo']}
                        </td>

                        <td style={{ maxWidth: '250px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                          {log['descripcion']}
                        </td>

                        <td >
                          {log['estado_actividad']}
                        </td>
                      </tr>
                    </>
                  )}
              </tbody>
              {renderRedirect()}
            </Table>
          </div>
        </div>
      </Container>


    </>
  );
}

export default AlumnosPublicacion;