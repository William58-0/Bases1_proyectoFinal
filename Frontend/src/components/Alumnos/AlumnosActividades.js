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
    titulo: 'blablfdasssssssssssssssssssblablfdablablfdasssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssasssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssassssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssa',
    descripcion: 'blablfdasssssssssssssssssssblablfdablablfdasssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssasssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssassssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssa',
    fecha_publicacion: 'hoy',
    estado: 'No Entregado'
  },
  {
    id: 2,
    titulo: 'tarea 1',
    descripcion: 'blabla',
    fecha_publicacion: 'hoy',
    estado: 'No Entregado'
  },
  {
    id: 3,
    titulo: 'tarea 1',
    descripcion: 'blabla',
    fecha_publicacion: 'hoy',
    estado: 'No Entregado'
  },
  {
    id: 4,
    titulo: 'tarea 1',
    descripcion: 'blabla',
    fecha_publicacion: 'hoy',
    estado: 'No Entregado'
  },
  {
    id: 5,
    titulo: 'tarea 1',
    descripcion: 'blabla',
    fecha_publicacion: 'hoy',
    estado: 'No Entregado'
  },
  {
    id: 6,
    titulo: 'tarea 1',
    descripcion: 'blabla',
    fecha_publicacion: 'hoy',
    estado: 'No Entregado'
  },
  {
    id: 7,
    titulo: 'tarea 1',
    descripcion: 'blabla',
    fecha_publicacion: 'hoy',
    estado: 'No Entregado'
  },
  {
    id: 8,
    titulo: 'tarea 1',
    descripcion: 'blabla',
    fecha_publicacion: 'hoy',
    estado: 'No Entregado'
  },
  {
    id: 9,
    titulo: 'tarea 1',
    descripcion: 'blabla',
    fecha_publicacion: 'hoy',
    estado: 'No Entregado'
  },
  {
    id: 10,
    titulo: 'tarea 1',
    descripcion: 'blabla',
    fecha_publicacion: 'hoy',
    estado: 'No Entregado'
  },
  {
    id: 11,
    titulo: 'tarea 1',
    descripcion: 'blabla',
    fecha_publicacion: 'hoy',
    estado: 'No Entregado'
  },
]

function AlumnosPublicacion() {
  const [alumno, setAlumno] = useState(useParams().identificacion)
  const [indice, setIndice] = useState(0);
  const [actividad, setActi] = useState(0);
  const [redirect, setRedirect] = useState(false);
  //
  const [asunto, setAsunto] = useState("");
  const [descripcion, setDesc] = useState("");
  const [fecha_publicacion, setFecha] = useState("");
  const [autor, setAutor] = useState("");

  useEffect(() => {
    // obtener los datos del estudiante
    // obtener publicaciones para el estudiante
  }, [])

  const handleRowClick = (row) => {
    alert(row);
    // obtener los datos para la publicacion seleccionada
    setActi(row);
    setRedirect(true);

  }

  const renderRedirect = () => {
    if (redirect) {
      return <Redirect to={'/alumnos/actividades/' + alumno + '/' + actividad} />
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
            <h2>Actividades</h2>
            <div className="card-body d-flex justify-content-between align-items-center"
              style={{ marginLeft: '62.5%' }}>
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
                  <th>Publicacion</th>
                  <th>Título</th>
                  <th>Descripcion</th>
                  <th>Estado</th>
                </tr>
              </thead>
              <tbody>
                {
                  publicaciones.slice(indice, indice + 10).map((log) =>
                    <>
                      <tr key={log.id} onClick={() => handleRowClick(log.id)}>

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
                          {log['estado']}
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