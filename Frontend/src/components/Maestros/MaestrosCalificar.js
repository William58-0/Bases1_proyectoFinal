import React, { useState, useEffect } from 'react'
import { useParams, Redirect } from 'react-router-dom';
import { Button } from "react-bootstrap";
import Table from 'react-bootstrap/Table';
import Card from 'react-bootstrap/Card';

import {
  getMaestro, getEntrega, calificarEntrega
} from '../../endpoints/endpoints';

import NavBar from './MaestrosNavBar';
import Container from './FondoMaestros';
import './maestro.css';


function MaestrosCalificar() {
  const [id_maestro, setIdMaestro] = useState(1);
  const [nombre_maestro, setNombreMaestro] = useState("");
  const [entrega, setEntrega] = useState(useParams().entrega);
  const [nuevaOb, setNuevaOb] = useState("");
  const [observaciones, setObs] = useState([]);

  const [actividad, setActividad] = useState(useParams().actividad);


  const [valor, setValor] = useState(0);

  // para los detalles de la entrega
  const [editando, setEditando] = useState(false);


  const [descripcion, setDesc] = useState("");
  const [fechaP, setFechaP] = useState("");
  const [fechaVE, setFechaVE] = useState("");
  const [fechaE, setFechaE] = useState("");
  const [titulo, setTitulo] = useState("");
  const [punteo, setPunteo] = useState("");
  const [carnet, setCarnet] = useState("");

  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    // obtener los datos del maestro
    getMaestro(id_maestro).then((response) => {
      if (response.data.length > 0) {
        setNombreMaestro(response.data[0].nombre + " " + response.data[0].apellido)
      }
    });
    // obtener datos de actividad para el maestro
    getEntrega(entrega).then((response) => {
      console.log("DATOOOS DE LA ENTREGA");
      console.log(response.data);
      if (response.data.length > 0) {
        var resp = response.data[0];
        setTitulo(resp.titulo);
        setDesc(resp.descripcion);
        setValor(resp.valor);
        setPunteo(resp.puntuacion);
        setFechaVE(resp.fecha_hora);
        setCarnet(resp.carnet);
      }
    });
  }, [])

  const renderRedirect = () => {
    if (redirect) {
      return <Redirect to={'/maestros/entregas/' + id_maestro} />
    }
  }

  const CalificarEntrega = () => {
    // accion de calificar actividad
    calificarEntrega(punteo, observaciones, entrega).then((response) => {
      alert("Entrega Actualizada");
      setEditando(false);
    }).catch(err => {
      alert("Error :(");
    });

  }

  const nuevaObservacion = () => {
    var nuevaa = { id_observacion: observaciones.length, texto: nuevaOb }
    setObs([...observaciones, nuevaa])
  }

  const quitarObservacion = (row) => {
    const del = observaciones.filter(observacion => observacion.id_observacion !== row.id_observacion);
    setObs(del);
  }

  return (
    <>
      <Container>
        <NavBar maestro={nombre_maestro} id_maestro={id_maestro} />
        <div class="d-flex justify-content-center align-items-center container-publicacion">
          <Card style={{ width: '100%', height: '85%' }}>
            <Card.Header as="h5" >
              {renderRedirect()}

              {/* ENCABEZADO */}

              <button className='boton-regreso-publicacion'
                onClick={() => setRedirect(true)}> {"<"} </button>
              <label className='label-actividad'>Actividad: {titulo} </label>
              {!editando ? <>
                <Button variant='success' onClick={() => setEditando(true)} style={{ float: 'right', marginRight: '2%' }}>Calificar</Button>
              </> : <></>
              }

            </Card.Header>
            {/* CUERPO */}
            <Card.Body style={{ overflowY: 'auto' }}>
              <Card.Text>
                {!editando ?
                  <>
                    {descripcion} <br /><br />
                    Punteo: {punteo}<br /><br />
                    Valor: {valor}<br /><br />
                  </>
                  :
                  <>
                    <label>Alumno: {carnet}</label><br /><br />
                    <label>Punteo:</label>
                    <input type='text' value={punteo}
                      style={{ marginLeft: '2%', width: '5%', marginRight: '2%', textAlign: 'center' }}
                      onChange={(e) => setPunteo(e.target.value)}>
                    </input>
                    / {valor} pts<br /><br />
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
                                <tr key={log.id_observacion} onClick={() => quitarObservacion(log)}>

                                  <td style={{ maxWidth: '150px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                    {log['texto']}
                                  </td>

                                </tr>
                              </>
                            )}
                        </tbody>
                      </Table>
                    </div>
                    Nueva Observación: <input type='text' value={nuevaOb}
                      style={{ marginLeft: '2%', width: '60%', marginRight: '2%' }}
                      onChange={(e) => setNuevaOb(e.target.value)}>
                    </input>
                    <Button onClick={() => nuevaObservacion()}>Agregar</Button>
                  </>
                }
              </Card.Text>
            </Card.Body>
            <Card.Footer style={{ textAlign: 'right' }}>
              {editando ?
                <>
                  <Button onClick={() => CalificarEntrega()}
                    style={{ marginLeft: 'auto', marginRight: '0' }}>Guardar Cambios</Button>
                </>
                :
                <>
                  <small className="text-muted">Estudiante: {carnet}</small><br />
                  <small className="text-muted">Entregado el: {fechaVE}</small><br />
                </>
              }

            </Card.Footer>
          </Card>
        </div>
      </Container>
    </>
  );
}

export default MaestrosCalificar;