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
  getAlumno, getEntregas
} from '../../endpoints/endpoints';

import NavBar from './MaestrosNavBar';
import Container from './FondoMaestros';
import './maestro.css';


function MaestrosEntregas() {
  const [id_maestro, setIdMaestro] = useState(1);
  const [nombre_maestro, setNombreMaestro] = useState("")
  const [entregas, setEnts] = useState([])
  const [entrega, setEnt] = useState([])



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
    // obtener entregas para el maestro
    getEntregas(id_maestro).then((response) => {
      setEnts(response.data);
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
      if (curso.id_curso.toString() === e.target.value.toString()) {
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

  const CalificarEntrega = (row) => {
    // obtener los datos para la actividad seleccionada
    setEnt(row.id_asignacion_actividad);
    setRedirect(true);

  }

  const regresar = () => {
    setTitulo("");
    setDesc("");
    setValor(0);
    setFechaE("");
    setAlumnosA([]);
    setCrear(false);
  }

  const renderRedirect = () => {
    if (redirect) {
      return <Redirect to={'/maestros/entregas/' + id_maestro + '/' + entrega} />
    }
  }

  return (
    <>
      <Container>
        <NavBar maestro={nombre_maestro} id_maestro={id_maestro} />
        <>
          <br />
          <br />
          <div className='principal'>
            <div className="d-flex  justify-content-end align-items-center" style={{ marginLeft: '2%' }}>
              <h2>Entregas</h2>
              <div className="card-body d-flex justify-content-between align-items-center"
                style={{ marginLeft: '66.2%' }}>
                Grupo:
                <Button onClick={() => CalificarEntrega(0)}>{'<'}</Button>
                {(indice / 8) + 1}
                <Button onClick={() => CalificarEntrega(0)}>{'>'}</Button>
              </div>
            </div>
            <div class="bg-light container-tabla-publicacion" >
              <Table striped bordered hover >
                <thead>
                  <tr>
                    <th>Alumno</th>
                    <th>Curso</th>
                    <th>Título</th>
                    <th>Punteo</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    entregas.slice(indice, indice + 8).map((log) =>
                      <>
                        <tr key={log.id} onClick={() => CalificarEntrega(log)}>

                          <td style={{ maxWidth: '150px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                            {log['carnet']}
                          </td>
                          <td style={{ maxWidth: '150px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                            {log['nombre_curso']}
                          </td>

                          <td style={{ maxWidth: '150px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                            {log['titulo']}
                          </td>

                          <td >
                            {log['puntuacion']}
                          </td>

                        </tr>
                      </>
                    )}
                </tbody>
                {renderRedirect()}
              </Table>

            </div>
          </div>
        </>
      </Container>


    </>
  );
}

export default MaestrosEntregas;