import React, { useState, useEffect } from 'react'
import { Link, Redirect, useParams } from 'react-router-dom';
import { Button } from "react-bootstrap";
import Table from 'react-bootstrap/Table';
import Card from 'react-bootstrap/Card';


import NavBar from './MaestrosNavBar';
import Container from './FondoMaestros';
import './maestro.css';

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

function MaestrosActividades() {
  const [maestro, setMaestro] = useState(useParams().identificacion)
  const [indice, setIndice] = useState(0);
  const [actividad, setActi] = useState(0);
  const [destino, setDestino] = useState(0);
  const [redirect, setRedirect] = useState(false);
  //
  const [crear, setCrear] = useState(false);
  const [titulo, setTitulo] = useState("");
  const [descripcion, setDesc] = useState("");
  const [valor, setValor] = useState(0);
  const [fecha_entrega, setFecha] = useState("");

  useEffect(() => {
    // obtener los datos del maestro
    // obtener publicaciones para el maestro
  }, [])

  const editarActividad = (row) => {
    alert(row);
    // obtener los datos para la publicacion seleccionada
    setActi(row);
    setRedirect(true);

  }

  const renderRedirect = () => {
    if (redirect) {
      return <Redirect to={'/maestros/actividades/' + maestro + '/' + actividad} />
    }
  }

  const CrearActividad = () => {
    // insertar la nueva actividad
    setCrear(false)

  }

  const handleChange = (e) => {
    alert(e.target.value);
    //setTipo(e.target.value);
    //setTipo(e.target.value);
  }

  return (
    <>
      <Container>
        <NavBar maestro={maestro} />
        {crear ? <>
          <div class="d-flex justify-content-center align-items-center container-publicacion">
            <Card style={{ width: '100%', height: '80%' }}>
              <Card.Header as="h5" >
                {renderRedirect()}

                <button className='boton-regreso-publicacion'
                  onClick={() => setCrear(false)}> {"<"} </button>
                <label className='label-publicacion'>Titulo de la Actividad:</label>
                <input type='text' style={{ marginLeft: '1%' }} value={titulo}
                  onChange={(e) => setTitulo(e.target.value)}></input>

              </Card.Header>
              <Card.Body style={{ overflowY: 'auto' }}>
                <Card.Text>

                  Curso: <select style={{ marginLeft: '2%' }} onChange={(e) => handleChange(e)} >
                    <option key={'Maestro'} value={'Maestro'}>Matematica</option>
                    <option key={'Alumno'} value={'Alumno'}>Alumno</option>
                    <option key={'Administrador'} value={'Administrador'}>Administrador</option>
                  </select><br /><br />


                  <label>Descripcion:</label><br />
                  <textarea style={{ width: '100%' }} rows="4" value={descripcion}
                    onChange={(e) => setDesc(e.target.value)}></textarea><br /><br />

                  <label>Valor:</label>
                  <input type='text' value={valor} onChange={(e) => setValor(e.target.value)}
                    style={{ marginLeft: '2%', width: '5%', marginRight: '2%', textAlign: 'center' }}>

                  </input> puntos <br /><br />

                  <label>Fecha Entrega: </label>
                  <input type='date' value={fecha_entrega} onChange={(e) => setFecha(e.target.value)}
                    style={{ marginLeft: '2%', marginRight: '2%' }}>

                  </input><br />

                </Card.Text>
              </Card.Body>
              <Card.Footer style={{ textAlign: 'right' }}>
                <Button onClick={() => CrearActividad()} style={{ float: 'right' }}>Aceptar</Button>
              </Card.Footer>
            </Card>
          </div>
        </> :
          <>
            <br />
            <br />
            <div className='principal'>
              <div className="d-flex  justify-content-end align-items-center" style={{ marginLeft: '2%' }}>
                <h2>Actividades</h2>
                <div className="card-body d-flex justify-content-between align-items-center"
                  style={{ marginLeft: '62.5%' }}>
                  Grupo:
                  <Button onClick={() => editarActividad(0)}>{'<'}</Button>
                  {(indice / 8) + 1}
                  <Button onClick={() => editarActividad(0)}>{'>'}</Button>
                </div>
              </div>
              <div class="bg-light container-tabla-publicacion" >
                <Table striped bordered hover >
                  <thead>
                    <tr>
                      <th>Curso</th>
                      <th>Publicacion</th>
                      <th>Título</th>
                      <th>Descripcion</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      publicaciones.slice(indice, indice + 8).map((log) =>
                        <>
                          <tr key={log.id} onClick={() => editarActividad(log.id)}>

                            <td style={{ maxWidth: '150px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                              {log['descripcion']}
                            </td>

                            <td >
                              {log['fecha_publicacion']}
                            </td>

                            <td style={{ maxWidth: '150px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                              {log['titulo']}
                            </td>

                            <td style={{ maxWidth: '250px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                              {log['descripcion']}
                            </td>
                          </tr>
                        </>
                      )}
                  </tbody>
                  {renderRedirect()}
                </Table>
                <div>
                  <Button variant='success' style={{ marginLeft: '76%', marginRight: '0' }}> Ver Entregas</Button>
                  <Button onClick={() => setCrear(true)} style={{ float: 'right' }}> Crear Actividad</Button>
                </div>
              </div>
            </div>
          </>

        }

      </Container>


    </>
  );
}

export default MaestrosActividades;