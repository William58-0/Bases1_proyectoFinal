import React, { useState, useEffect } from 'react'
import { Button, Table, Card } from "react-bootstrap";
import { useParams } from 'react-router-dom';

import NavBar from './AlumnosNavBar';
import Container from './FondoAlumnos';
import './alumno.css';

import {
  getAlumno, getNotificaciones
} from '../../endpoints/endpoints';


function AlumnosNotificacion() {
  const [id_alumno, setIdAlumno] = useState(useParams().identificacion);
  const [nombre_alumno, setNombreAlumno] = useState("");
  const [indice, setIndice] = useState(0);
  const [notificaciones, setPubs] = useState([]);
  const [notificacion, setPub] = useState(0);
  //
  const [curso, setCurso] = useState("");
  const [contenido, setContenido] = useState("");
  const [fecha_hora, setFechaHora] = useState("");
  const [autor, setAutor] = useState("");

  useEffect(() => {
    // obtener los datos del alumno
    getAlumno(id_alumno).then((response) => {
      if (response.data.length > 0) {
          setNombreAlumno(response.data[0].nombre + " " + response.data[0].apellido)
      }
    });
    // obtener notificaciones para el alumno
    getNotificaciones(id_alumno).then((response) => {
      setPubs(response.data);
    });
  }, [])

  const verNotificacion = (row) => {
    setCurso(row.nombre_curso);
    setContenido(row.contenido);
    setFechaHora(row.fecha_hora);
    setPub(row);
  }

  const salirDeNotificacion = () => {
    setCurso("");
    setContenido("");
    setFechaHora("");
    setPub(0);
  }

  const siguienteGrupo = () => {
    var index = indice;
    var nots = notificaciones;
    if (index + 10 <= nots.length) {
      setIndice(index + 10);
    }
  }

  const anteriorGrupo = () => {
    var index = indice;
    if (index - 10 >= 0) {
      setIndice(index - 10);
    }
  }

  return (
    <>
      {notificacion === 0 ?
        <Container>
          <NavBar alumno={nombre_alumno} id_alumno={id_alumno} />
          <br />
          <br />
          <div className='principal'>
            <div className="d-flex  justify-content-end align-items-center" style={{ marginLeft: '2%' }}>
              <h2>Notificaciones</h2>
              <div className="card-body d-flex justify-content-between align-items-center"
                style={{ marginLeft: '60%' }}>
                Grupo:
                <Button onClick={() => anteriorGrupo()}>{'<'}</Button>
                {(indice / 10) + 1}
                <Button onClick={() => siguienteGrupo()}>{'>'}</Button>
              </div>
            </div>
            <div class="bg-light container-tabla" >
              <Table striped bordered hover >
                <thead>
                  <tr>
                    <th >Notificación</th>
                    <th >Curso</th>
                    <th >Contenido</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    notificaciones.slice(indice, indice + 10).map((log) =>
                      <tr key={log.id} onClick={() => verNotificacion(log)}>

                        <td >
                          {log['fecha_hora']}
                        </td>

                        <td style={{ maxWidth: '150px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                          {log['nombre_curso']}
                        </td>

                        <td style={{ maxWidth: '250px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                          {log['contenido']}
                        </td>
                      </tr>
                    )}
                </tbody>
              </Table>
            </div>
          </div>
        </Container>
        :
        <Container>
          <NavBar alumno={nombre_alumno} id_alumno={id_alumno} />
          <div class="d-flex justify-content-center align-items-center container-publicacion">
            <Card style={{ width: '100%', height: '80%' }}>
              <Card.Header as="h5" >
                <button className='boton-regreso-publicacion'
                  onClick={() => salirDeNotificacion()}> {"<"} </button>
                <label className='label-publicacion'>Curso: {curso}</label>

              </Card.Header>
              <Card.Body style={{ overflowY: 'auto' }}>
                <Card.Text>
                  {contenido}
                </Card.Text>
              </Card.Body>
              <Card.Footer style={{ textAlign: 'right' }}>
                <small className="text-muted">Notificación: {fecha_hora}</small><br />
              </Card.Footer>
            </Card>
          </div>
        </Container>
      }
    </>
  );
}

export default AlumnosNotificacion;