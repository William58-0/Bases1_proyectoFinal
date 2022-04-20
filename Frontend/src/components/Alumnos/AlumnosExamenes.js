import React, { useState, useEffect } from 'react'
import { Link, Redirect, useParams } from 'react-router-dom';
import { Button } from "react-bootstrap";
import Table from 'react-bootstrap/Table';
import Card from 'react-bootstrap/Card';


import NavBar from './AlumnosNavBar';
import Container from './FondoAlumnos';
import './alumno.css';

let publicaciones = [
  {
    id: 1,
    curso: 'tarfdsaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaafdea 1aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
    fecha_publicacion: 'blabla',
    inicio: 'hoy',
    fin:'maniana'
  },
  {
    id: 2,
    curso: 'tarea 1',
    fecha_publicacion: 'blabla',
    inicio: 'hoy',
    fin:'maniana'
  },
  {
    id: 3,
    curso: 'tarea 1',
    fecha_publicacion: 'blabla',
    inicio: 'hoy',
    fin:'maniana'
  },
  {
    id: 4,
    curso: 'tarea 1',
    fecha_publicacion: 'blabla',
    inicio: 'hoy',
    fin:'maniana'
  },
  {
    id: 5,
    curso: 'tarea 1',
    fecha_publicacion: 'blabla',
    inicio: 'hoy',
    fin:'maniana'
  },
  {
    id: 6,
    curso: 'tarea 1',
    fecha_publicacion: 'blabla',
    inicio: 'hoy',
    fin:'maniana'
  },
  {
    id: 7,
    curso: 'tarea 1',
    fecha_publicacion: 'blabla',
    inicio: 'hoy',
    fin:'maniana'
  },
  {
    id: 8,
    curso: 'tarea 1',
    fecha_publicacion: 'blabla',
    inicio: 'hoy',
    fin:'maniana'
  },
  {
    id: 9,
    curso: 'tarea 1',
    fecha_publicacion: 'blabla',
    inicio: 'hoy',
    fin:'maniana'
  },
  {
    id: 10,
    curso: 'tarea 1',
    fecha_publicacion: 'blabla',
    inicio: 'hoy',
    fin:'maniana'
  },
  {
    id: 11,
    curso: 'tarea 1',
    fecha_publicacion: 'blabla',
    inicio: 'hoy',
    fin:'maniana'
  },
]

function AlumnosPublicacion() {
  const [alumno, setAlumno] = useState(useParams().identificacion)
  const [indice, setIndice] = useState(0);
  const [examen, setExam] = useState(0);
  const [redirect, setRedirect] = useState(false);
  //
  const [asunto, setAsunto] = useState("");
  const [fecha_publicacion, setDesc] = useState("");
  const [fecha, setFecha] = useState("");
  const [autor, setAutor] = useState("");

  useEffect(() => {
    // obtener los datos del estudiante
    // obtener publicaciones para el estudiante
  }, [])

  const handleRowClick = (row) => {
    alert(row);
    // obtener los datos para la publicacion seleccionada
    setExam(row);
    setRedirect(true);

  }

  const renderRedirect = () => {
    if (redirect) {
      return <Redirect to={'/alumnos/examenes/' + alumno + '/' + examen} />
    }
  }

  return (
    <>

      <Container>
        <NavBar estudiante={alumno} />
        <br />
        <br />
        <div className='principal'>
          <div className="d-flex  justify-content-end align-items-center" style={{ marginLeft: '2%' }}>
            <h2>Examenes</h2>
            <div className="card-body d-flex justify-content-between align-items-center"
              style={{ marginLeft: '64.5%' }}>
              Grupo:
              <Button onClick={() => handleRowClick(0)}>{'<'}</Button>
              {(indice / 10) + 1}
              <Button onClick={() => handleRowClick(0)}>{'>'}</Button>
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
                </tr>
              </thead>
              <tbody>
                {
                  publicaciones.slice(indice, indice + 10).map((log) =>
                    <>
                      <tr key={log.id} onClick={() => handleRowClick(log.id)}>

                        <td >
                          {log['fecha_publicacion']}
                        </td>

                        <td style={{ maxWidth: '150px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                          {log['curso']}
                        </td>

                        <td >
                          {log['inicio']}
                        </td>

                        <td >
                          {log['fin']}
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