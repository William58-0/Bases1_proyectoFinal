import React, { useState, useEffect } from 'react'
import { useParams, Redirect } from 'react-router-dom';
import { Button } from "react-bootstrap";
import Table from 'react-bootstrap/Table';
import Card from 'react-bootstrap/Card';


import NavBar from './AlumnosNavBar';
import Container from './FondoAlumnos';
import './alumno.css';


function AlumnosEntregarActividad() {
  const [alumno, setAlumno] = useState(useParams().identificacion)
  const [actividad, setActividad] = useState(useParams().actividad);
  const [entregado, setEntregado] = useState(false);

  // para los detalles de la entrega
  const [verDetalles, setVerDet] = useState(false);
  const [fecha_entrega, setFechaEnt] = useState("");
  const [punteo, setPunteo] = useState("");
  const [valor, setValor] = useState("");
  const [observaciones, setObservaciones] = useState("");

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
    setEntregado(true);
  }

  const handleFileChange = (e) => {
    const img = {
      preview: URL.createObjectURL(e.target.files[0]),
      data: e.target.files[0],
    }
    setImage(img)
  }

  useEffect(() => {
    // obtener los datos del estudiante
    // obtener datos de actividad para el estudiante
  }, [])

  const renderRedirect = () => {

    if (redirect) {
      return <Redirect to={'/alumnos/actividades/' + alumno} />
    }
  }

  return (
    <>
      <Container>
        <NavBar estudiante={alumno} />
        <div class="d-flex justify-content-center align-items-center container-publicacion">
          <Card style={{ width: '100%', height: '80%' }}>
            <Card.Header as="h5" >
              {renderRedirect()}


              <button className='boton-regreso-publicacion'
                onClick={() => setRedirect(true)}> {"<"} </button>
              <label className='label-publicacion'>Actividad: {actividad}</label>


            </Card.Header>
            <Card.Body style={{ overflowY: 'auto' }}>

              <Card.Text>
                {!verDetalles ?
                  <>
                    hacer la tarea
                  </>
                  :
                  <>
                    <label>Fecha de entrega: {fecha_entrega}</label><br/>
                    <label>Punteo: {punteo} / {valor}</label><br/><br/>
                    <label>Observaciones: </label> <br/>
                    <p>
                    {observaciones}hola
                    </p>
                  </>
                }

              </Card.Text>
            </Card.Body>

            <Card.Footer >
              {!entregado ?
                <>
                  <p style={{ textAlign: 'center' }}>Entregado: No Entregado</p>
                  <form onSubmit={handleSubmit}>
                    <input type='file' name='file' onChange={handleFileChange}></input>
                    <Button type='submit' style={{ float: 'right' }}>Enviar</Button>
                  </form>
                </>
                :
                <>
                  <p style={{ textAlign: 'center' }}>Entregado: Entregado</p>
                  <div>
                    <small className="text-muted">Fecha</small>
                    {!verDetalles ?
                      <>
                        <Button onClick={() =>setVerDet(true)} style={{ float: 'right' }}>Detalles de Entrega</Button>
                      </>
                      :
                      <>
                        <Button variant='success' onClick={() => setVerDet(false)} style={{ float: 'right' }}>Descripción</Button>
                      </>
                    }

                  </div>
                </>
              }

            </Card.Footer>
          </Card>
        </div>
      </Container>
    </>
  );
}

export default AlumnosEntregarActividad;