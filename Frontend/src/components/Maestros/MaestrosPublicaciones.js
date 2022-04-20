import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { Button } from "react-bootstrap";
import Table from 'react-bootstrap/Table';
import Card from 'react-bootstrap/Card';


import NavBar from './MaestrosNavBar';
import Container from './FondoMaestros';
import './maestro.css';

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

function MaestrosPublicacion() {
  const [maestro, setMaestro] = useState(useParams().identificacion)
  const [indice, setIndice] = useState(0);
  const [publicacion, setPub] = useState(0);
  //
  const [asunto, setAsunto] = useState("");
  const [descripcion, setDesc] = useState("");
  const [fecha, setFecha] = useState("");
  const [autor, setAutor] = useState("");

  useEffect(() => {
    // obtener los datos del maestro
    // obtener publicaciones para el maestro
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
          <NavBar maestro={maestro} />
          <br />
          <br />
          <div className='principal'>
            <div className="d-flex  justify-content-end align-items-center" style={{ marginLeft: '2%' }}>
              <h2>Publicaciones</h2>
              <div className="card-body d-flex justify-content-between align-items-center"
                style={{ marginLeft: '60%' }}>
                Grupo:
                <Button onClick={() => handleRowClick(0)}>{'<'}</Button>
                {(indice / 8) + 1}
                <Button onClick={() => handleRowClick(0)}>{'>'}</Button>
              </div>
            </div>
            <div class="bg-light container-tabla-publicacion" >
              <Table striped bordered hover >
                <thead>
                  <tr>
                    <th>Asunto</th>
                    <th colSpan={12}>Fecha</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    publicaciones.slice(indice, indice + 8).map((log) =>
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
            <div >
              <Button style={{marginTop:'2%', float:'right', marginRight:'2%'}}>Crear Publicación</Button>
            </div>
          </div>
        </Container>
        :
        <Container>
          <NavBar maestro={maestro} />
          <div class="d-flex justify-content-center align-items-center container-publicacion">
            <Card style={{ width: '100%', height: '80%' }}>
              <Card.Header as="h5" >
                <button className='boton-regreso-publicacion'
                  onClick={() => setPub(0)}> {"<"} </button>
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

export default MaestrosPublicacion;