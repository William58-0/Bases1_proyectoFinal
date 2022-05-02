import React, { useState, useEffect } from 'react'
import styled from 'styled-components';

import { Redirect } from 'react-router-dom';
import { Button, Card } from "react-bootstrap";
import { Container } from './AdminContainer'

import {
    crearUsuario, verificarUsuario
} from '../../endpoints/endpoints';


function CrearUsuario() {
    const [tipo, setTipo] = useState("Maestro");
    const [usuario, setUsuario] = useState(0);
    const [nombre, setNombre] = useState("");
    const [apellido, setApellido] = useState("");
    const [telefono, setTelefono] = useState("")
    const [direccion, setDireccion] = useState("")
    const [correo, setCorreo] = useState("");
    const [nacimiento, setNacimiento] = useState("2021-08-14");
    const [dpi_carnet, setDPICarnet] = useState("");
    const [contrasenia, setContrasenia] = useState("");
    const [imagen, setImagen] = useState({ preview: '', data: '' });

    const [redirect, setRedirect] = useState(false);

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

    const handleFileChange = (e) => {
        const img = {
            preview: URL.createObjectURL(e.target.files[0]),
            data: e.target.files[0],
        }
        setImagen(img);
    }

    const cambiarTipo = (e) => {
        setTipo(e.target.value);
    }

    const prepararDatosUsuario = (formData) => {
        formData.append('tipo', tipo);
        formData.append('nombre', nombre);
        formData.append('apellido', apellido);
        formData.append('telefono', telefono);
        formData.append('direccion', direccion);
        formData.append('correo', correo);
        formData.append('nacimiento', nacimiento);
        formData.append('dpi_carnet', dpi_carnet);
        formData.append('contrasenia', contrasenia);
        formData.append('imagen', imagen);
    }

    const prepararUsuario = () => {
        var user = {}
        user.tipo = tipo
        user.nombre = nombre
        user.apellido = apellido
        user.telefono = telefono
        user.direccion = direccion
        user.correo = correo
        user.nacimiento = nacimiento
        user.dpi_carnet = dpi_carnet
        user.contrasenia = contrasenia
        user.imagen = imagen

        return user;
    }

    // -------------------------------------------------------------------------- Crear un usuario
    const CrearUsuario = async () => {
        if (imagen.data !== "") {
            let formData = new FormData()
            formData.append('file', imagen.data);
            prepararDatosUsuario(formData);

            verificarUsuario(tipo, correo, dpi_carnet).then(async (response) => {
                if (response.data === 'REPETIDO') {
                    alert("DPI/CARNET o Correo Repetido");
                    return;
                } else {
                    const response = await fetch('http://localhost:9000/Administrador/crearUsuario', {
                        method: 'POST',
                        body: formData,
                    })
                    if (response.status === 200) {
                        alert("Usuario Creado");
                    } else {
                        alert("Error :(");
                    }
                }
            }).catch(err => {
                alert("Error :(");
            });



        }
        else {
            verificarUsuario(tipo, correo, dpi_carnet).then((response) => {
                if (response.data === 'REPETIDO') {
                    alert("DPI/CARNET o Correo Repetido");
                    return;
                } else {
                    var nuevo = prepararUsuario();
                    crearUsuario(nuevo).then((response) => {
                        alert("Usuario Creado");
                    }).catch(err => {
                        alert("Error :(");
                    });
                }
            }).catch(err => {
                alert("Error :(");
            });



        }

    }

    return (
        <>
            <Container>
                <div class="d-flex justify-content-center align-items-center container-publicacion">
                    <Card style={{ width: '100%', height: '95%' }}>
                        <Card.Header as="h5" >
                            {renderRedirect()}
                            <button className='boton-regreso-publicacion'
                                onClick={() => setRedirect(true)}> {"<"} </button>
                            <label className='label-publicacion'>Crear un usuario </label>
                            <select style={{ float: 'right' }} onChange={(e) => cambiarTipo(e)} >
                                <option key={'Maestro'} value={'Maestro'}>Maestro</option>
                                <option key={'Alumno'} value={'Alumno'}>Alumno</option>
                            </select>
                        </Card.Header>
                        <Card.Body style={{ overflowY: 'auto' }}>

                            {formulario(false, tipo === 'Alumno')}
                            <br />
                            <p >Fotografía (Opcional)</p>
                            <form >
                                <input type='file' name='file' onChange={handleFileChange}></input>

                            </form>

                        </Card.Body>
                        <Card.Footer style={{ textAlign: 'right' }}>
                            <Button onClick={() => CrearUsuario()} style={{ float: 'right' }}>Crear Usuario</Button>
                        </Card.Footer>
                    </Card>
                </div>
            </Container>
        </>
    );
}

export default CrearUsuario;