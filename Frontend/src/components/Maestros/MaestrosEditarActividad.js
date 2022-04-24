import React, { useState, useEffect } from 'react'
import { useParams, Redirect } from 'react-router-dom';
import { Button } from "react-bootstrap";
import Table from 'react-bootstrap/Table';
import Card from 'react-bootstrap/Card';

import {
  getMaestro, getActividadMaestro, updatePublicacion,
  deletePublicacion
} from '../../endpoints/endpoints';

import NavBar from './MaestrosNavBar';
import Container from './FondoMaestros';
import './maestro.css';


function MaestrosVerActividad() {
  const [id_maestro, setIdMaestro] = useState(449);
  const [nombre_maestro, setNombreMaestro] = useState("")
  const [actividad, setActividad] = useState(useParams().actividad);

  const [valor, setValor] = useState(0);

  // para los detalles de la entrega
  const [editando, setEditando] = useState(false);

  
  const [descripcion, setDescripcion] = useState("");
  const [fechaP, setFechaP] = useState("");
  const [fechaE, setFechaE] = useState("");
  const [titulo, setTitulo] = useState("");

  const [redirect, setRedirect] = useState(false);

  //
  const [image, setImage] = useState({ preview: '', data: '' })
  const [status, setStatus] = useState('')

  useEffect(() => {
    // obtener los datos del maestro
    getMaestro(id_maestro).then((response) => {
      setNombreMaestro(response.data[0].nombre + " " + response.data[0].apellido)
    });
    // obtener datos de actividad para el maestro
    getActividadMaestro(actividad).then((response) => {
      console.log("ESTA ES LA ACTIVIDAD")
      console.log(response);
      var resp = response.data[0];
      setDescripcion(resp.descripcion);
      setFechaP(resp.fecha_publicacion);
      setFechaE(resp.fecha_entrega);
      setTitulo(resp.titulo);
      setValor(resp.valor);

      /*
      descripcion: "Maecenas ut massa quis augue luctus tincidunt."
      fecha_entrega: "14-01-2022"
      fecha_publicacion: "21-04-2021"
      id_actividad: 11
      id_clase: 43
      id_curso: 4
      id_maestro: 449
      nombre_curso: "lenguaje\r"
      titulo: "Andean goose"
      valor: 11
      */

      //setNombreMaestro(response.data[0].nombre + " " + response.data[0].apellido)
    });
  }, [])

  const renderRedirect = () => {

    if (redirect) {
      return <Redirect to={'/maestros/actividades/' + id_maestro} />
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
        <NavBar maestro={nombre_maestro} />
        <div class="d-flex justify-content-center align-items-center container-publicacion">
          <Card style={{ width: '100%', height: '80%' }}>
            <Card.Header as="h5" >
              {renderRedirect()}

              <button className='boton-regreso-publicacion'
                onClick={() => setRedirect(true)}> {"<"} </button>
              <label className='labelactividad'>Actividad: </label>
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
                    <label>Descripcion: </label><br />
                    <textarea style={{ width: '100%' }} rows="4"></textarea><br /><br />

                    <label>Valor:</label>
                    <input type='text' value={valor}
                      style={{ marginLeft: '2%', width: '5%', marginRight: '2%', textAlign: 'center' }}>

                    </input>
                    puntos<br /><br />
                    <label>Fecha Entrega: </label>
                    <input type='date' value={fechaE} onChange={(e) => setFechaE(e.target.value)}
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
                  <small className="text-muted">Fecha Edición: {fechaE}</small><br />

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