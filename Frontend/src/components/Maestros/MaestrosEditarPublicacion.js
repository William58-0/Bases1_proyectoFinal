import React, { useState, useEffect } from 'react'
import { useParams, Redirect } from 'react-router-dom';
import { Button } from "react-bootstrap";
import Table from 'react-bootstrap/Table';
import Card from 'react-bootstrap/Card';


import NavBar from './MaestrosNavBar';
import Container from './FondoMaestros';
import './maestro.css';


function MaestrosVerPublicacion() {
  const [maestro, setMaestro] = useState(useParams().identificacion)
  const [publicacion, setPublicacion] = useState(useParams().publicacion);

  const [valor, setValor] = useState(0);

  // para los detalles de la entrega
  const [editando, setEditando] = useState(false);

  const [fecha, setFecha] = useState("");
  const [descripcion, setDescripcion] = useState("");

  const [redirect, setRedirect] = useState(false);

  //
  const [image, setImage] = useState({ preview: '', data: '' })
  const [status, setStatus] = useState('')

  useEffect(() => {
    // obtener los datos del maestro
    // obtener datos de publicacion para el maestro
  }, [])

  const renderRedirect = () => {

    if (redirect) {
      return <Redirect to={'/maestros/publicaciones/' + maestro} />
    }
  }

  const Eliminar = () => {
    // accion de eliminar publicacion
    setRedirect(true);

  }

  const GuardarCambios = () => {
    // accion de actualizar publicacion
    setEditando(false);

  }

  return (
    <>
      <Container>
        <NavBar maestro={maestro} />
        <div class="d-flex justify-content-center align-items-center container-publicacion">
          <Card style={{ width: '100%', height: '60%' }}>
            <Card.Header as="h5" >
              {renderRedirect()}

              <button className='boton-regreso-publicacion'
                onClick={() => setRedirect(true)}> {"<"} </button>
              <label className='label-publicacion'>Editar Publicación</label>
              {editando ? <>
              </> : <>
                <Button variant='success' onClick={() => setEditando(true)} style={{ marginLeft: '45%', marginRight: '0' }}>Editar</Button>
                <Button variant='danger' onClick={() => Eliminar()} style={{ float: 'right' }}>Eliminar</Button>
              </>
              }


            </Card.Header>
            <Card.Body style={{ overflowY: 'auto' }}>
              <Card.Text>
                {!editando ?
                  <>
                    descripcion {descripcion}
                  </>
                  :
                  <>
                    <label>Descripcion: {fecha}</label><br />
                    <textarea style={{ width: '100%' }} rows="6"></textarea><br /><br />

                    
                  </>
                }
              </Card.Text>
            </Card.Body>
            <Card.Footer style={{ textAlign: 'right' }}>
              {editando ?
                <>
                  <Button onClick={() => GuardarCambios()} style={{ float: 'right' }}>Aceptar</Button>
                </>
                :
                <>
                  <small className="text-muted">Curso: {fecha}</small><br />
                  <small className="text-muted">Fecha Edición: {fecha}</small><br />

                </>
              }

            </Card.Footer>
          </Card>
        </div>
      </Container>
    </>
  );
}

export default MaestrosVerPublicacion;