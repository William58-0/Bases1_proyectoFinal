import React, { useState, useEffect } from 'react'
import jsPDF from "jspdf";
import { Link, Redirect, useParams } from 'react-router-dom';
import "jspdf-autotable";
import { Button, Table } from "react-bootstrap";

import {
  getAlumno, getNotasAlumno, getClasesAlumno,
  getTotalAlumno
} from '../../endpoints/endpoints';

import NavBar from './AlumnosNavBar';
import Container from './FondoAlumnos';
import './alumno.css';

function AlumnosNotas() {

  const [id_alumno, setIdAlumno] = useState(1);
  const [nombre_alumno, setNombreAlumno] = useState("");
  const [cursos, setCursos] = useState([]);
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
    // obtener los datos del alumno
    getAlumno(id_alumno).then((response) => {
      if (response.data.length > 0) {
        setNombreAlumno(response.data[0].nombre + " " + response.data[0].apellido);
        setCarnet(response.data[0].carnet);
      }
    });
    //obtener cursos del alumno
    getClasesAlumno(id_alumno).then((response) => {
      setCursos(response.data);
      if (response.data.length > 0) {
        // obtener las notas del alumno
        console.log(response.data);
        setClase(response.data[0].id_clase);
        setNombreCurso(response.data[0].nombre_curso);
        getNotasAlumno(id_alumno, response.data[0].id_clase).then((response1) => {
          setNotas(response1.data);
        });

        // obtener el total de puntos para el alumno
        getTotalAlumno(id_alumno, response.data[0].id_clase).then((response2) => {
          if (response2.data.length > 0) {
            if (response2.data[0].total !== null) {
              setTotal(response2.data[0].total);
            } else {
              setTotal(0);
            }
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

    const title = "Reporte de Notas\nCurso: " + nombreCurso + "\nEstudiante: " + carnet;

    const headers = [["Actividad", "Nota"]];

    var datoos = notas;
    datoos.push({ "titulo": "Total", puntuacion: total });

    const data = datoos.map(elt => [elt.titulo, elt.puntuacion]);

    let content = {
      startY: 80,
      head: headers,
      body: data
    };

    doc.text(title, marginLeft, 40);
    doc.autoTable(content);
    doc.save("report.pdf")
  }

  const cambiarCurso = (e) => {
    var objeto = JSON.parse(e.target.value);
    alert(objeto.nombre_curso);
    setClase(objeto.id_clase);
    setNombreCurso(objeto.nombre_curso);
    getNotasAlumno(id_alumno, objeto.id_clase).then((response) => {
      setNotas(response.data);
    });
    getTotalAlumno(id_alumno, objeto.id_clase).then((response2) => {
      if (response2.data.length > 0) {
        if (response2.data[0].total !== null) {
          setTotal(response2.data[0].total);
        } else {
          setTotal(0);
        }
      }
    });

  }

  return (
    <Container >
      <NavBar alumno={nombre_alumno} id_alumno={id_alumno} />
      <br />
      <div className='principal'>
        <h1 style={{ textAlign: 'center' }}>Control de Notas</h1>
        <div className="d-flex  justify-content-start align-items-center" style={{ marginLeft: '2%' }}>
          Materia:
          <select style={{ marginLeft: '2%' }} onChange={(e) => cambiarCurso(e)} >
            {
              cursos.map((curso) =>
                <option key={curso.id_clase} value={JSON.stringify(curso)}>{curso.nombre_curso}</option>
              )}
          </select>

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
                    <tr key={nota.id_asignacion_actividad}>
                      <td>
                        {nota['titulo']}
                      </td>
                      <td>
                        {nota['puntuacion']}
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