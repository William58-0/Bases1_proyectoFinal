import React, { useState, useEffect } from 'react'
import { Link, Redirect, useParams } from 'react-router-dom';
import { Button } from "react-bootstrap";
import Table from 'react-bootstrap/Table';


import {
  getMaestro, getEntregas
} from '../../endpoints/endpoints';

import NavBar from './MaestrosNavBar';
import Container from './FondoMaestros';
import './maestro.css';


function MaestrosEntregas() {
  const [id_maestro, setIdMaestro] = useState(1);
  const [nombre_maestro, setNombreMaestro] = useState("");
  const [entregas, setEnts] = useState([]);
  const [entrega, setEnt] = useState(0);

  const [indice, setIndice] = useState(0);
  const [redirect, setRedirect] = useState(false);

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

  const CalificarEntrega = async (row) => {
    // obtener los datos para la actividad seleccionada
    await setEnt(row.id_asignacion_actividad);
    setRedirect(true);

  }

  const renderRedirect = () => {
    if (redirect) {
      return <Redirect to={'/maestros/entregas/' + id_maestro + '/' + entrega} />
    }
  }

  const siguienteGrupo = () => {
    var index = indice;
    var ents = entregas;
    if (index + 8 <= ents.length) {
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
        <>
          <br />
          <br />
          <div className='principal'>
            <div className="d-flex  justify-content-end align-items-center" style={{ marginLeft: '2%' }}>
              <h2>Entregas</h2>
              <div className="card-body d-flex justify-content-between align-items-center"
                style={{ marginLeft: '66.2%' }}>
                Grupo:
                <Button onClick={() => anteriorGrupo()}>{'<'}</Button>
                {(indice / 8) + 1}
                <Button onClick={() => siguienteGrupo()}>{'>'}</Button>
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