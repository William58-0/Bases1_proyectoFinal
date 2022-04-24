import React, { useState, useEffect } from 'react'
import { useParams, Redirect } from 'react-router-dom';
import { Button } from "react-bootstrap";
import Table from 'react-bootstrap/Table';
import Card from 'react-bootstrap/Card';

import {
  getMaestro, getPublicacion, updatePublicacion,
  deletePublicacion
} from '../../endpoints/endpoints';

import NavBar from './MaestrosNavBar';
import Container from './FondoMaestros';
import './maestro.css';


function MaestrosVerPublicacion() {
  const [id_maestro, setIdMaestro] = useState(449);
  const [nombre_maestro, setNombreMaestro] = useState("")
  const [publicacion, setPub] = useState(useParams().publicacion);


  const [descripcion, setDesc] = useState("");
  const [curso, setCurso] = useState("");
  const [fecha, setFecha] = useState("");

  const [valor, setValor] = useState(0);

  // para los detalles de la entrega
  const [editando, setEditando] = useState(false);

  const [redirect, setRedirect] = useState(false);

  //
  const [image, setImage] = useState({ preview: '', data: '' })
  const [status, setStatus] = useState('')

  useEffect(() => {
    // obtener los datos del maestro
    getMaestro(id_maestro).then((response) => {
      setNombreMaestro(response.data[0].nombre + " " + response.data[0].apellido)
    });
    // obtener datos de publicacion para el maestro
    getPublicacion(publicacion).then((response) => {
      //setPubs(response.data.datos);
      var pub = response.data[0];
      setDesc(pub.descripcion);
      setCurso(pub.nombre_curso);
      setFecha(pub.fecha);
    });
  }, [])

  const renderRedirect = () => {

    if (redirect) {
      return <Redirect to={'/maestros/publicaciones/' + id_maestro} />
    }
  }



  const GuardarCambios = () => {
    // accion de actualizar publicacion
    updatePublicacion(publicacion, descripcion).then((response) => {
      console.log(response);

      setEditando(false);

    });

  }

  const Eliminar = () => {
    // accion de eliminar publicacion
    deletePublicacion(publicacion).then((response) => {
      console.log(response);

      setRedirect(true);
      //setNombreMaestro(response.data[0].nombre + " " + response.data[0].apellido)
      //console.log(response.data[0].nombre + " " + response.data[0].apellido)
    });

  }

  return (
    <>
      <Container>
      <NavBar maestro={nombre_maestro} id_maestro={id_maestro} />
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
                    {descripcion}
                  </>
                  :
                  <>
                    <label>Descripcion:</label><br />
                    <textarea style={{ width: '100%' }} rows="6"
                      value={descripcion} onChange={(e) => setDesc(e.target.value)}>
                    </textarea><br /><br />
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
                  <small className="text-muted">Curso: {curso}</small><br />
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