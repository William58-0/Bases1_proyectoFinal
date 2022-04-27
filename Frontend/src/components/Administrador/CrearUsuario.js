import React, { useState, useEffect } from 'react'
import styled from 'styled-components';

import { Link, Redirect, useParams } from 'react-router-dom';
import { Button, Card } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'

import {
    crearUsuario, getUsuarios, getUsuario
} from '../../endpoints/endpoints';

import fondo from '../../images/admin.jpg';

const Form = styled.form`
    margin: auto;  
    margin-right: 5%;
    margin-left: 5%; 
    width: auto;
    padding: 2%; 
`;

const Container = styled.div`
width: 100%;
height: 657px;
box-sizing: border-box;
background: linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(${fondo}), no-repeat center top;
background-size: cover;
display: flex;
justify-content: center;
align-items: center;
color: white;
overflow-y: hidden;
`;

const estadoInicial = {
    opcion: 0,
    tipo: "Maestro",

    nombre: "fdaa",
    apellido: "fdafdsa",
    telefono: "afdas",
    direccion: "fdasfdsa",
    correo: "afda",
    nacimiento: "afdafda",
    dpi_carnet: 0,
    contrasenia: "fdsafdsa",
    nombreCurso: "",
    nuevoCurso: "",
    usuarios: [],
    usuario: 0,
    cursos: [],
    curso: 0,
    clases: [],
    clase: 0,
    maestro: "",

    imagen: { preview: '', data: '' },
    estado: ""
}


function CrearUsuario() {
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
    //
    const [usuarios, setUsuarios] = useState([]);
    const [cursos, setCursos] = useState([]);
    const [curso, setCurso] = useState(0);
    const [nombreCurso, setNombreCurso] = useState("");
    const [titulo, setTitulo] = useState("");
    const [descripcion, setDesc] = useState("");
    const [valor, setValor] = useState(0);
    const [fecha_entrega, setFechaE] = useState("");
    const [fecha_publicacion, setFechaP] = useState("");
    const [alumnos, setAlumnos] = useState([]);
    const [alumno, setAlumno] = useState({});
    const [alumnosA, setAlumnosA] = useState([]);

    const formulario = (nombre, apellido, telefono, direccion,
        correo, nacimiento, dpi_carnet,
        contrasenia, modo, alumno_profesor) => {
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

    const getOtroUsuario = (idUsuario) => {
        setUsuario(idUsuario);
        getUsuario(idUsuario, tipo).then((response) => {
            if (!(response.data.length > 0)) {
                console.log("error al tomar datos");
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
                setNacimiento(user.nacimiento);
                setDPICarnet(user.dpi);
            } else {
                setDPICarnet(user.carnet);
            }
        });
    }

    const handleFileChange = (e) => {
        const img = {
            preview: URL.createObjectURL(e.target.files[0]),
            data: e.target.files[0],
        }
        setImagen(img);
    }

    const cambiarTipo = (e) => {
        getUsuarios(e.target.value).then((response) => {
            setUsuarios(response.data);
        });
        setTipo(e.target.value);
        getOtroUsuario(1);
    }

    const regresar = (e) => {
        setRedirect(true);
    }

    const prepararDatosUsuario = (formData) => {
        formData.append('tipo', tipo);
        formData.append('usuario', usuario);
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
        user.usuario = usuario
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
            const response = await fetch('http://localhost:9000/Administrador/crearUsuario', {
                method: 'POST',
                body: formData,
            })
            if (response.status === 200) {
                alert("Usuario Creado");
                regresar();
            } else {
                alert("Rayos :(");
            }
        }
        else {
            var nuevo = prepararUsuario();
            crearUsuario(nuevo).then((response) => {
                alert("Usuario Creado");
                regresar();
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
                            <button className='boton-regreso-publicacion'
                                onClick={() => regresar()}> {"<"} </button>
                            <label className='label-publicacion'>Crear un usuario </label>
                            <select style={{ float: 'right' }} onChange={(e) => cambiarTipo(e)} >
                                <option key={'Maestro'} value={'Maestro'}>Maestro</option>
                                <option key={'Alumno'} value={'Alumno'}>Alumno</option>
                            </select>
                        </Card.Header>
                        <Card.Body style={{ overflowY: 'auto' }}>

                            {formulario(nombre, apellido, telefono, direccion, correo, nacimiento, dpi_carnet, contrasenia, false, tipo === 'Alumno')}
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