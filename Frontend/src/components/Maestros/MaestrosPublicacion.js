import React, { useState, useEffect } from 'react'
import { Link, Redirect, useParams } from 'react-router-dom';
import { Button } from "react-bootstrap";
import Table from 'react-bootstrap/Table';
import Card from 'react-bootstrap/Card';

import {
  getMaestro, crearPublicacion, getPublicacionesMaestro,
  getIdClase, getCursosMaestro
} from '../../endpoints/endpoints';


import NavBar from './MaestrosNavBar';
import Container from './FondoMaestros';
import './maestro.css';

function MaestrosPublicacion() {
  //const [id_maestro, setMaestro] = useState(useParams().identificacion)
  const [id_maestro, setMaestro] = useState(1);
  const [nombre_maestro, setNombreMaestro] = useState("")
  const [cursos, setCursos] = useState([]);
  const [curso, setCurso] = useState(0);
  const [nombreCurso, setNombreCurso] = useState("");


  const [indice, setIndice] = useState(0);
  const [publicacion, setPub] = useState(0);
  const [publicaciones, setPubs] = useState([]);
  const [redirect, setRedirect] = useState(false);
  //
  const [crear, setCrear] = useState("");
  //const [curso, setCurso] = useState("");
  const [descripcion, setDesc] = useState("");
  const [fecha, setFecha] = useState("");


  useEffect(() => {
    // obtener los datos del maestro
    getMaestro(id_maestro).then((response) => {
      if (response.data.length > 0) {
        setNombreMaestro(response.data[0].nombre + " " + response.data[0].apellido)
      }
    });
    // obtener publicaciones para el maestro
    getPublicacionesMaestro(id_maestro).then((response) => {
      setPubs(response.data);
    });


    // obtener los cursos para el maestro
    getCursosMaestro(id_maestro).then((response) => {
      var resp = response;

      setCursos(response.data);
      if (response.data.length > 0) {
        setCurso(resp.data[0].id_curso);
        setNombreCurso(resp.data[0].nombre_curso);
      }

    });

  }, [])



  const renderRedirect = () => {
    if (redirect) {
      return <Redirect to={'/maestros/publicaciones/' + id_maestro + '/' + publicacion} />
    }
  }

  const Regresar = () => {
    setCrear(false);
    setDesc("");
    setFecha("");
  }

  const CrearPublicacion = () => {
    getIdClase(id_maestro, curso).then((response) => {
      crearPublicacion(descripcion, response.data[0].id_clase).then((response1) => {
        alert("Publicacion creada");
        getPublicacionesMaestro(id_maestro).then((response2) => {
          setPubs(response2.data);
        });
        Regresar();

      }).catch(err => {
        alert("Error :(");
      });

    });
  }


  const editarPublicacion = (row) => {
    setPub(row.id_publicacion);
    setRedirect(true);
  }

  const cambiarCurso = (e) => {
    setCurso(e.target.value);
    cursos.forEach(curso => {
      if (curso.id_curso.toString() == e.target.value.toString()) {
        setNombreCurso(curso.nombre_curso);
      }
    });
  }

  const siguienteGrupo = () => {
    var index = indice;
    var pubs = publicaciones;
    if (index + 8 <= pubs.length) {
      setIndice(index + 8);
    }
  }

  const anteriorGrupo = () => {
    var index = indice;
    if (index - 8 >= 0) {
      setIndice(index - 8);
    }
  }


  return (
    <>
      <Container>
        <NavBar maestro={nombre_maestro} id_maestro={id_maestro} />
        {crear ?
          <>
            <div class="d-flex justify-content-center align-items-center container-publicacion">
              <Card style={{ width: '100%', height: '65%' }}>
                <Card.Header as="h5" >
                  {renderRedirect()}

                  <button className='boton-regreso-publicacion'
                    onClick={() => setCrear(false)}> {"<"} </button>
                  <label className='label-publicacion'>Nueva Publicación</label>

                </Card.Header>
                <Card.Body style={{ overflowY: 'auto' }}>
                  <Card.Text>
                    <label>Descripcion: {fecha}</label><br />
                    <textarea style={{ width: '100%' }} rows="6"
                      value={descripcion}
                      onChange={(e) => setDesc(e.target.value)}></textarea><br /><br />
                    id_curso: <select style={{ marginLeft: '2%', marginRight: '2%' }}
                      onChange={(e) => cambiarCurso(e)} >
                      {
                        cursos.map((curso) =>
                          <option key={curso.id_curso} value={curso.id_curso}>{curso.id_curso}</option>
                        )}
                    </select>
                    Nombre del curso:
                    <input style={{ marginLeft: '2%' }} type="text" value={nombreCurso} />
                  </Card.Text>
                </Card.Body>
                <Card.Footer style={{ textAlign: 'right' }}>
                  <Button onClick={() => CrearPublicacion()} style={{ float: 'right' }}>Aceptar</Button>
                </Card.Footer>
              </Card>
            </div>

          </> :
          <>
            <br />
            <br />
            <div className='principal'>
              <div className="d-flex  justify-content-end align-items-center" style={{ marginLeft: '2%' }}>
                <h2>Publicaciones</h2>
                <div className="card-body d-flex justify-content-between align-items-center"
                  style={{ marginLeft: '60%' }}>
                  Grupo:
                  <Button onClick={() => anteriorGrupo({})}>{'<'}</Button>
                  {(indice / 8) + 1}
                  <Button onClick={() => siguienteGrupo({})}>{'>'}</Button>
                </div>
              </div>
              <div class="bg-light container-tabla-publicacion" >
                {renderRedirect()}
                <Table striped bordered hover >
                  <thead>
                    <tr>
                      <th >Fecha</th>
                      <th >Curso</th>
                      <th >Descripcion</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      publicaciones.slice(indice, indice + 8).map((log) =>
                        <>
                          <tr key={log.id} onClick={() => editarPublicacion(log)}>

                            <td >
                              {log['fecha']}
                            </td>

                            <td style={{ maxWidth: '150px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                              {log['nombre_curso']}
                            </td>

                            <td style={{ maxWidth: '250px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                              {log['descripcion']}
                            </td>
                          </tr>
                        </>
                      )}
                  </tbody>
                </Table>

              </div>
              <br />
              <div >
                <Button style={{ float: 'right', marginRight: '2%' }} onClick={() => setCrear(true)}>Crear Publicación</Button>
              </div>
            </div>

          </>
        }

      </Container>

    </>
  );
}

export default MaestrosPublicacion;