import React, { useState, useEffect } from 'react'
import { Link, Redirect, useParams } from 'react-router-dom';
import { Button } from "react-bootstrap";
import Table from 'react-bootstrap/Table';
import Card from 'react-bootstrap/Card';


import NavBar from './MaestrosNavBar';
import Container from './FondoMaestros';
import './maestro.css';

let publicaciones = [
  {
    id: 1,
    tema: 'tarea 1',
    descripcion: 'blabla',
    fecha: 'hoy'
  },
  {
    id: 2,
    tema: 'tarea 1',
    descripcion: 'blabla',
    fecha: 'hoy'
  },
  {
    id: 3,
    tema: 'tarea 1',
    descripcion: 'blabla',
    fecha: 'hoy'
  },
  {
    id: 4,
    tema: 'tarea 1',
    descripcion: 'blabla',
    fecha: 'hoy'
  },
  {
    id: 5,
    tema: 'tarea 1',
    descripcion: 'blabla',
    fecha: 'hoy'
  },
  {
    id: 6,
    tema: 'tarea 1',
    descripcion: 'blabla',
    fecha: 'hoy'
  },
  {
    id: 7,
    tema: 'tarea 1',
    descripcion: 'blabla',
    fecha: 'hoy'
  },
  {
    id: 8,
    tema: 'tarea 1',
    descripcion: 'blabla',
    fecha: 'hoy'
  },
  {
    id: 9,
    tema: 'tarea 1',
    descripcion: 'blabla',
    fecha: 'hoy'
  },
  {
    id: 10,
    tema: 'tarea 1',
    descripcion: 'blabla',
    fecha: 'hoy'
  },
  {
    id: 11,
    tema: 'tarea 1',
    descripcion: 'blabla',
    fecha: 'hoy'
  },
]

function MaestrosPublicacion() {
  const [maestro, setMaestro] = useState(useParams().identificacion)
  const [indice, setIndice] = useState(0);
  const [examen, setExam] = useState(0);
  const [redirect, setRedirect] = useState(false);
  //
  const [asunto, setAsunto] = useState("");
  const [descripcion, setDesc] = useState("");
  const [fecha, setFecha] = useState("");
  const [autor, setAutor] = useState("");

  useEffect(() => {
    // obtener los datos del estudiante
    // obtener publicaciones para el estudiante
  }, [])

  const handleRowClick = (row) => {
    alert(row);
    // obtener los datos para la publicacion seleccionada
    setExam(row);
    setRedirect(true);

  }

  const renderRedirect = () => {
    if (redirect) {
      return <Redirect to={'/maestros/examenes/' + maestro + '/' + examen} />
    }
  }

  return (
    <>

      <Container>
        <NavBar estudiante={maestro} />
        <br />
        <br />
        <div className='principal'>
          <div className="d-flex  justify-content-end align-items-center" style={{ marginLeft: '2%' }}>
            <h2>Examenes</h2>
            <div className="card-body d-flex justify-content-between align-items-center"
              style={{ marginLeft: '62.5%' }}>
              Grupo:
              <Button onClick={() => handleRowClick(0)}>{'<'}</Button>
              {(indice / 10) + 1}
              <Button onClick={() => handleRowClick(0)}>{'>'}</Button>
            </div>
          </div>
          <div class="bg-light container-tabla" >
            <Table striped bordered hover >
              <thead>
                <tr>
                  <th>Asunto</th>
                  <th colSpan={12}>Fecha</th>
                </tr>
              </thead>
              <tbody>
                {
                  publicaciones.slice(indice, indice + 10).map((log) =>
                    <>
                      <tr key={log.id} onClick={() => handleRowClick(log.id)}>

                        <td >
                          {log['tema']}
                        </td>

                        <td colSpan={12}>
                          {log['fecha']}
                        </td>
                      </tr>
                    </>
                  )}
              </tbody>
              {renderRedirect()}
            </Table>
          </div>
        </div>
      </Container>


    </>
  );
}

export default MaestrosPublicacion;