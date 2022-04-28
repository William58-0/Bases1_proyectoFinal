import React, { useState, useEffect } from 'react'

import { Redirect } from 'react-router-dom';
import { Button, Card } from "react-bootstrap";
import { Container } from '../AdminContainer'

import {
    editarUsuario, getUsuarios, getUsuario,
    getClases, getCursos, getCurso, getMaestros, getAlumnos,
    asignarCurso, crearCurso
} from '../../../endpoints/endpoints';


function AsignarAlumnos() {
    const [tipo, setTipo] = useState("Alumno");
    const [usuario, setUsuario] = useState(0);
    const [nombre, setNombre] = useState("fdsafa");
    const [apellido, setApellido] = useState("fdassd");
    const [dpi_carnet, setDPICarnet] = useState("45646856");

    const [clases, setClases] = useState([]);
    const [nombreCurso, setNombreCurso] = useState("");
    const [clase, setClase] = useState("");
    const [maestro, setMaestro] = useState("");

    const [redirect, setRedirect] = useState(false);

    const [usuarios, setUsuarios] = useState([]);

    useEffect(() => {
        getClases().then((response) => {
            setClases(response.data);
            console.log("CLAASES");
            console.log(response.data);
            if (response.data.length > 0) {
                setClase(response.data[0].id_clase);
                setMaestro(response.data[0].nombre + " " + response.data[0].apellido);
                setNombreCurso(response.data[0].nombre_curso);
            }
        });

        getAlumnos().then((response) => {
            setUsuarios(response.data);
            if (response.data.length > 0) {
                getOtroUsuario(response.data[0].id_alumno);
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
                setDPICarnet(user.carnet);

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
        getOtroUsuario(e.target.value);
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
        asignarCurso(tipo, usuario, clase).then((response) => {
            alert("Clase asignada");
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
                            <label className='label-publicacion'>Asignar Alumnos a Cursos </label>
                        </Card.Header>
                        <Card.Body style={{ overflowY: 'auto' }}>


                            <div class='row'>
                                <div class='col' >
                                    Id de Alumno:
                                    <select style={{ marginLeft: '2%' }} onChange={(e) => cambiarUsuario(e)} >
                                        {
                                            usuarios.map((usuario) =>
                                                <option key={usuarios.id_alumno} value={usuario.id_alumno}>{usuario.id_alumno}</option>
                                            )}
                                    </select>
                                    <br /><br />
                                    <label>Carnet</label><br />
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

export default AsignarAlumnos;