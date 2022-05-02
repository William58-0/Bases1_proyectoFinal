import React, { useState, useEffect } from 'react'
import { Link, Redirect, useParams } from 'react-router-dom';
import { Button } from "react-bootstrap";
import { Table, Card } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'

import {
  getMaestro, getCursosMaestro, getAlumnosCurso,
  getAlumno, getIdClase, crearExamen
} from '../../endpoints/endpoints';

import NavBar from './MaestrosNavBar';
import Container from './FondoMaestros';
import './maestro.css';

function MaestrosEntregarActividad() {
  const [id_maestro, setMaestro] = useState(useParams().identificacion);
  const [nombre_maestro, setNombreMaestro] = useState("");
  const [redirect, setRedirect] = useState(false);

  const [valor, setValor] = useState(0);
  const [textoPregunta, setTextoPreguna] = useState("¿?");
  const [nuevaOpcion, setNuevaOpcion] = useState("");
  const [opciones, setOpciones] = useState([]);

  const [cursos, setCursos] = useState([]);
  const [curso, setCurso] = useState(0);
  const [nombreCurso, setNombreCurso] = useState("");
  const [preguntas, setPreguntas] = useState([]);

  const [fecha_inicio, setFechaInicio] = useState("");
  const [hora_inicio, setHoraInicio] = useState("");
  const [fecha_fin, setFechaFin] = useState("");
  const [hora_final, setHoraFinal] = useState("");
  const [id_examen, setIdExamen] = useState(0);

  const [asignar, setAsignar] = useState(false);
  const [alumnos, setAlumnos] = useState([
    {
      carnet: '201909103',
      nombre: 'William',
      apellido: 'Borrayo'
    },
    {
      carnet: '201909103',
      nombre: 'William',
      apellido: 'Borrayo'
    },
    {
      carnet: '201909103',
      nombre: 'William',
      apellido: 'Borrayo'
    },
    {
      carnet: '201909103',
      nombre: 'William',
      apellido: 'Borrayo'
    },
    {
      carnet: '201909103',
      nombre: 'William',
      apellido: 'Borrayo'
    },
    {
      carnet: '201909103',
      nombre: 'William',
      apellido: 'Borrayo'
    },
    {
      carnet: '201909103',
      nombre: 'William',
      apellido: 'Borrayo'
    },
    {
      carnet: '201909103',
      nombre: 'William',
      apellido: 'Borrayo'
    },
    {
      carnet: '201909103',
      nombre: 'William',
      apellido: 'Borrayo'
    },
  ]);
  const [alumnosA, setAlumnosA] = useState([]);
  const [alumno, setAlumno] = useState({});


  useEffect(() => {
    // obtener los datos del maestro
    getMaestro(id_maestro).then((response) => {
      if (response.data.length > 0) {
        setNombreMaestro(response.data[0].nombre + " " + response.data[0].apellido)
      }
    });
    // obtener cursos que da el maestro
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

  const renderRedirect = () => {
    if (redirect) {
      return <Redirect to={'/maestros/examenes/' + id_maestro} />
    }
  }

  const convertirValidez = (validez) => {
    if (validez == 1) {
      return "SI";
    } else {
      return "NO";
    }
  }

  const agregarOpcion = (validez) => {
    setOpciones([...opciones, { texto: nuevaOpcion, validez: validez }]);
    setNuevaOpcion("");
  }

  const quitarOpcion = (row) => {
    const del = opciones.filter(opcion => opcion.texto !== row.texto);
    setOpciones(del);
  }

  const quitarPregunta = (row) => {
    const del = preguntas.filter(pregunta => pregunta.texto !== row.texto);
    setPreguntas(del);
  }

  const agregarPregunta = () => {
    setPreguntas([...preguntas, { texto: textoPregunta, valor: valor, opciones: opciones }])
    setTextoPreguna("¿?");
    setValor(0);
    setNuevaOpcion("");
    setOpciones([]);
  }

  const cambiarAlumno = (e) => {
    getAlumno(e.target.value).then((response) => {
      if (response.data.length > 0) {
        setAlumno(response.data[0]);
      }
    });
  }

  const cambiarCurso = (e) => {
    setCurso(e.target.value);

    getAlumnosCurso(id_maestro, e.target.value).then((response) => {
      setAlumnos(response.data);
      if (response.data.length > 0) {
        setAlumno(response.data[0]);
      }
    });

    cursos.forEach(curso => {
      if (curso.id_curso.toString() === e.target.value.toString()) {
        setNombreCurso(curso.nombre_curso);
      }
    });

    setAlumnosA([]);

  }

  const agregarAlumno = () => {
    setAlumnosA([...alumnosA, alumno]);
  }

  const quitarAlumno = (row) => {
    const del = alumnosA.filter(alumno => alumno.id_alumno !== row.id_alumno);
    setAlumnosA(del);
  }

  const CrearExamen = () => {
    getIdClase(id_maestro, curso).then((response) => {
      //hora_inicio, hora_final, id_clase, alumnosA, preguntas
      crearExamen({
        id_examen: id_examen,
        hora_inicio: fecha_inicio + " " + hora_inicio,
        hora_final: fecha_fin + " " + hora_final,
        id_clase: response.data[0].id_clase,
        alumnos: alumnosA, preguntas: preguntas
      }).then((response1) => {
        alert("Examen creado :)");
      }).catch(err => {
        alert("Error :(");
      });
    });
  }

  return (
    <>
      <Container style={{ overflowY: 'hidden' }}>
        <NavBar maestro={nombre_maestro} id_maestro={id_maestro} />
        {!asignar ?
          <>
            <div style={{ position: 'absolute', marginLeft: '2%', marginTop: '2%' }}>
              <Link to={"/maestros/examenes/" + id_maestro}>
                <button style={{ backgroundColor: 'transparent', border: 'none' }}>
                  <FontAwesomeIcon icon={faArrowLeft} color='white' size='2x' />
                </button>
              </Link>
            </div>
            <br /><br />
            <div className="d-flex justify-content-center align-items-center"
              style={{ color: 'black' }} >
              <div class='row' style={{ width: '90%', marginLeft: '5%' }}>
                <div class='col' >
                  <Card style={{ width: '90%', height: '100%' }}>
                    <Card.Header as="h5" >
                      {renderRedirect()}
                      <label className='label-examen'>Pregunta {preguntas.length + 1}</label>
                      <label className='label-publicacion' style={{ marginLeft: '45%' }}>Valor:</label>
                      <input type='text' className='label-publicacion' value={valor}
                        onChange={(e) => setValor(e.target.value)}
                        style={{
                          marginLeft: '2%', width: '8%',
                          marginRight: '2%', textAlign: 'center'
                        }}>
                      </input>
                    </Card.Header>
                    <Card.Body style={{ overflowY: 'auto' }}>
                      <Card.Text>
                        <label>Pregunta:</label><br />
                        <textarea style={{ width: '100%' }} rows="2"
                          value={textoPregunta} onChange={(e) => setTextoPreguna(e.target.value)}>
                        </textarea>
                        <br /><br />
                        Agregar Opcion:<br />
                        <input type="text" style={{ width: '57%' }}
                          value={nuevaOpcion} onChange={(e) => setNuevaOpcion(e.target.value)}>
                        </input>
                        <Button variant='success' style={{ marginLeft: '2%' }}
                          onClick={() => agregarOpcion(1)}>Correcta</Button>
                        <Button variant='danger' style={{ marginLeft: '2%' }}
                          onClick={() => agregarOpcion(0)}>Incorrecta</Button>
                        <br /><br />
                        <div class="bg-light container-tabla-respuestas" >
                          <Table striped bordered hover >
                            <thead>
                              <tr>
                                <th>Opcion</th>
                                <th>Correcta?</th>
                              </tr>
                            </thead>
                            <tbody>
                              {
                                opciones.map((log) =>
                                  <>
                                    <tr key={log.id_alumno} onClick={() => quitarOpcion(log)}>

                                      <td style={{ maxWidth: '150px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                        {log['texto']}
                                      </td>

                                      <td >
                                        {convertirValidez(log['validez'])}
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
                    <Card.Footer style={{ textAlign: 'right' }}>
                      <Button onClick={() => agregarPregunta()}>Agregar Pregunta</Button>
                    </Card.Footer>
                  </Card>
                </div>
                <div class='col'>
                  <Card style={{ width: '90%', height: '100%' }}>
                    <Card.Header as="h5" >
                      {renderRedirect()}
                      <label >ID Examen</label>
                      <input type='text' style={{ marginLeft: '2%' }} value={id_examen}
                        onChange={(e) => setIdExamen(e.target.value)}>
                      </input>
                    </Card.Header>
                    <Card.Body style={{ overflowY: 'auto' }}>
                      <Card.Text>
                        id_curso: <select style={{ marginLeft: '2%', marginRight: '2%' }}
                          onChange={(e) => cambiarCurso(e)}>
                          {
                            cursos.map((curso) =>
                              <option key={curso.id_curso} value={curso.id_curso}>{curso.id_curso}</option>
                            )}
                        </select>
                        Nombre del curso:
                        <input style={{ marginLeft: '2%' }} type="text" value={nombreCurso} /><br /><br />
                        Hora Inicio:
                        <input type='date' value={fecha_inicio} style={{ marginLeft: '2%' }}
                          onChange={(e) => setFechaInicio(e.target.value)}></input>
                        <input type='time' value={hora_inicio} style={{ marginLeft: '2%' }}
                          onChange={(e) => setHoraInicio(e.target.value)}></input><br /><br />

                        Hora Fin:
                        <input type='date' value={fecha_fin} style={{ marginLeft: '2%' }}
                          onChange={(e) => setFechaFin(e.target.value)}></input>
                        <input type='time' value={hora_final} style={{ marginLeft: '2%' }}
                          onChange={(e) => setHoraFinal(e.target.value)}></input><br /><br />
                        Preguntas:
                        <div class="bg-light container-tabla-asignados" >
                          <Table striped bordered hover >
                            <thead>
                              <tr>
                                <th>Pregunta</th>
                                <th>Valor(pts)</th>
                              </tr>
                            </thead>
                            <tbody>
                              {
                                preguntas.map((log) =>
                                  <>
                                    <tr key={log.id_alumno} onClick={() => quitarPregunta(log)}>

                                      <td style={{ maxWidth: '150px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                        {log['texto']}
                                      </td>

                                      <td >
                                        {log['valor']}
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
                    <Card.Footer style={{ textAlign: 'right' }}>
                      <Button variant='success' onClick={() => setAsignar(true)}>Asignar Alumnos a Examen</Button>
                    </Card.Footer>
                  </Card>
                </div>
              </div>
            </div>
          </>
          :
          <>
            <div style={{ position: 'absolute', marginLeft: '2%', marginTop: '2%' }}>
              <button style={{ backgroundColor: 'transparent', border: 'none' }}
                onClick={() => setAsignar(false)}>
                <FontAwesomeIcon icon={faArrowLeft} color='white' size='2x' />
              </button>
            </div>
            <div className="d-flex justify-content-center align-items-center container-publicacion" >
              <Card style={{ width: '100%', height: '90%' }}>
                <Card.Header as="h5" >
                  {renderRedirect()}
                  <label className='label-asign-examen '>Asignar Alumnos al Examen</label>
                </Card.Header>
                <Card.Body style={{ overflowY: 'auto' }}>
                  <Card.Text>
                    <label className='label-examen'>id_curso: {curso}</label>
                    <label className='label-asign-examen'>
                      Nombre del Curso: {nombreCurso}</label><br /><br />
                    id_alumno: <select style={{ marginLeft: '2%', marginRight: '2%' }}
                      onChange={(e) => cambiarAlumno(e)}>
                      {
                        alumnos.map((alumno) =>
                          <option key={alumno.id_alumno} value={alumno.id_alumno}>{alumno.id_alumno}</option>
                        )}
                    </select>
                    Nombre del alumno:
                    <input style={{ marginLeft: '2%' }} type="text" value={alumno.nombre + " " + alumno.apellido} />
                    <Button style={{ marginLeft: '4%' }} onClick={() => agregarAlumno()}>Agregar</Button><br /><br />
                    <div class="bg-light container-tabla-asignados" >
                      <Table striped bordered hover >
                        <thead>
                          <tr>
                            <th>Carnet</th>
                            <th>Nombre</th>
                          </tr>
                        </thead>
                        <tbody>
                          {
                            alumnosA.map((log) =>
                              <>
                                <tr key={log.id_alumno} onClick={() => quitarAlumno(log)}>
                                  <td >
                                    {log['carnet']}
                                  </td>

                                  <td style={{ maxWidth: '150px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                    {log['nombre']}{' '}{log['apellido']}
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
                <Card.Footer style={{ textAlign: 'right' }}>
                  <Button variant='success' onClick={() => CrearExamen()}>Crear Examen</Button>
                </Card.Footer>

              </Card>
            </div>
          </>
        }

      </Container>
    </>
  );
}

export default MaestrosEntregarActividad;