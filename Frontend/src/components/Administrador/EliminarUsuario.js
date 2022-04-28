import React, { useState, useEffect } from 'react'

import { Redirect } from 'react-router-dom';
import { Button, Card } from "react-bootstrap";
import { Container } from './AdminContainer'

import {
    eliminarUsuario, getUsuarios, getUsuario
} from '../../endpoints/endpoints';


function EEliminarUsuario() {
    const [tipo, setTipo] = useState("Maestro");
    const [usuario, setUsuario] = useState(0);
    const [nombre, setNombre] = useState("fdsafa");
    const [apellido, setApellido] = useState("fdassd");
    const [telefono, setTelefono] = useState("465456")
    const [direccion, setDireccion] = useState("jhgdhgd")
    const [correo, setCorreo] = useState("ghdhd");
    const [nacimiento, setNacimiento] = useState("2021-08-14");
    const [dpi_carnet, setDPICarnet] = useState("45646856");
    const [contrasenia, setContrasenia] = useState("hgdhghgf");
    const [imagen, setImagen] = useState({ preview: '', data: '' });

    const [redirect, setRedirect] = useState(false);

    const [usuarios, setUsuarios] = useState([]);

    useEffect(() => {
        // obtener los usuarios
        getUsuarios(tipo).then((response) => {
            setUsuarios(response.data);

            if (response.data.length > 0) {
                if (tipo === 'Maestro') {
                    getOtroUsuario(response.data[0].id_maestro, tipo);
                } else {
                    getOtroUsuario(response.data[0].id_alumno, tipo);
                }
            }
        });

    }, [])


    const formulario = (modo, alumno_profesor) => {
        return (
            <div class='row' >
                <div class='column' style={{ width: '50%' }}>
                    <label>Nombre: </label><br />
                    <input style={{ marginBottom: "2%" }} value={nombre} readOnly={modo}
                        onChange={(e) => setNombre(e.target.value)}
                        type="text" />
                    <br /><br />

                    <label>{alumno_profesor ? 'Carnet' : 'Registro'}</label><br />
                    <input style={{ marginBottom: "2%" }} value={dpi_carnet} readOnly={modo}
                        onChange={(e) => setDPICarnet(e.target.value)}
                        type="text" />
                    <br /><br />

                    <label>Telefono: </label><br />
                    <input style={{ marginBottom: "2%" }} value={telefono} readOnly={modo}
                        onChange={(e) => setTelefono(e.target.value)}
                        type="text" />
                    <br /><br />

                    <label>Correo: </label><br />
                    <input style={{ marginBottom: "2%" }} value={correo} readOnly={modo}
                        onChange={(e) => setCorreo(e.target.value)}
                        type="text" />
                    <br />
                </div>

                <div class='column' style={{ width: '50%' }}>
                    <label>Apellido: </label><br />
                    <input style={{ marginBottom: "2%" }} value={apellido} readOnly={modo}
                        onChange={(e) => setApellido(e.target.value)}
                        type="text" />
                    <br /><br />

                    <label>Contraseña: </label><br />
                    <input style={{ marginBottom: "2%" }} value={contrasenia} readOnly={modo}
                        onChange={(e) => setContrasenia(e.target.value)}
                        type="password" />
                    <br /><br />

                    <label>Dirección: </label><br />
                    <input style={{ marginBottom: "2%" }} value={direccion} readOnly={modo}
                        onChange={(e) => setDireccion(e.target.value)}
                        type="text" />
                    <br /><br />

                    {tipo === 'Maestro' ?
                        <><label>Fecha de Nacimiento: </label><br />
                            <input style={{ marginBottom: "2%" }} value={nacimiento} readOnly={modo}
                                onChange={(e) => setNacimiento(e.target.value)}
                                type="date" />
                            <br />
                        </> : <></>
                    }

                </div>
            </div>
        );
    }

    const renderRedirect = () => {
        if (redirect) {
            return <Redirect to='/admin' />
        }
    }

    const cambiarTipo = (e) => {
        setTipo(e.target.value);
        var type = e.target.value;
        getUsuarios(e.target.value).then((response) => {
            setUsuarios(response.data);
            getOtroUsuario(usuario, type);
        });
    }

    // -------------------------------------------------------------------------- Eliminar un usuario
    const getOtroUsuario = (idUsuario, tipo) => {
        setUsuario(idUsuario);
        getUsuario(idUsuario, tipo).then((response) => {
            if (!(response.data.length > 0)) {
                console.log("error al tomar datos");
                setNombre("");
                setApellido("");
                setTelefono("");
                setDireccion("");
                setContrasenia("");
                setCorreo("");
                setNacimiento("");
                setDPICarnet("");
                return;
            }
            var user = response.data[0];

            setNombre(user.nombre);
            setApellido(user.apellido);
            setTelefono(user.telefono);
            setDireccion(user.direccion);
            setContrasenia(user.contrasenia);
            setCorreo(user.correo);

            if (tipo === 'Maestro') {
                setNacimiento(user.fecha_nacimiento);
                setDPICarnet(user.dpi);
            } else {
                setDPICarnet(user.carnet);
            }
        }).catch(err => {
            console.log("error al tomar datos");
            setNombre("");
            setApellido("");
            setTelefono("");
            setDireccion("");
            setContrasenia("");
            setCorreo("");
            setNacimiento("");
            setDPICarnet("");
            return;
        });
    }

    const cambiarUsuario = async (e) => {
        getOtroUsuario(e.target.value, tipo);
    }

    const EliminarUsuario = async (e) => {
        eliminarUsuario(usuario, tipo).then((response) => {
            alert("Usuario Eliminado");
            setRedirect(true);
        }).catch(err => {
            alert("Error :(");
        });
    }

    return (
        <>
            <Container>
                <div class="d-flex justify-content-center align-items-center container-publicacion">
                    <Card style={{ width: '100%', height: '90%' }}>
                        <Card.Header as="h5" >
                            {renderRedirect()}
                            <button className='boton-regreso-publicacion'
                                onClick={() => setRedirect(true)}> {"<"} </button>
                            <label className='label-publicacion'>Eliminar un usuario </label>
                            <select style={{ float: 'right' }} onChange={(e) => cambiarTipo(e)} >
                                <option key={'Maestro'} value={'Maestro'}>Maestro</option>
                                <option key={'Alumno'} value={'Alumno'}>Alumno</option>
                            </select>
                        </Card.Header>
                        <Card.Body style={{ overflowY: 'auto' }}>
                            Seleccionar el id:
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
                            {formulario(true, tipo === 'Alumno')}

                        </Card.Body>
                        <Card.Footer style={{ textAlign: 'right' }}>
                            <Button onClick={() => EliminarUsuario()} style={{ float: 'right' }}>Eliminar Usuario</Button>
                        </Card.Footer>
                    </Card>
                </div>
            </Container>
        </>
    );
}

export default EEliminarUsuario;