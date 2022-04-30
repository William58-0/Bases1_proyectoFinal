import React, { useState, useEffect } from 'react'
import { Link, Redirect, useParams } from 'react-router-dom';
import { Button } from "react-bootstrap";
import { Table, Card } from 'react-bootstrap';

import {
  getExamenesAlumno, getAlumno
} from '../../endpoints/endpoints';


import NavBar from './AlumnosNavBar';
import Container from './FondoAlumnos';
import './alumno.css';

let publicaciones = [
  {
    id: 1,
    curso: 'tarfdsaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaafdea 1aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
    fecha_publicacion: 'blabla',
    inicio: 'hoy',
    fin: 'maniana'
  },
  {
    id: 2,
    curso: 'tarea 1',
    fecha_publicacion: 'blabla',
    inicio: 'hoy',
    fin: 'maniana'
  },
  {
    id: 3,
    curso: 'tarea 1',
    fecha_publicacion: 'blabla',
    inicio: 'hoy',
    fin: 'maniana'
  },
  {
    id: 4,
    curso: 'tarea 1',
    fecha_publicacion: 'blabla',
    inicio: 'hoy',
    fin: 'maniana'
  },
  {
    id: 5,
    curso: 'tarea 1',
    fecha_publicacion: 'blabla',
    inicio: 'hoy',
    fin: 'maniana'
  },
  {
    id: 6,
    curso: 'tarea 1',
    fecha_publicacion: 'blabla',
    inicio: 'hoy',
    fin: 'maniana'
  },
  {
    id: 7,
    curso: 'tarea 1',
    fecha_publicacion: 'blabla',
    inicio: 'hoy',
    fin: 'maniana'
  },
  {
    id: 8,
    curso: 'tarea 1',
    fecha_publicacion: 'blabla',
    inicio: 'hoy',
    fin: 'maniana'
  },
  {
    id: 9,
    curso: 'tarea 1',
    fecha_publicacion: 'blabla',
    inicio: 'hoy',
    fin: 'maniana'
  },
  {
    id: 10,
    curso: 'tarea 1',
    fecha_publicacion: 'blabla',
    inicio: 'hoy',
    fin: 'maniana'
  },
  {
    id: 11,
    curso: 'tarea 1',
    fecha_publicacion: 'blabla',
    inicio: 'hoy',
    fin: 'maniana'
  },
]

function AlumnosPublicacion() {
  const [id_alumno, setIdAlumno] = useState(1);
  const [nombre_alumno, setNombreAlumno] = useState("");
  const [examenes, setExamns] = useState([]);

  const [indice, setIndice] = useState(0);
  const [examen, setExam] = useState(0);
  const [redirect, setRedirect] = useState(false);
  //
  const [asunto, setAsunto] = useState("");
  const [fecha_publicacion, setDesc] = useState("");
  const [fecha, setFecha] = useState("");
  const [autor, setAutor] = useState("");

  useEffect(() => {
    // obtener los datos del alumno
    getAlumno(id_alumno).then((response) => {
      if (response.data.length > 0) {
        setNombreAlumno(response.data[0].nombre + " " + response.data[0].apellido)
      }
    });
    // obtener examenes para el alumno
    getExamenesAlumno(id_alumno).then((response) => {
      setExamns(response.data);
    });
  }, [])

  const hacerExamen = (row) => {
    // obtener los datos para la publicacion seleccionada
    setExam(row.id_examen);
    if (row.puntuacion !== null) {
      alert("Ya se respondió este examen");
    } else {
      setRedirect(true);
    }

  }

  const renderRedirect = () => {
    if (redirect) {
      return <Redirect to={'/alumnos/examenes/' + id_alumno + '/' + examen} />
    }
  }

  const calcularNota = (puntuacion, total_examen) => {
    if (puntuacion === "" || puntuacion === null) {
      return "Pendiente"
    } else {
      return ((puntuacion / total_examen) * 100).toFixed(2) +' %'
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
            <h2>Examenes</h2>
            <div className="card-body d-flex justify-content-between align-items-center"
              style={{ marginLeft: '64.5%' }}>
              Grupo:
              <Button onClick={() => hacerExamen(0)}>{'<'}</Button>
              {(indice / 10) + 1}
              <Button onClick={() => hacerExamen(0)}>{'>'}</Button>
            </div>
          </div>
          <div class="bg-light container-tabla" >
            <Table striped bordered hover >
              <thead>
                <tr>
                  <th>Publicación</th>
                  <th>Curso</th>
                  <th>Hora Inicio</th>
                  <th>Hora Fin</th>
                  <th>Nota Obtenida</th>
                </tr>
              </thead>
              <tbody>
                {
                  examenes.slice(indice, indice + 10).map((log) =>
                    <>
                      <tr key={log.id} onClick={() => hacerExamen(log)}>

                        <td >
                          {log['fecha_publicacion']}
                        </td>

                        <td style={{ maxWidth: '150px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                          {log['nombre_curso']}
                        </td>

                        <td >
                          {log['fecha_inicio']}
                        </td>

                        <td >
                          {log['fecha_final']}
                        </td>

                        <td >
                          {calcularNota(log['puntuacion'], log['total_examen'])}
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