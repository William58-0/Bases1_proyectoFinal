import React, { useState, useEffect } from 'react'
import { Link, Redirect, useParams } from 'react-router-dom';
import { Button } from "react-bootstrap";
import Table from 'react-bootstrap/Table';
import Card from 'react-bootstrap/Card';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'


import {
  getMaestro, getActividadesMaestro, getCursosMaestro,
  getIdClase, crearActividad, getAlumnosCurso,
  getAlumno
} from '../../endpoints/endpoints';

import NavBar from './MaestrosNavBar';
import Container from './FondoMaestros';
import './maestro.css';


function MaestrosActividades() {
  const [id_maestro, setIdMaestro] = useState(1);
  const [nombre_maestro, setNombreMaestro] = useState("")
  const [actividades, setActs] = useState([])

  const [indice, setIndice] = useState(0);
  const [actividad, setActi] = useState(0);
  const [destino, setDestino] = useState(0);
  const [redirect, setRedirect] = useState(false);
  //
  const [crear, setCrear] = useState(false);
  const [cursos, setCursos] = useState([]);
  const [curso, setCurso] = useState(0);
  const [nombreCurso, setNombreCurso] = useState("");
  const [titulo, setTitulo] = useState("");
  const [descripcion, setDesc] = useState("");
  const [valor, setValor] = useState(0);
  const [fecha_entrega, setFechaE] = useState("");
  const [fecha_publicacion, setFechaP] = useState("");
  const [alumnos, setAlumnos] = useState([]);
  const [alumno, setAlumno] = useState({});
  const [alumnosA, setAlumnosA] = useState([]);

  useEffect(() => {
    // obtener los datos del maestro
    getMaestro(id_maestro).then((response) => {
      setNombreMaestro(response.data[0].nombre + " " + response.data[0].apellido)
    });
    // obtener actividades para el maestro
    getActividadesMaestro(id_maestro).then((response) => {
      setActs(response.data);
    });

    getCursosMaestro(id_maestro).then((response1) => {
      var resp = response1;
      setCursos(resp.data);
      if (resp.data.length > 0) {
        setCurso(resp.data[0].id_curso);
        setNombreCurso(resp.data[0].nombre_curso);

        getAlumnosCurso(id_maestro, resp.data[0].id_curso).then((response2) => {
          setAlumnos(response2.data);
          if (response2.data.length > 0) {
            setAlumno(response2.data[0]);
          }
        });
      }

    });

  }, [])


  const cambiarCurso = (e) => {
    setCurso(e.target.value);

    getAlumnosCurso(id_maestro, e.target.value).then((response) => {
      setAlumnos(response.data);
      if (response.data.length > 0) {
        setAlumno(response.data[0]);
      }
    });

    cursos.forEach(curso => {
      if(curso.id_curso.toString() === e.target.value.toString()){
        setNombreCurso(curso.nombre_curso);     
      }
    });

  }

  const cambiarAlumno = (e) => {
    getAlumno(e.target.value).then((response) => {
      if (response.data.length > 0) {
        setAlumno(response.data[0]);
      }
    });
  }


  const agregarAlumno = () => {
    setAlumnosA([...alumnosA, alumno]);
  }

  const quitarAlumno = (row) => {
    const del = alumnosA.filter(alumno => alumno.id_alumno !== row.id_alumno);
    setAlumnosA(del);
  }

  const CrearActividad = () => {
    getIdClase(id_maestro, curso).then((response) => {
      crearActividad({
        titulo: titulo, descripcion: descripcion,
        fecha_entrega: fecha_entrega, valor: valor,
        id_clase: response.data[0].id_clase,
        alumnos: alumnos
      }).then((response) => {
        alert("Actividad Creada");
        //para actualizar las actividades otra vez
        getActividadesMaestro(id_maestro).then((response1) => {
          setActs(response1.data);
        });
        regresar();

      }).catch(err => {
        alert("Error :(");
      });

    });
  }

  const editarActividad = (row) => {
    // obtener los datos para la actividad seleccionada
    setActi(row.id_actividad);
    setRedirect(true);

  }

  const regresar = ()=>{
    setTitulo("");
    setDesc("");
    setValor(0);
    setFechaE("");
    setAlumnosA([]);
    setCrear(false);
  }

  const renderRedirect = () => {
    if (redirect) {
      return <Redirect to={'/maestros/actividades/' + id_maestro + '/' + actividad} />
    }
  }

  return (
    <>
      <Container>
        <NavBar maestro={nombre_maestro} id_maestro={id_maestro} />
        {crear ? <>
          <div style={{ position: 'absolute', marginLeft: '2%', marginTop: '2%' }}>
            <button style={{ backgroundColor: 'transparent', border: 'none' }}
              onClick={() => setCrear(false)}>
              <FontAwesomeIcon icon={faArrowLeft} color='white' size='2x' />
            </button>
          </div>
          <br /><br /><br />
          <div className="d-flex justify-content-center align-items-center"
            style={{ color: 'black' }} >
            <div class='row' style={{ width: '90%', height: '80%', marginLeft: '2%' }}>
              <div class='col' >
                <Card style={{ width: '90%', height: '88%' }}>
                  <Card.Header as="h5" >
                    {renderRedirect()}

                    <label className='label-publicacion'>Titulo de la Actividad:</label>
                    <input type='text' style={{ marginLeft: '1%' }} value={titulo}
                      onChange={(e) => setTitulo(e.target.value)}></input>

                  </Card.Header>
                  <Card.Body style={{ overflowY: 'auto' }}>
                    <Card.Text>

                      id_curso: <select style={{ marginLeft: '2%', marginRight: '2%' }}
                        onChange={(e) => cambiarCurso(e)} >
                        {
                          cursos.map((curso) =>
                            <option key={curso.id_curso} value={curso.id_curso}>{curso.id_curso}</option>
                          )}
                      </select>
                      Nombre del curso:
                      <input style={{ marginLeft: '2%' }} type="text" value={nombreCurso} /><br /><br />

                      <label>Descripcion:</label><br />
                      <textarea style={{ width: '100%' }} rows="4" value={descripcion}
                        onChange={(e) => setDesc(e.target.value)}></textarea><br /><br />

                      <label>Valor:</label>
                      <input type='text' value={valor} onChange={(e) => setValor(e.target.value)}
                        style={{ marginLeft: '2%', width: '5%', marginRight: '2%', textAlign: 'center' }}>

                      </input> puntos <br /><br />

                      <label>Fecha Entrega: </label>
                      <input type='date' value={fecha_entrega} onChange={(e) => setFechaE(e.target.value)}
                        style={{ marginLeft: '2%', marginRight: '2%' }}>

                      </input><br />

                    </Card.Text>
                  </Card.Body>

                </Card>
              </div>
              <div class='col'>
                <Card style={{ width: '90%' }}>
                  <Card.Header as="h5" >
                    {renderRedirect()}
                    <label className='label-publicacion'>Asignar Alumnos</label>
                  </Card.Header>
                  <Card.Body style={{ overflowY: 'auto' }}>
                    <Card.Text>
                      id_clase: <label>{id_maestro}</label><br /><br />
                      id_alumno: <select style={{ marginLeft: '2%', marginRight: '2%' }}
                        onChange={(e) => cambiarAlumno(e)} >
                        {
                          alumnos.map((alumno) =>
                            <option key={alumno.id_alumno} value={alumno.id_alumno}>{alumno.id_alumno}</option>
                          )}
                      </select>
                      Nombre:
                      <input style={{ marginLeft: '2%', width: '30%' }} type="text" value={alumno.carnet} />
                      <Button style={{ float: 'right' }} onClick={agregarAlumno}>Agregar</Button><br /><br />
                      <div class="bg-light container-tabla-asignados" >
                        <Table striped bordered hover >
                          <thead>
                            <tr>
                              <th>Carnet</th>
                              <th>Nombre</th>
                              <th>Correo</th>
                            </tr>
                          </thead>
                          <tbody>
                            {
                              alumnosA.slice(indice, indice + 8).map((log) =>
                                <>
                                  <tr key={log.id_alumno} onClick={() => quitarAlumno(log)}>

                                    <td >
                                      {log['carnet']}
                                    </td>

                                    <td style={{ maxWidth: '150px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                      {log['nombre']}{" "}{log['apellido']}
                                    </td>

                                    <td style={{ maxWidth: '150px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                      {log['correo']}
                                    </td>
                                  </tr>
                                </>
                              )}
                          </tbody>
                          {renderRedirect()}
                        </Table>
                      </div>
                    </Card.Text>
                  </Card.Body>
                </Card>
                <br />
                <Button onClick={() => CrearActividad()}
                  style={{ float: 'right', marginRight: '10%' }}>Aceptar</Button>
              </div>
            </div>

          </div>
        </> :
          <>
            <br />
            <br />
            <div className='principal'>
              <div className="d-flex  justify-content-end align-items-center" style={{ marginLeft: '2%' }}>
                <h2>Actividades</h2>
                <div className="card-body d-flex justify-content-between align-items-center"
                  style={{ marginLeft: '62.5%' }}>
                  Grupo:
                  <Button onClick={() => editarActividad(0)}>{'<'}</Button>
                  {(indice / 8) + 1}
                  <Button onClick={() => editarActividad(0)}>{'>'}</Button>
                </div>
              </div>
              <div class="bg-light container-tabla-publicacion" >
                <Table striped bordered hover >
                  <thead>
                    <tr>
                      <th>Curso</th>
                      <th>Publicacion</th>
                      <th>Título</th>
                      <th>Descripcion</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      actividades.slice(indice, indice + 8).map((log) =>
                        <>
                          <tr key={log.id} onClick={() => editarActividad(log)}>

                            <td style={{ maxWidth: '150px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                              {log['nombre_curso']}
                            </td>

                            <td >
                              {log['fecha_publicacion']}
                            </td>

                            <td style={{ maxWidth: '150px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                              {log['titulo']}
                            </td>

                            <td style={{ maxWidth: '250px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                              {log['descripcion']}
                            </td>
                          </tr>
                        </>
                      )}
                  </tbody>
                  {renderRedirect()}
                </Table>

              </div>
              <div style={{ marginTop: '2%' }}>
                <Button variant='success' style={{ marginLeft: '75%' }}> Ver Entregas</Button>
                <Button onClick={() => setCrear(true)} style={{ float: 'right', marginRight: '1.5%' }}> Crear Actividad</Button>
              </div>
            </div>
          </>

        }

      </Container>


    </>
  );
}

export default MaestrosActividades;