import React, { useState, useEffect } from 'react'
import jsPDF from "jspdf";
import { Link, Redirect, useParams } from 'react-router-dom';
import "jspdf-autotable";
import { Button, Table } from "react-bootstrap";

import {
  getAlumno, getNotasAlumno, getClasesAlumno,
  getTotalAlumno, getMaestro, getCursosMaestro, getAlumnosCurso, getIdClase
} from '../../../endpoints/endpoints';

import NavBar from '../MaestrosNavBar';
import Container from '../FondoMaestros';
import '../maestro.css';

function AlumnosNotas() {
  const [id_maestro, setMaestro] = useState(1);
  const [nombre_maestro, setNombreMaestro] = useState("");

  const [alumnos, setAlumnos] = useState([]);

  const [id_alumno, setAlumno] = useState(1);
  const [nombre_alumno, setNombreAlumno] = useState("");
  const [cursos, setCursos] = useState([]);
  const [curso, setCurso] = useState(0);
  const [clase, setClase] = useState("");
  const [nombreCurso, setNombreCurso] = useState("");
  const [carnet, setCarnet] = useState("");
  const [total, setTotal] = useState(0);

  const [notas, setNotas] = useState([
    { titulo: "Parcial 1", puntuacion: "9" },
    { titulo: "Tarea 1", puntuacion: "2" },
    { titulo: "Tarea 2", puntuacion: "3" },
    { titulo: "Parcial 2", puntuacion: "10" },
    { titulo: "Parcial 2", puntuacion: "10" },
    { titulo: "Parcial 2", puntuacion: "10" },
    { titulo: "Parcial 2", puntuacion: "10" },
    { titulo: "Parcial 2", puntuacion: "10" },
    { titulo: "Parcial 2", puntuacion: "10" },
    { titulo: "Parcial 2", puntuacion: "10" },
    { titulo: "Parcial 2", puntuacion: "10" },
    { titulo: "Parcial 2", puntuacion: "10" },
    { titulo: "Parcial 2", puntuacion: "10" },
    { titulo: "Parcial 2", puntuacion: "10" },
  ]);

  useEffect(() => {
    // obtener datos del maestro
    getMaestro(id_maestro).then((response) => {
      if (response.data.length > 0) {
        setNombreMaestro(response.data[0].nombre + " " + response.data[0].apellido)
      }
    });

    // obtener los cursos del maestro
    getCursosMaestro(id_maestro).then((response) => {
      setCursos(response.data);
      if (response.data.length > 0) {
        setCurso(response.data[0].id_curso);
        setNombreCurso(response.data[0].nombre_curso);

        // obtener los alumnos del curso
        getAlumnosCurso(id_maestro, response.data[0].id_curso).then((response1) => {
          setAlumnos(response1.data);
          if (response1.data.length > 0) {
            setAlumno(response1.data[0].id_alumno);
            setNombreAlumno(response1.data[0].nombre + " " + response1.data[0].apellido);
            setCarnet(response1.data[0].carnet);

            // obtener las notas para ese alumno
            getNotasAlumno(id_maestro, response1.data[0].id_clase).then((response2) => {
              setNotas(response2.data);
            });

            // obtener el total de puntos para el alumno
            getTotalAlumno(response1.data[0].id_alumno, response1.data[0].id_clase).then((response3) => {
              if (response3.data.length === 1) {
                if (response3.data[0].total !== null) {
                  setTotal(response3.data[0].total);
                } else {
                  setTotal(0);
                }
              } else if (response3.data.length === 2) {
                if (response3.data[0].total !== null && response3.data[1].total !== null) {
                  setTotal(response3.data[0].total + response3.data[1].total);
                } else {
                  setTotal(0);
                }
              }
            });
          }
        });
      }
    });

  }, [])

  const exportPDF = () => {
    const unit = "pt";
    const size = "A4"; // Use A1, A2, A3 or A4
    const orientation = "portrait"; // portrait or landscape

    const marginLeft = 40;
    const doc = new jsPDF(orientation, unit, size);

    doc.setFontSize(15);

    const title = "Reporte de Notas\nCurso: " + nombreCurso + "\nCarnet Estudiante: " + carnet;

    const headers = [["Actividad", "Nota"]];

    var datoos = notas;
    datoos.push({ "titulo": "Total", puntuacion: total });

    const data = datoos.map(elt => [elt.titulo || 'Examen ID: ' + elt.id_examen, mostrarPuntuacion(elt.puntuacion)]);

    let content = {
      startY: 80,
      head: headers,
      body: data
    };

    doc.text(title, marginLeft, 40);
    doc.autoTable(content);
    doc.save("reporteNotas.pdf")
  }

  const cambiarCurso = (e) => {
    var objeto = JSON.parse(e.target.value);
    setCurso(objeto.id_curso);
    setNombreCurso(objeto.nombre_curso);
    // obtener los alumnos del curso
    getAlumnosCurso(id_maestro, objeto.id_curso).then((response1) => {
      setAlumnos(response1.data);
      if (response1.data.length > 0) {
        setAlumno(response1.data[0].id_alumno);
        setNombreAlumno(response1.data[0].nombre + " " + response1.data[0].apellido);
        setCarnet(response1.data[0].carnet);

        // obtener las notas para ese alumno
        getNotasAlumno(id_maestro, response1.data[0].id_clase).then((response2) => {
          setNotas(response2.data);
        });

        // obtener el total de puntos para el alumno
        getTotalAlumno(response1.data[0].id_alumno, response1.data[0].id_clase).then((response3) => {
          if (response3.data.length === 1) {
            if (response3.data[0].total !== null) {
              setTotal(response3.data[0].total);
            } else {
              setTotal(0);
            }
          } else if (response3.data.length === 2) {
            if (response3.data[0].total !== null && response3.data[1].total !== null) {
              setTotal(response3.data[0].total + response3.data[1].total);
            } else {
              setTotal(0);
            }
          }
        });
      }
    });

  }

  const cambiarAlumno = (e) => {
    var objeto = JSON.parse(e.target.value);
    setAlumno(objeto.id_alumno);
    setNombreAlumno(objeto.nombre + " " + objeto.apellido);
    setCarnet(objeto.carnet);

    // obtener las notas para ese alumno
    getNotasAlumno(objeto.id_alumno, objeto.id_clase).then((response2) => {
      setNotas(response2.data);
    });

    // obtener el total de puntos para el alumno
    getTotalAlumno(objeto.id_alumno, objeto.id_clase).then((response3) => {
      console.log("pasaa aquiii");
      console.log(response3)
      if (response3.data.length === 1) {
        if (response3.data[0].total !== null) {
          setTotal(response3.data[0].total);
        } else {
          setTotal(0);
        }
      } else if (response3.data.length === 2) {
        if (response3.data[0].total !== null && response3.data[1].total !== null) {
          setTotal(response3.data[0].total + response3.data[1].total);
        } else {
          setTotal(0);
        }
      }
    });
  }

  const mostrarPuntuacion = (puntuacion) => {
    if (puntuacion === '' || puntuacion === null) {
      return "pendiente";
    } else {
      return puntuacion;
    }
  }

  return (
    <Container >
      <NavBar maestro={nombre_maestro} id_maestro={id_maestro} />
      <br />
      <div className='principal'>
        <h1 style={{ textAlign: 'center' }}>Control de Notas</h1><br />
        <div className="d-flex  justify-content-start align-items-center" style={{ marginLeft: '2%' }}>
          Materia:
          <select style={{ marginLeft: '2%', marginRight: '2%' }} onChange={(e) => cambiarCurso(e)} >
            {
              cursos.map((curso) =>
                <option key={curso.id_clase} value={JSON.stringify(curso)}>{curso.nombre_curso}</option>
              )}
          </select>

          Id Alumno:
          <select style={{ marginLeft: '2%' }} onChange={(e) => cambiarAlumno(e)} >
            {
              alumnos.map((alumno) =>
                <option key={alumno.id_alumno} value={JSON.stringify(alumno)}>{alumno.id_alumno}</option>
              )}
          </select>
          <input style={{ marginLeft: '2%' }} value={nombre_alumno}
            onChange={(e) => setNombreAlumno(e.target.value)}></input>

          <div style={{ marginLeft: 'auto', marginRight: '1.5%' }}>
            <Button variant='success' onClick={() => exportPDF()}>Descargar PDF</Button>
          </div>

        </div>
        <br />
        <div class='container-tabla-notas'>
          <Table striped bordered hover variant='light' >
            <thead>
              <tr>
                <th>Actividad</th>
                <th>Nota</th>
              </tr>
            </thead>
            <tbody >
              {
                notas.map((nota) =>
                  <>
                    <tr key={nota.id}>
                      <td>
                        {nota['titulo'] || 'Examen ID:   ' + nota['id_examen']}
                      </td>
                      <td>
                        {mostrarPuntuacion(nota['puntuacion'])}
                      </td>
                    </tr>
                  </>
                )}

            </tbody>
          </Table>
        </div>
        <br />
        <label class='bg-primary' style={{
          fontWeight: 'bold', fontSize: 'large',
          float: 'right', marginRight: '2%',
          width: ' 15%', textAlign: 'center',
          borderRadius: '5px'
        }}>
          Total: {total}
        </label>

        <br />

      </div>

    </Container>
  );

}

export default AlumnosNotas;