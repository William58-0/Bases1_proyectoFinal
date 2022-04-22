import React, { useState, useEffect } from 'react'
import { useParams, Redirect } from 'react-router-dom';
import { Button } from "react-bootstrap";
import Table from 'react-bootstrap/Table';
import Card from 'react-bootstrap/Card';


import NavBar from './MaestrosNavBar';
import Container from './FondoMaestros';
import './maestro.css';


function MaestrosVerActividad() {
  const [maestro, setMaestro] = useState(useParams().identificacion)
  const [actividad, setActividad] = useState(useParams().actividad);

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
    // obtener datos de actividad para el maestro
  }, [])

  const renderRedirect = () => {

    if (redirect) {
      return <Redirect to={'/maestros/actividades/' + maestro} />
    }
  }

  const Eliminar = () => {
    // accion de eliminar actividad
    setRedirect(true);

  }

  const GuardarCambios = () => {
    // accion de actualizar actividad
    setEditando(false);

  }

  return (
    <>
      <Container>
        <NavBar maestro={maestro} />
        <div class="d-flex justify-content-center align-items-center container-publicacion">
          <Card style={{ width: '100%', height: '80%' }}>
            <Card.Header as="h5" >
              {renderRedirect()}

              <button className='boton-regreso-publicacion'
                onClick={() => setRedirect(true)}> {"<"} </button>
              <label className='label-publicacion'>Actividad: {actividad}</label>
              {editando ? <>
              </> : <>
                <Button variant='success' onClick={() => setEditando(true)} style={{ marginLeft: '55%', marginRight: '0' }}>Editar</Button>
                <Button variant='danger' onClick={() => Eliminar()} style={{ float: 'right' }}>Eliminar</Button>
              </>
              }


            </Card.Header>
            <Card.Body style={{ overflowY: 'auto' }}>
              <Card.Text>
                {!editando ?
                  <>
                    {descripcion}
                  </>
                  :
                  <>
                    <label>Descripcion: {fecha}</label><br />
                    <textarea style={{ width: '100%' }} rows="4"></textarea><br /><br />

                    <label>Valor:</label>
                    <input type='text' value={valor}
                      style={{ marginLeft: '2%', width: '5%', marginRight: '2%', textAlign: 'center' }}>

                    </input>
                    puntos<br /><br />
                    <label>Fecha Entrega: </label>
                    <input type='date' value={fecha} onChange={(e) => setFecha(e.target.value)}
                      style={{ marginLeft: '2%', marginRight: '2%' }}>

                    </input><br />
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
                  <small className="text-muted">Valor: {valor}</small><br />
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

export default MaestrosVerActividad;