import React, { useState, useEffect } from 'react'
import { useParams, Redirect } from 'react-router-dom';
import { Button } from "react-bootstrap";
import { Table, Card } from 'react-bootstrap';

import {
  getAlumno, getActividadAlumno, getObservaciones
} from '../../endpoints/endpoints';

import NavBar from './AlumnosNavBar';
import Container from './FondoAlumnos';
import './alumno.css';


function AlumnosEntregarActividad() {
  const [id_alumno, setIdAlumno] = useState(1);
  const [nombre_alumno, setNombreAlumno] = useState("")
  const [asig_act, setAsigAct] = useState(useParams().asig_act)

  const [titulo, setTitulo] = useState("");
  const [descripcion, setDesc] = useState("");
  const [estado, setEstado] = useState("");
  const [entregado, setEntregado] = useState(false);

  const [actividad, setActividad] = useState(useParams().actividad);

  // para los detalles de la entrega
  const [verDetalles, setVerDet] = useState(false);
  const [fecha_entrega, setFechaEnt] = useState("");
  const [fecha_hora, setFechaHora] = useState("");
  const [punteo, setPunteo] = useState("");
  const [valor, setValor] = useState("");
  const [observaciones, setObs] = useState([
    {
      id_observacion: 1,
      texto: "holaa"
    },
    {
      id_observacion: 1,
      texto: "holaa"
    },
    {
      id_observacion: 1,
      texto: "holaa"
    },
    {
      id_observacion: 1,
      texto: "holaa"
    },
    {
      id_observacion: 1,
      texto: "holaa"
    },
    {
      id_observacion: 1,
      texto: "holaa"
    },
    {
      id_observacion: 1,
      texto: "holaa"
    },
    {
      id_observacion: 1,
      texto: "holaa"
    },
    {
      id_observacion: 1,
      texto: "holaa"
    },
  ]);

  const [redirect, setRedirect] = useState(false);

  //
  const [image, setImage] = useState({ preview: '', data: '' })
  const [status, setStatus] = useState('');

  const handleSubmit = async (e) => {

    e.preventDefault()
    let formData = new FormData()
    formData.append('file', image.data);
    formData.append('id_asignacion_actividad', asig_act);
    const response = await fetch('http://localhost:9000/Alumnos/entregarActividad', {
      method: 'POST',
      body: formData,
    })
    //if (response) setStatus(response.statusText)

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
    // obtener los datos del alumno
    getAlumno(id_alumno).then((response) => {
      if (response.data.length > 0) {
        setNombreAlumno(response.data[0].nombre + " " + response.data[0].apellido)
      }
    });
    // obtener datos de actividad para el alumno
    getActividadAlumno(asig_act).then((response) => {

      if (response.data.length > 0) {
        var resp = response.data[0]
        console.log("lo de la actividad");
        console.log(response.data[0]);
        setTitulo(resp.titulo);
        setDesc(resp.descripcion);
        setEstado(resp.estado_actividad);
        setFechaHora(resp.fecha_hora);
        setValor(resp.valor);
        setPunteo(resp.puntuacion);
        if (resp.estado_actividad == "Pendiente") {
          setEntregado(false);
        } else {
          setEntregado(true);
        }
      }
    });
    //get observaciones
    getObservaciones(asig_act).then((response) => {
      console.log("OBSERVACIONES");
      console.log(response.data);
      //setObs(response.data);
    });
  }, [])

  const renderRedirect = () => {

    if (redirect) {
      return <Redirect to={'/alumnos/actividades/' + id_alumno} />
    }
  }

  return (
    <>
      <Container>
        <NavBar alumno={nombre_alumno} id_alumno={id_alumno} />
        <div class="d-flex justify-content-center align-items-center container-publicacion">
          <Card style={{ width: '100%', height: '85%' }}>
            <Card.Header as="h5" >
              {renderRedirect()}


              <button className='boton-regreso-publicacion'
                onClick={() => setRedirect(true)}> {"<"} </button>
              <label className='label-publicacion'>Actividad: {titulo}</label>


            </Card.Header>
            <Card.Body style={{ overflowY: 'auto' }}>

              <Card.Text>
                {!verDetalles ?
                  <>
                    {descripcion}
                  </>
                  :
                  <>
                    {(punteo === null || punteo === "") ?
                      <>
                        <label>Pendiente de Calificación</label><br />
                        <label>Valor: {valor}</label><br />
                      </>
                      :
                      <>
                        <label>Punteo: {punteo} / {valor}</label><br /><br />
                        <div class="bg-light container-tabla-observaciones" >
                          <Table striped bordered hover>
                            <thead>
                              <tr>
                                <th>Observaciones</th>
                              </tr>
                            </thead>
                            <tbody>
                              {
                                observaciones.map((log) =>
                                  <>
                                    <tr key={log.id_observacion}>

                                      <td style={{ maxWidth: '150px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                        {log['texto']}
                                      </td>

                                    </tr>
                                  </>
                                )}
                            </tbody>
                          </Table>
                        </div>
                        {/**aquiii deberia haber una tabla tal vez */}
                      </>
                    }

                  </>
                }

              </Card.Text>
            </Card.Body>

            <Card.Footer >
              {!entregado ?
                <>
                  <p style={{ textAlign: 'center' }}>Estado: {estado}</p>
                  <form onSubmit={handleSubmit}>
                    <input type='file' name='file' onChange={handleFileChange}></input>
                    <Button type='submit' style={{ float: 'right' }}>Enviar</Button>
                  </form>
                </>
                :
                <>
                  <p style={{ textAlign: 'center' }}>Entregado: Entregado</p>
                  <div>
                    <small className="text-muted">Entregado el {fecha_hora}</small>
                    {!verDetalles ?
                      <>
                        <Button onClick={() => setVerDet(true)} style={{ float: 'right' }}>Detalles de Entrega</Button>
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