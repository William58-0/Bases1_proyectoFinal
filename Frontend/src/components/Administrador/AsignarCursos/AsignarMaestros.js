import React, { useState, useEffect } from 'react'

import { Redirect } from 'react-router-dom';
import { Button, Card } from "react-bootstrap";
import { Container } from '../AdminContainer'

import {
    editarUsuario, getUsuarios, getUsuario,
    getClases, getCursos, getCurso, getMaestros, getAlumnos,
    asignarCurso, crearCurso
} from '../../../endpoints/endpoints';


function AsignarMaestros() {
    const [tipo, setTipo] = useState("Maestro");
    const [usuario, setUsuario] = useState(0);
    const [nombre, setNombre] = useState("fdsafa");
    const [apellido, setApellido] = useState("fdassd");
    const [dpi_carnet, setDPICarnet] = useState("45646856");

    const [curso, setCurso] = useState("");
    const [cursos, setCursos] = useState([]);
    const [nombreCurso, setNombreCurso] = useState("");
    const [nuevoCurso, setNuevoCurso] = useState("");

    const [redirect, setRedirect] = useState(false);

    const [usuarios, setUsuarios] = useState([]);

    useEffect(() => {
        getCursos().then((response) => {
            setCursos(response.data)
            if (response.data.length > 0) {
                setNombreCurso(response.data[0].nombre_curso);
                setCurso(response.data[0].id_curso);
            }
        });

        getMaestros().then((response) => {
            setUsuarios(response.data);
            if (response.data.length > 0) {
                getOtroUsuario(response.data[0].id_maestro);
            }
        });


    }, [])

    const renderRedirect = () => {
        if (redirect) {
            return <Redirect to='/admin/asignarcursos' />
        }
    }

    // -------------------------------------------------------------------------- Editar un usuario

    const getOtroUsuario = (idUsuario) => {
        setUsuario(idUsuario);
        getUsuario(idUsuario, tipo).then((response) => {
            if (!(response.data.length > 0)) {
                console.log("error al tomar datos");
                setNombre("");
                setApellido("");
                setDPICarnet("");
                return;
            } else {
                var user = response.data[0];

                setNombre(user.nombre);
                setApellido(user.apellido);
                setDPICarnet(user.dpi);

            }
        }).catch(err => {
            console.log("error al tomar datos");
            setNombre("");
            setApellido("");
            setDPICarnet("");
            return;
        });
    }

    const cambiarUsuario = async (e) => {
        getOtroUsuario(e.target.value,);
    }

    const CrearCurso = (nuevoCurso) => {
        if (nuevoCurso !== "") {
            crearCurso(nuevoCurso).then((response) => {
                getCursos().then((response) => {
                    setCursos(response.data);
                    if (response.data.length > 0) {
                        setNombreCurso(response.data[0].nombre_curso);
                        setCurso(response.data[0].id_curso);
                    }
                });
                alert("curso creado!");
            });
        }
    }

    const cambiarCurso = async (e) => {
        setCurso(e.target.value);
        getCurso(e.target.value).then((response) => {
            if (response.data.length > 0) {
                setNombreCurso(response.data[0].nombre_curso);
            }
        });
    }

    const AsignarCurso = async (e) => {
        // hay que asignar el curso o la clase
        asignarCurso(tipo, usuario, curso).then((response) => {
            alert("Curso asignado");
        }).catch(err => {
            alert("Error :(");
        });

    }

    return (
        <>
            <Container>
                <div class="d-flex justify-content-center align-items-center container-publicacion">
                    <Card style={{ width: '100%', height: '63%' }}>
                        <Card.Header as="h5" >
                            {renderRedirect()}
                            <button className='boton-regreso-publicacion'
                                onClick={() => setRedirect(true)}> {"<"} </button>
                            <label className='label-publicacion'>Asignar Maestros a Cursos </label>
                        </Card.Header>
                        <Card.Body style={{ overflowY: 'auto' }}>


                            <div class='row'>
                                <div class='col' >
                                    Id de Maestro:
                                    <select style={{ marginLeft: '2%' }} onChange={(e) => cambiarUsuario(e)} >
                                        {
                                            usuarios.map((usuario) =>
                                                <option key={usuarios.id_maestro} value={usuario.id_maestro}>{usuario.id_maestro}</option>
                                            )}
                                    </select>
                                    <br /><br />
                                    <label>Registro</label><br />
                                    <input style={{ marginBottom: "2%" }} value={dpi_carnet} readOnly={true}
                                        onChange={(e) => setDPICarnet(e.target.value)}
                                        type="text" />
                                    <br /><br />
                                    <label>Nombre: </label><br />
                                    <input style={{ marginBottom: "2%" }}
                                        value={nombre + "  " + apellido} readOnly={true}
                                        type="text" />

                                </div>
                                <div class='col'>
                                    Asignar a curso:
                                    <select style={{ marginLeft: '2%' }} onChange={(e) => cambiarCurso(e)} >
                                        {
                                            cursos.map((curso) =>
                                                <option key={curso.id_curso} value={curso.id_curso}>{curso.id_curso}</option>
                                            )}
                                    </select>
                                    <br /><br />
                                    <label>Curso: </label><br />
                                    <input style={{ marginBottom: "2%" }} value={nombreCurso} readOnly={true}
                                        type="text" />

                                    <br /><br />
                                    <label>Nuevo Curso: </label><br />
                                    <input style={{ marginBottom: "2%" }} value={nuevoCurso} placeholder='Nombre'
                                        type="text" onChange={(e) => setNuevoCurso(e.target.value)} />
                                    <Button onClick={() => CrearCurso(nuevoCurso)} variant='success' style={{ marginLeft: '3%' }}>Crear</Button>
                                </div>
                            </div>
                            <br />


                        </Card.Body>
                        <Card.Footer style={{ textAlign: 'right' }}>
                            <Button style={{ float: 'right' }}
                                onClick={() => AsignarCurso()}>Asignar</Button>
                        </Card.Footer>
                    </Card>
                </div>
            </Container>
        </>
    );
}

export default AsignarMaestros;