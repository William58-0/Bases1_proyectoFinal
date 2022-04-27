import React, { useState, useEffect } from 'react'
import { useParams, Redirect } from 'react-router-dom';
import { Button } from "react-bootstrap";
import Table from 'react-bootstrap/Table';
import Card from 'react-bootstrap/Card';

import {
  getMaestro, getActividadMaestro, updateActividadMaestro,
  deleteActividad
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


  const [descripcion, setDesc] = useState("");
  const [fechaP, setFechaP] = useState("");
  const [fechaVE, setFechaVE] = useState("");
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
      var resp = response.data[0];
      setDesc(resp.descripcion);
      setFechaP(resp.fecha_publicacion);
      setFechaVE(resp.fechaVentrega);
      setFechaE(resp.fecha_entrega);
      setTitulo(resp.titulo);
      setValor(resp.valor);
    });
  }, [])

  const renderRedirect = () => {

    if (redirect) {
      return <Redirect to={'/maestros/actividades/' + id_maestro} />
    }
  }

  const GuardarCambios = () => {
    // accion de actualizar actividad
    updateActividadMaestro({
      titulo: titulo, descripcion: descripcion,
      fecha_entrega: fechaE, valor: valor,
      id_actividad: actividad
    }).then((response) => {
      if (response.status == 200) {
        alert("Actividad Actualizada");
        //para actualizar la actividad otra vez
        getActividadMaestro(actividad).then((response) => {
          var resp = response.data[0];
          setDesc(resp.descripcion);
          setFechaP(resp.fecha_publicacion);
          setFechaVE(resp.fechaVentrega);
          setFechaE(resp.fecha_entrega);
          setTitulo(resp.titulo);
          setValor(resp.valor);
        });
        setEditando(false);
      } else {
        alert("Ocurrió un error :(");
      }
    });

  }

  const EliminarActividad = () => {
    // accion de actualizar actividad
    deleteActividad(actividad).then((response) => {
      if (response.status == 200) {
        alert("Actividad Eliminada");
        setRedirect(true);
      } else {
        alert("Ocurrió un error :(");
      }
    });

  }

  return (
    <>
      <Container>
        <NavBar maestro={nombre_maestro} id_maestro={id_maestro} />
        <div class="d-flex justify-content-center align-items-center container-publicacion">
          <Card style={{ width: '100%', height: '80%' }}>
            <Card.Header as="h5" >
              {renderRedirect()}

              {/* ENCABEZADO */}
              {!editando ? <>
                <button className='boton-regreso-publicacion'
                  onClick={() => setRedirect(true)}> {"<"} </button>
                <label className='label-actividad'>Actividad: {titulo} </label>
                <Button variant='danger' onClick={() => EliminarActividad()} style={{ float: 'right' }}>Eliminar</Button>
                <Button variant='success' onClick={() => setEditando(true)} style={{ float: 'right', marginRight: '2%' }}>Editar</Button>

              </> : <>
                <button className='boton-regreso-publicacion'
                  onClick={() => setRedirect(true)}> {"<"} </button>
                <label className='label-publicacion'>Actividad: </label>
                <input type='text' style={{ marginLeft: '1%' }} value={titulo}
                  onChange={(e) => setTitulo(e.target.value)}></input>
              </>
              }

            </Card.Header>
            {/* CUERPO */}
            <Card.Body style={{ overflowY: 'auto' }}>
              <Card.Text>
                {!editando ?
                  <>
                    {descripcion} <br /><br /><br />
                  </>
                  :
                  <>
                    <label>Descripcion: </label><br />
                    <textarea style={{ width: '100%' }} rows="4" value={descripcion}
                      onChange={(e) => setDesc(e.target.value)}></textarea><br /><br />

                    <label>Valor:</label>
                    <input type='text' value={valor}
                      style={{ marginLeft: '2%', width: '5%', marginRight: '2%', textAlign: 'center' }}>

                    </input>
                    puntos<br /><br />
                    <label>Fecha Entrega: </label>
                    <input type='date' value={fechaE} onChange={(e) => setFechaE(e.target.value)}
                      style={{ marginLeft: '2%', marginRight: '2%' }}>

                    </input><br />
                    <Button onClick={() => console.log(fechaE)}>probar</Button>
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
                  <small className="text-muted">Fecha Edición: {fechaP}</small><br />
                  <small className="text-muted">Fecha Entrega: {fechaVE}</small><br />
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