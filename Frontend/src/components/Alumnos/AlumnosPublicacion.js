import React, { useState, useEffect } from 'react'
import { Button, Table, Card } from "react-bootstrap";


import NavBar from './AlumnosNavBar';
import Container from './FondoAlumnos';
import './alumno.css';

import {
  getAlumno, getPublicacionesAlumno
} from '../../endpoints/endpoints';

function AlumnosPublicacion() {
  const [id_alumno, setIdAlumno] = useState(1)
  const [nombre_alumno, setNombreAlumno] = useState("")
  const [indice, setIndice] = useState(0);
  const [publicaciones, setPubs] = useState([]);
  const [publicacion, setPub] = useState(0);
  //
  const [curso, setCurso] = useState("");
  const [descripcion, setDesc] = useState("");
  const [fecha, setFecha] = useState("");
  const [autor, setAutor] = useState("");

  useEffect(() => {
    // obtener los datos del alumno
    getAlumno(id_alumno).then((response) => {
      if (response.data.length > 0) {
          setNombreAlumno(response.data[0].nombre + " " + response.data[0].apellido)
      }
    });
    // obtener publicaciones para el alumno
    getPublicacionesAlumno(id_alumno).then((response) => {
      setPubs(response.data);
    });
  }, [])

  const verPublicacion = (row) => {
    setCurso(row.nombre_curso);
    setDesc(row.descripcion);
    setFecha(row.fecha);
    setPub(row);
  }

  const salirDePublicacion = () => {
    setCurso("");
    setDesc("");
    setFecha("");
    setPub(0);
  }

  return (
    <>
      {publicacion === 0 ?
        <Container>
          <NavBar alumno={nombre_alumno} id_alumno={id_alumno} />
          <br />
          <br />
          <div className='principal'>
            <div className="d-flex  justify-content-end align-items-center" style={{ marginLeft: '2%' }}>
              <h2>Publicaciones</h2>
              <div className="card-body d-flex justify-content-between align-items-center"
                style={{ marginLeft: '60%' }}>
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
                    <th >Publicación</th>
                    <th >Curso</th>
                    <th >Descripcion</th>
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
                          {log['nombre_curso']}
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
          <NavBar alumno={nombre_alumno} id_alumno={id_alumno} />
          <div class="d-flex justify-content-center align-items-center container-publicacion">
            <Card style={{ width: '100%', height: '80%' }}>
              <Card.Header as="h5" >
                <button className='boton-regreso-publicacion'
                  onClick={() => salirDePublicacion()}> {"<"} </button>
                <label className='label-publicacion'>Curso: {curso}</label>

              </Card.Header>
              <Card.Body style={{ overflowY: 'auto' }}>
                <Card.Text>
                  {descripcion}
                </Card.Text>
              </Card.Body>
              <Card.Footer style={{ textAlign: 'right' }}>
                <small className="text-muted">Publicación: {fecha}</small><br />
              </Card.Footer>
            </Card>
          </div>
        </Container>
      }
    </>
  );
}

export default AlumnosPublicacion;