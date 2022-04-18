import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { Button } from "react-bootstrap";
import Table from 'react-bootstrap/Table';
import Card from 'react-bootstrap/Card'


import NavBar from './AlumnosNavBar';
import Container from './FondoAlumnos';

let publicaciones = [
  {
    id: 1,
    tema: 'tarea 1',
    descripcion: 'blabla',
    fecha: 'hoy'
  },
  {
    id: 2,
    tema: 'tarea 1',
    descripcion: 'blabla',
    fecha: 'hoy'
  },
  {
    id: 3,
    tema: 'tarea 1',
    descripcion: 'blabla',
    fecha: 'hoy'
  },
  {
    id: 4,
    tema: 'tarea 1',
    descripcion: 'blabla',
    fecha: 'hoy'
  },
  {
    id: 5,
    tema: 'tarea 1',
    descripcion: 'blabla',
    fecha: 'hoy'
  },
  {
    id: 6,
    tema: 'tarea 1',
    descripcion: 'blabla',
    fecha: 'hoy'
  },
  {
    id: 7,
    tema: 'tarea 1',
    descripcion: 'blabla',
    fecha: 'hoy'
  },
  {
    id: 8,
    tema: 'tarea 1',
    descripcion: 'blabla',
    fecha: 'hoy'
  },
  {
    id: 9,
    tema: 'tarea 1',
    descripcion: 'blabla',
    fecha: 'hoy'
  },
  {
    id: 10,
    tema: 'tarea 1',
    descripcion: 'blabla',
    fecha: 'hoy'
  },
  {
    id: 11,
    tema: 'tarea 1',
    descripcion: 'blabla',
    fecha: 'hoy'
  },
]

function AlumnosActividades() {
  const [alumno, setAlumno] = useState(useParams().identificacion)
  const [indice, setIndice] = useState(0);
  const [publicacion, setPub] = useState(0);
  //
  const [asunto, setAsunto] = useState("");
  const [descripcion, setDesc] = useState("");
  const [fecha, setFecha] = useState("");
  const [autor, setAutor] = useState("");

  useEffect(() => {
    // obtener los datos del estudiante
    // obtener publicaciones para el estudiante
  }, [])

  const handleRowClick = (row) => {
    alert(row);
    // obtener los datos para la publicacion seleccionada
    setPub(row);
  }

  return (
    <>
      {publicacion === 0 ?
        <Container>
          <NavBar estudiante={alumno} />
          <br />
          <br />
          <div style={{ margin: '0 auto', width: '85%', color: 'white' }}>
            <div className="d-flex  justify-content-end align-items-center" style={{ marginLeft: '2%' }}>
              <h2>Actividades</h2>
              <div className="card-body d-flex justify-content-between align-items-center" style={{ marginLeft: '62.5%' }}>
                Grupo:
                <Button onClick={() => handleRowClick(0)}>{'<'}</Button>
                {(indice / 10) + 1}
                <Button onClick={() => handleRowClick(0)}>{'>'}</Button>
              </div>
            </div>
            <div class="bg-light" style={{ height: '455px', display: 'block', marginLeft: '2%', marginRight: '1.5%' }}>
              <Table striped bordered hover >
                <thead>
                  <tr>
                    <th>Asunto</th>
                    <th colSpan={12}>Fecha</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    publicaciones.slice(indice, indice + 10).map((log) =>
                      <>
                        <tr key={log.id} onClick={() => handleRowClick(log.id)}>

                          <td >
                            {log['tema']}
                          </td>

                          <td colSpan={12}>
                            {log['fecha']}
                          </td>
                        </tr>
                      </>
                    )}
                </tbody>
              </Table>
            </div>
          </div>
        </Container>
        :
        <Container>
          <NavBar estudiante={alumno} />
          <div className="d-flex justify-content-center align-items-center"
            style={{ margin: '0 auto', width: '50%', color: 'black', height: '90%' }}>
            <Card style={{ width: '100%', height: '80%' }}>
              <Card.Header as="h5" >
                <button style={{
                  textDecoration: 'none', fontSize: 'larger',
                  backgroundColor: 'transparent', border: 'none',
                  color: 'blue', width: '8%'
                }} onClick={() => setPub(0)}> {"<"} </button>
                Asunto de Publicacion
              </Card.Header>
              <Card.Body style={{ overflowY: 'auto' }}>
                <Card.Text>
                  blajfkdlasjfkdlajfdlajfdklajfdlaifdjfkdlafdklanfld
                </Card.Text>
              </Card.Body>
              <Card.Footer style={{ textAlign: 'right' }}>
                <small className="text-muted">Fecha</small><br />
                <small className="text-muted">Autor</small>
              </Card.Footer>
            </Card>
          </div>
        </Container>
      }
    </>
  );
}

export default AlumnosActividades;