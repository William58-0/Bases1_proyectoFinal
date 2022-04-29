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

function MaestrosExamenes() {
  //const [id_maestro, setMaestro] = useState(useParams().identificacion)
  const [id_maestro, setMaestro] = useState(1);
  const [nombre_maestro, setNombreMaestro] = useState("");

  const [indice, setIndice] = useState(0);
  const [examenes, setExams] = useState([]);
  const [redirect, setRedirect] = useState(false);
  //

  useEffect(() => {
    // obtener los datos del maestro
    getMaestro(id_maestro).then((response) => {
      if (response.data.length > 0) {
        setNombreMaestro(response.data[0].nombre + " " + response.data[0].apellido)
      }
    });
    /*
    // obtener publicaciones para el maestro
    getExamenesMaestro(id_maestro).then((response) => {
      setExams(response.data);
    });

    */
  }, [])

  const renderRedirect = () => {
    if (redirect) {
      return <Redirect to={'/maestros/examenes/crear/' + id_maestro} />
    }
  }

  return (
    <>
      <Container>
        <NavBar maestro={nombre_maestro} id_maestro={id_maestro} />
        <br />
        <br />
        <div className='principal'>
          <div className="d-flex  justify-content-end align-items-center" style={{ marginLeft: '2%' }}>
            <h2>Examenes</h2>
            <div className="card-body d-flex justify-content-between align-items-center"
              style={{ marginLeft: '60%' }}>
              Grupo:
              <Button >{'<'}</Button>
              {(indice / 8) + 1}
              <Button >{'>'}</Button>
            </div>
          </div>
          <div class="bg-light container-tabla-publicacion" >
            {renderRedirect()}
            <Table striped bordered hover >
              <thead>
                <tr>
                  <th >ID Examen</th>
                  <th >Publicacion</th>
                  <th >Curso</th>
                  <th >Hora Inicio</th>
                  <th >Hora Fin</th>
                </tr>
              </thead>
              <tbody>
                {
                  examenes.slice(indice, indice + 8).map((log) =>
                    <>
                      <tr key={log.id}>

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
            <Button style={{ float: 'right', marginRight: '2%' }} onClick={() => setRedirect(true)}>Crear Examen</Button>
          </div>
        </div>
      </Container>
    </>
  );
}

export default MaestrosExamenes;