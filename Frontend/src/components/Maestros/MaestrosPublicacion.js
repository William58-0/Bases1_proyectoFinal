import React, { useState, useEffect } from 'react'
import { Link, Redirect, useParams } from 'react-router-dom';
import { Button } from "react-bootstrap";
import Table from 'react-bootstrap/Table';
import Card from 'react-bootstrap/Card';

import {
  crearPublicacion, getPublicacionesMaestro,
  getCurso, getCursosMaestro
} from '../../endpoints/endpoints';


import NavBar from './MaestrosNavBar';
import Container from './FondoMaestros';
import './maestro.css';

/*
let publicaciones = [
  {
    id: 1,
    curso: 'blablfdasssssssssssssssssssblablfdablablfdasssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssasssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssassssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssa',
    descripcion: 'blablfdassssssssssssssssssssssssssblablfdasssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssasssssssssssssssssssssssssssssssssssssssssssssssssssssssa' +
      'blablfdasssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssa',
    fecha: 'hoy'
  },
  {
    id: 2,
    curso: 'matematicas',
    descripcion: 'blabla',
    fecha: 'hoy'
  },
  {
    id: 3,
    curso: 'matematicas',
    descripcion: 'blabla',
    fecha: 'hoy'
  },
  {
    id: 4,
    curso: 'matematicas',
    descripcion: 'blabla',
    fecha: 'hoy'
  },
  {
    id: 5,
    curso: 'matematicas',
    descripcion: 'blabla',
    fecha: 'hoy'
  },
  {
    id: 6,
    curso: 'matematicas',
    descripcion: 'blabla',
    fecha: 'hoy'
  },
  {
    id: 7,
    curso: 'matematicas',
    descripcion: 'blabla',
    fecha: 'hoy'
  },
  {
    id: 8,
    curso: 'matematicas',
    descripcion: 'blabla',
    fecha: 'hoy'
  },
  {
    id: 9,
    curso: 'matematicas',
    descripcion: 'blabla',
    fecha: 'hoy'
  },
  {
    id: 10,
    curso: 'matematicas',
    descripcion: 'blabla',
    fecha: 'hoy'
  },
  {
    id: 11,
    curso: 'matematicas',
    descripcion: 'blabla',
    fecha: 'hoy'
  },
]
*/

function MaestrosPublicacion() {
  const [maestro, setMaestro] = useState(useParams().identificacion)
  const [indice, setIndice] = useState(0);
  const [publicacion, setPub] = useState(0);
  const [publicaciones, setPubs] = useState([]);
  const [redirect, setRedirect] = useState(false);
  //
  const [crear, setCrear] = useState("");
  const [curso, setCurso] = useState("");
  const [descripcion, setDesc] = useState("");
  const [fecha, setFecha] = useState("");


  useEffect(() => {
    // obtener los datos del maestro

    // obtener publicaciones para el maestro
    getPublicacionesMaestro({ id_maestro: 449 }).then((response) => {
      setPubs(response.data.datos);
      //console.log(response.data.datos)
    });

    // obtener los cursos para el maestro
    getCursosMaestro({ id_maestro: 449, id_curso: 4 }).then((response) => {
      //setPubs(response.data.datos);
      //console.log(response.data.datos)
    });
  }, [])



  const renderRedirect = () => {
    if (redirect) {
      return <Redirect to={'/maestros/publicaciones/' + maestro + '/' + publicacion} />
    }
  }



  const CrearPublicacion = () => {
    getCurso({ id_maestro: 449, id_curso: 4 }).then((response) => {
      //setCurso(response.data.datos.datos[0].id_curso);
      console.log("CLASEEEE");
      console.log(response.data.datos[0].id_curso);
      var curso = response.data.datos[0].id_curso;

      // obtener los datos para la publicacion seleccionada
      crearPublicacion({ descripcion: descripcion, id_curso: curso }).then((response) => {
        console.log("CLASEEEE");
        
      });
    });



    setCrear(false);
  }

  const verPublicacion = (row) => {
    alert(row);
    setCurso(row.curso);
    setDesc(row.descripcion);
    setFecha(row.fecha);
    // obtener los datos para la publicacion seleccionada
    setPub(row);
  }

  const editarPublicacion = (row) => {
    alert(row);
    // obtener los datos para la publicacion seleccionada
    setPub(row);
    setRedirect(true);

  }

  const handleChange = (e) => {
    alert(e.target.value);
    //setTipo(e.target.value);
    //setTipo(e.target.value);
  }

  return (
    <>
      <Container>
        <NavBar maestro={maestro} />
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
                    Curso: <select style={{ marginLeft: '2%' }} onChange={(e) => handleChange(e)} >
                      <option key={'Maestro'} value={'Maestro'}>Matematica</option>
                      <option key={'Alumno'} value={'Alumno'}>Alumno</option>
                      <option key={'Administrador'} value={'Administrador'}>Administrador</option>
                    </select>
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
                  <Button onClick={() => verPublicacion({})}>{'<'}</Button>
                  {(indice / 8) + 1}
                  <Button onClick={() => verPublicacion({})}>{'>'}</Button>
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
                          <tr key={log.id} onClick={() => editarPublicacion(log.id)}>

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