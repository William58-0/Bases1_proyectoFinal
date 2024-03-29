import React, { useState, useEffect } from 'react'
import { useParams, Redirect, Link } from 'react-router-dom';
import { Button } from "react-bootstrap";
import { Table, Card } from 'react-bootstrap';

import {
  getAlumno, getPregunta, getOpciones, guardarNotaExamen
} from '../../endpoints/endpoints';

import NavBar from './AlumnosNavBar';
import Container from './FondoAlumnos';
import './alumno.css';

function AlumnosEntregarActividad() {
  const [id_alumno, setIdAlumno] = useState(useParams().identificacion);
  const [nombre_alumno, setNombreAlumno] = useState("");
  const [examen, setExam] = useState(useParams().examen);
  const [pregunta, setPregunta] = useState(1);
  const [textoPregunta, setTextoPregunta] = useState("");
  const [valorPregunta, setValorPregunta] = useState(0);
  const [puntuacion, setPuntuacion] = useState(0);
  const [totalExamen, setTotalExamen] = useState(0);

  const [opciones, setOpciones] = useState([]);

  const [redirect, setRedirect] = useState(false);

  const [respuestas, setRespuestas] = useState([]);

  const [terminado, setTerminado] = useState(false);

  useEffect(() => {
    // obtener los datos del alumno
    getAlumno(id_alumno).then((response) => {
      if (response.data.length > 0) {
        setNombreAlumno(response.data[0].nombre + " " + response.data[0].apellido)
      }
    });

    // obtener primer pregunta del examen
    getPregunta(examen, 1).then((response) => {

      setValorPregunta(response.data.valor);
      setTextoPregunta(response.data.texto);

      if (response.data !== "") {
        getOpciones(response.data.id_pregunta).then((response1) => {
          setOpciones(response1.data);
        });

      } else {
        setTextoPregunta("MOSTRAR LA PUNTUACION");
        setTerminado(true);
      }

    });
  }, [])

  const siguiente = async () => {
    // calcular las buenas que tiene y sumarle los puntos correspondientes
    if (valorPregunta !== 0) {
      // la cantidad de opciones buenas
      const correctas = opciones.filter(opcion => opcion.validez === 1);

      let valorPorOpcion = (valorPregunta / correctas.length);

      // cantidad de respuestas buenas
      const buenas = respuestas.filter(respuesta => respuesta.validez === 1);

      let puntuacionPregunta = 0;
      if (buenas.length === correctas.length) {
        puntuacionPregunta = valorPregunta;
      } else {
        puntuacionPregunta = valorPorOpcion * buenas.length;
      }

      setPuntuacion(puntuacion + puntuacionPregunta);
      setTotalExamen(totalExamen + valorPregunta);
      setRespuestas([]);
    }

    // obtener siguiente pregunta del examen
    getPregunta(examen, pregunta + 1).then((response) => {
      setValorPregunta(response.data.valor);
      setTextoPregunta(response.data.texto);

      if (response.data !== "") {
        getOpciones(response.data.id_pregunta).then((response1) => {
          setOpciones(response1.data);
        });

      } else {


        setTextoPregunta("MOSTRAR LA PUNTUACION");
        setTerminado(true);
      }

    });
    setPregunta(pregunta + 1);
  }


  const renderRedirect = () => {

    if (redirect) {
      return <Redirect to={'/alumnos/examenes/' + id_alumno} />
    }
  }

  const seleccionarOpcion = (event) => {
    var objeto = JSON.parse(event.target.value);

    var updatedList = [...respuestas];
    if (event.target.checked) {
      updatedList = [...respuestas, objeto];
    } else {
      updatedList.splice(respuestas.indexOf(objeto), 1);
    }
    setRespuestas(updatedList);
  };

  const regresarExamenes = () => {
    // guardar la nota del estudiante
    guardarNotaExamen(examen, id_alumno, puntuacion).then((response) => {
      alert("Nota de examen guardada :)");
      setRedirect(true);
    }).catch(err => {
      alert("Error :(");
    });
  };



  return (
    <>
      <Container>
        <NavBar alumno={nombre_alumno} id_alumno={id_alumno} />
        <div class="d-flex justify-content-center align-items-center container-publicacion">
          <Card style={{ width: '100%', height: '80%' }}>
            {!terminado ?
              <>
                <Card.Header as="h5" >
                  {renderRedirect()}

                  <button className='boton-regreso-publicacion'
                    onClick={() => setRedirect(true)}> {"<"} </button>
                  <label className='label-publicacion'>Pregunta {pregunta}</label>


                </Card.Header>
                <Card.Body style={{ overflowY: 'auto' }}>
                  <Card.Text>
                    {textoPregunta}
                  </Card.Text>
                  {opciones.map((opcion) => (
                    <div key={opcion.id_opcion}>
                      <input value={JSON.stringify(opcion)} type="checkbox" onChange={seleccionarOpcion} />
                      <span style={{ marginLeft: '2%' }}>{opcion.texto}</span>
                    </div>
                  ))}

                </Card.Body>

                <Card.Footer>
                  <Button onClick={() => siguiente()} style={{ float: 'right' }}> Siguiente</Button>
                </Card.Footer>
              </>
              :
              <>
                <Card.Header as="h5" >
                  {renderRedirect()}

                  <button className='boton-regreso-publicacion'
                    onClick={() => setRedirect(true)}> {"<"} </button>
                  <label className='label-publicacion'>Examen Terminado</label>

                </Card.Header>
                <Card.Body style={{ overflowY: 'auto' }}>
                  <Card.Text>
                    Puntos: {puntuacion.toFixed(2)} / {totalExamen}<br /><br />
                    <div style={{ fontFamily: 'comic sans ms', textAlign: 'center', margin: 'auto' }} >
                      <label style={{ fontSize: '30px' }}>Nota:</label>
                      <div style={{ textAlign: 'center', fontSize: '110px' }}>
                        {((puntuacion / totalExamen) * 100).toFixed(2)} %
                      </div>
                    </div>
                  </Card.Text>
                </Card.Body>
                <Card.Footer>

                  <Button variant='success' style={{ float: 'right' }}
                    onClick={() => regresarExamenes()}> Regresar a Examenes</Button>
                </Card.Footer>
              </>
            }

          </Card>
        </div>
      </Container>
    </>
  );
}

export default AlumnosEntregarActividad;