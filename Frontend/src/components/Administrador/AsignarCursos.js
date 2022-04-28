import React, { useState, useEffect } from 'react'

import { Redirect } from 'react-router-dom';
import { Button, Card } from "react-bootstrap";
import { Container } from './AdminContainer'

import {
    editarUsuario, getUsuarios, getUsuario,
    getClases, getCursos, getCurso, getMaestros, getAlumnos,
    asignarCurso, crearCurso
} from '../../endpoints/endpoints';


function AsignarCursos() {
    const [tipo, setTipo] = useState("Maestro");
    const [usuario, setUsuario] = useState(0);
    const [nombre, setNombre] = useState("fdsafa");
    const [apellido, setApellido] = useState("fdassd");
    const [dpi_carnet, setDPICarnet] = useState("45646856");

    const [clases, setClases] = useState([]);
    const [curso, setCurso] = useState("");
    const [cursos, setCursos] = useState([]);
    const [nombreCurso, setNombreCurso] = useState("");
    const [nuevoCurso, setNuevoCurso] = useState("");
    const [clase, setClase] = useState("");
    const [maestro, setMaestro] = useState("");

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

        getClases().then((response) => {
            setClases(response.data);
            if (response.data.length > 0) {
                setClase(response.data[0].id_clase);
                setMaestro(response.data[0].nombre + " " + response.data[0].apellido);
            }
        });

        if (tipo === 'Maestro') {
            getMaestros().then((response) => {
                setUsuarios(response.data);
            });
        } else {
            getAlumnos().then((response) => {
                setUsuarios(response.data);
            });
        }

        getOtroUsuario(1, tipo);

    }, [])

    const renderRedirect = () => {
        if (redirect) {
            return <Redirect to='/admin' />
        }
    }

    // -------------------------------------------------------------------------- Editar un usuario

    const getOtroUsuario = (idUsuario, tipo) => {
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

                if (tipo === 'Maestro') {
                    setDPICarnet(user.dpi);
                } else {
                    setDPICarnet(user.carnet);
                }
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
        getOtroUsuario(e.target.value, tipo);
    }

    const cambiarTipo = (e) => {
        if (tipo == 'Maestro') {
            // pasara a alumno
            setClase(curso);
            getClases().then((response) => {
                setClases(response.data);
                setMaestro("");
                setNombreCurso("");
                response.data.forEach(clase => {
                    if (clase.id_clase.toString() === curso.toString()) {
                        
                        setMaestro(clase.nombre + " " + clase.apellido);
                        setNombreCurso(clase.nombre_curso)
                        return undefined;
                    }
                });
            });
        } else {
            // pasara a maestro
            setCurso(clase);
            getCurso(clase).then((response) => {
                if (response.data.length > 0) {
                    setNombreCurso(response.data[0].nombre_curso);
                }else{
                    setNombreCurso("");
                }
            });

        }
        setTipo(e.target.value);
        var type = e.target.value;
        getUsuarios(e.target.value).then((response) => {
            setUsuarios(response.data);
            getOtroUsuario(usuario, type);
        });

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

    const cambiarClase = async (e) => {
        setClase(e.target.value);
        clases.forEach(clase => {
            if (clase.id_clase.toString() === e.target.value.toString()) {
                setMaestro(clase.nombre + " " + clase.apellido);
                setNombreCurso(clase.nombre_curso)
                return undefined;
            }
        });
    }

    const AsignarCurso = async (e) => {
        // hay que asignar el curso o la clase
        if (tipo === 'Maestro') {
            asignarCurso(tipo, usuario, curso).then((response) => {
                alert("Curso asignado");
            }).catch(err => {
                alert("Error :(");
            });
        } else {
            asignarCurso(tipo, usuario, clase).then((response) => {
                alert("Clase asignada");
            }).catch(err => {
                alert("Error :(");
            });
        }
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
                            <label className='label-publicacion'>Asignar Cursos </label>
                            <select style={{ float: 'right' }} onChange={(e) => cambiarTipo(e)} >
                                <option key={'Maestro'} value={'Maestro'}>Maestro</option>
                                <option key={'Alumno'} value={'Alumno'}>Alumno</option>
                            </select>
                        </Card.Header>
                        <Card.Body style={{ overflowY: 'auto' }}>


                            <div class='row'>
                                <div class='col' >
                                    Id de {tipo}:
                                    <select style={{ marginLeft: '2%' }} onChange={(e) => cambiarUsuario(e)} >
                                        {
                                            usuarios.map((usuario) =>
                                                <>
                                                    {
                                                        tipo === 'Maestro' ?
                                                            <option key={usuarios.id_maestro} value={usuario.id_maestro}>{usuario.id_maestro}</option>
                                                            :
                                                            <option key={usuarios.id_alumno} value={usuario.id_alumno}>{usuario.id_alumno}</option>
                                                    }
                                                </>
                                            )}
                                    </select>
                                    <br /><br />
                                    <label>{tipo === "Alumno" ? 'Carnet' : 'Registro'} </label><br />
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
                                    {
                                        tipo === 'Maestro' ?
                                            <>
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
                                            </> :
                                            <>
                                                Asignar a clase:
                                                <select style={{ marginLeft: '2%' }} onChange={(e) => cambiarClase(e)} >
                                                    {
                                                        clases.map((clase) =>
                                                            <option key={clase.id_clase} value={clase.id_clase}>{clase.id_clase}</option>
                                                        )}
                                                </select>
                                                <br /><br />
                                                <label>Curso: </label><br />
                                                <input style={{ marginBottom: "2%" }} value={nombreCurso} readOnly={true}
                                                    type="text" /><br /><br />
                                                <label>Maestro: </label><br />
                                                <input style={{ marginBottom: "2%" }} value={maestro} readOnly={true}
                                                    type="text" />

                                                <br />
                                            </>
                                    }
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

export default AsignarCursos;