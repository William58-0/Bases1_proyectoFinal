import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
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
    descripcion: 'blablfdassssssssssssssssssssssssssblablfdasssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssasssssssssssssssssssssssssssssssssssssssssssssssssssssssa' +
      'blablfdasssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssa',
    fecha: 'hoy'
  },
  {
    id: 2,
    titulo: 'matematicas',
    descripcion: 'blabla',
    fecha: 'hoy'
  },
  {
    id: 3,
    titulo: 'matematicas',
    descripcion: 'blabla',
    fecha: 'hoy'
  },
  {
    id: 4,
    titulo: 'matematicas',
    descripcion: 'blabla',
    fecha: 'hoy'
  },
  {
    id: 5,
    titulo: 'matematicas',
    descripcion: 'blabla',
    fecha: 'hoy'
  },
  {
    id: 6,
    titulo: 'matematicas',
    descripcion: 'blabla',
    fecha: 'hoy'
  },
  {
    id: 7,
    titulo: 'matematicas',
    descripcion: 'blabla',
    fecha: 'hoy'
  },
  {
    id: 8,
    titulo: 'matematicas',
    descripcion: 'blabla',
    fecha: 'hoy'
  },
  {
    id: 9,
    titulo: 'matematicas',
    descripcion: 'blabla',
    fecha: 'hoy'
  },
  {
    id: 10,
    titulo: 'matematicas',
    descripcion: 'blabla',
    fecha: 'hoy'
  },
  {
    id: 11,
    titulo: 'matematicas',
    descripcion: 'blabla',
    fecha: 'hoy'
  },
]

function AlumnosNotificaciones() {
  const [alumno, setAlumno] = useState(useParams().identificacion)
  const [indice, setIndice] = useState(0);
  const [publicacion, setPub] = useState(0);
  //
  const [titulo, setCurso] = useState("");
  const [descripcion, setDesc] = useState("");
  const [fecha, setFecha] = useState("");
  const [autor, setAutor] = useState("");

  useEffect(() => {
    // obtener los datos del estudiante
    // obtener publicaciones para el estudiante
  }, [])

  const verPublicacion = (row) => {
    alert(row);
    setCurso(row.titulo);
    setDesc(row.descripcion);
    setFecha(row.fecha);
    // obtener los datos para la publicacion seleccionada
    setPub(row);
  }

  const salirDePublicacion = () => {
    setCurso("");
    setDesc("");
    setFecha("");
    // obtener los datos para la publicacion seleccionada
    setPub(0);
  }

  return (
    <>
      {publicacion === 0 ?
        <Container>
          <NavBar estudiante={alumno} />
          <br />
          <br />
          <div className='principal'>
            <div className="d-flex  justify-content-end align-items-center" style={{ marginLeft: '2%' }}>
              <h2>Notificaciones</h2>
              <div className="card-body d-flex justify-content-between align-items-center"
                style={{ marginLeft: '59%' }}>
                Grupo:
                <Button onClick={() => verPublicacion(0)}>{'<'}</Button>
                {(indice / 10) + 1}
                <Button onClick={() => verPublicacion(0)}>{'>'}</Button>
              </div>
            </div>
            <div class="bg-light container-tabla" >
              <Table striped bordered hover >
                <thead>
                  <tr>
                    <th >Fecha y Hora</th>
                    <th >Titulo</th>
                    <th >Contenido</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    publicaciones.slice(indice, indice + 10).map((log) =>
                      <tr key={log.id} onClick={() => verPublicacion(log)}>

                        <td >
                          {log['fecha']}
                        </td>

                        <td style={{ maxWidth: '150px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                          {log['titulo']}
                        </td>

                        <td style={{ maxWidth: '250px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                          {log['descripcion']}
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
          <NavBar estudiante={alumno} />
          <div class="d-flex justify-content-center align-items-center container-publicacion">
            <Card style={{ width: '100%', height: '80%' }}>
              <Card.Header as="h5" >
                <button className='boton-regreso-publicacion'
                  onClick={() => salirDePublicacion()}> {"<"} </button>
                <label className='label-publicacion'>Titulo: {titulo}</label>

              </Card.Header>
              <Card.Body style={{ overflowY: 'auto' }}>
                <Card.Text>
                  {descripcion}
                </Card.Text>
              </Card.Body>
              <Card.Footer style={{ textAlign: 'right' }}>
                <small className="text-muted">{fecha}</small><br />
              </Card.Footer>
            </Card>
          </div>
        </Container>
      }
    </>
  );
}

export default AlumnosNotificaciones;