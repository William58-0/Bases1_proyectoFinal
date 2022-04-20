import React, { useState, useEffect } from 'react'
import { useParams, Redirect } from 'react-router-dom';
import { Button } from "react-bootstrap";
import Table from 'react-bootstrap/Table';
import Card from 'react-bootstrap/Card';


import NavBar from './MaestrosNavBar';
import Container from './FondoMaestros';
import './maestro.css';


function MaestrosEntregarActividad() {
  const [maestro, setMaestro] = useState(useParams().identificacion)
  const [actividad, setActividad] = useState(useParams().actividad);
  const [estado, setEstado] = useState(0);
  const [redirect, setRedirect] = useState(false);

  //
  const [image, setImage] = useState({ preview: '', data: '' })
  const [status, setStatus] = useState('')
  const handleSubmit = async (e) => {
    /*
    e.preventDefault()
    let formData = new FormData()
    formData.append('file', image.data);
    formData.append('nombre', 'william');
    const response = await fetch('http://localhost:5000/image', {
      method: 'POST',
      body: formData,
    })
    if (response) setStatus(response.statusText)
    */
    setEstado(1);
  }

  const handleFileChange = (e) => {
    const img = {
      preview: URL.createObjectURL(e.target.files[0]),
      data: e.target.files[0],
    }
    setImage(img)
  }

  useEffect(() => {
    // obtener los datos del maestro
    // obtener datos de actividad para el maestro
  }, [])

  const renderRedirect = () => {

    if (redirect) {
      return <Redirect to={'/maestros/actividades/' + maestro} />
    }
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
              Asunto de actividad
            </Card.Header>
            <Card.Body style={{ overflowY: 'auto' }}>
              <Card.Text>
                hacer la tarea
              </Card.Text>
            </Card.Body>

            <Card.Footer style={{ textAlign: estado === 0 ? 'none' : 'right' }}>
              {estado === 0 ?
                <>
                  <p style={{ textAlign: 'center' }}>Estado: No Entregado</p>
                  <form onSubmit={handleSubmit}>
                    <input type='file' name='file' onChange={handleFileChange}></input>
                    <Button type='submit' style={{ float: 'right' }}>Enviar</Button>
                  </form>
                </>
                :
                <>
                  <small className="text-muted">Fecha</small><br />
                  <small className="text-muted">Autor</small>
                </>
              }

            </Card.Footer>
          </Card>
        </div>
      </Container>
    </>
  );
}

export default MaestrosEntregarActividad;