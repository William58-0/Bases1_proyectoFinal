import React from 'react';
import styled from 'styled-components';

import { Link } from 'react-router-dom';
import { Button, Card } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'

import {
    crearUsuario, getUsuarios, getUsuario,
    eliminarUsuario, editarUsuario, crearCurso,
    getCursos, getCurso, getMaestros, getAlumnos,
    asignarCurso, getClases
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


class Administrador extends React.Component {
    constructor(props) {
        super(props);
        this.state = estadoInicial;
    }

    formulario(nombre, apellido, telefono, direccion,
        correo, nacimiento, dpi_carnet,
        contrasenia, modo, alumno_profesor) {
        return (
            <div class='row' >
                <div class='column' style={{ width: '50%' }}>
                    <label>Nombre: </label><br />
                    <input style={{ marginBottom: "2%" }} value={nombre} readOnly={modo}
                        onChange={(e) => this.setState({ nombre: e.target.value })}
                        type="text" />
                    <br /><br />

                    <label>{alumno_profesor ? 'Carnet' : 'Registro'}</label><br />
                    <input style={{ marginBottom: "2%" }} value={dpi_carnet} readOnly={modo}
                        onChange={(e) => this.setState({ dpi_carnet: e.target.value })}
                        type="text" />
                    <br /><br />

                    <label>Telefono: </label><br />
                    <input style={{ marginBottom: "2%" }} value={telefono} readOnly={modo}
                        onChange={(e) => this.setState({ telefono: e.target.value })}
                        type="text" />
                    <br /><br />

                    <label>Correo: </label><br />
                    <input style={{ marginBottom: "2%" }} value={correo} readOnly={modo}
                        onChange={(e) => this.setState({ correo: e.target.value })}
                        type="text" />
                    <br />
                </div>

                <div class='column' style={{ width: '50%' }}>
                    <label>Apellido: </label><br />
                    <input style={{ marginBottom: "2%" }} value={apellido} readOnly={modo}
                        onChange={(e) => this.setState({ apellido: e.target.value })}
                        type="text" />
                    <br /><br />

                    <label>Contraseña: </label><br />
                    <input style={{ marginBottom: "2%" }} value={contrasenia} readOnly={modo}
                        onChange={(e) => this.setState({ contrasenia: e.target.value })}
                        type="password" />
                    <br /><br />

                    <label>Dirección: </label><br />
                    <input style={{ marginBottom: "2%" }} value={direccion} readOnly={modo}
                        onChange={(e) => this.setState({ direccion: e.target.value })}
                        type="text" />
                    <br /><br />

                    {this.state.tipo === 'Maestro' ?
                        <><label>Fecha de Nacimiento: </label><br />
                            <input style={{ marginBottom: "2%" }} value={nacimiento} readOnly={modo}
                                onChange={(e) => this.setState({ nacimiento: e.target.value })}
                                type="date" />
                            <br />
                        </> : <></>
                    }

                </div>
            </div>
        );
    }

    getOtroUsuario(idUsuario) {
        this.setState({ usuario: idUsuario })
        getUsuario(idUsuario, this.state.tipo).then((response) => {
            if (!(response.data.length > 0)) {
                console.log("error al tomar datos");
                return;
            }
            var user = response.data[0];

            if (this.state.tipo === 'Maestro') {
                this.setState({
                    nombre: user.nombre, apellido: user.apellido,
                    telefono: user.telefono, direccion: user.direccion, contrasenia: user.contrasenia,
                    correo: user.correo, nacimiento: user.fecha_nacimiento, dpi_carnet: user.dpi
                })
            } else {
                this.setState({
                    nombre: user.nombre, apellido: user.apellido, dpi_carnet: user.carnet,
                    telefono: user.telefono, direccion: user.direccion, contrasenia: user.contrasenia,
                    correo: user.correo
                })
            }
        });
    }

    cambiarTipo = (e) => {
        getUsuarios(e.target.value).then((response) => {
            this.setState({ usuarios: response.data })
        });
        this.setState({ tipo: e.target.value });
        this.getOtroUsuario(1);
        if (this.state.opcion === 5) {
            getClases().then((response) => {
                console.log("CLASESE");
                console.log(response);
                this.setState({ clases: response.data })
            });
        }
    }

    regresar() {
        this.setState(estadoInicial);
    }

    prepararDatosUsuario(formData) {
        formData.append('tipo', this.state.tipo);
        formData.append('usuario', this.state.usuario);
        formData.append('nombre', this.state.nombre);
        formData.append('apellido', this.state.apellido);
        formData.append('telefono', this.state.telefono);
        formData.append('direccion', this.state.direccion);
        formData.append('correo', this.state.correo);
        formData.append('nacimiento', this.state.nacimiento);
        formData.append('dpi_carnet', this.state.dpi_carnet);
        formData.append('contrasenia', this.state.contrasenia);
        formData.append('imagen', this.state.imagen);
    }

    prepararUsuario() {
        var user = {}
        user.tipo = this.state.tipo
        user.usuario = this.state.usuario
        user.nombre = this.state.nombre
        user.apellido = this.state.apellido
        user.telefono = this.state.telefono
        user.direccion = this.state.direccion
        user.correo = this.state.correo
        user.nacimiento = this.state.nacimiento
        user.dpi_carnet = this.state.dpi_carnet
        user.contrasenia = this.state.contrasenia
        user.imagen = this.state.imagen

        return user;
    }

    // -------------------------------------------------------------------------- Crear un usuario
    CrearUsuario = async () => {
        var imagen = this.state.imagen;
        if (imagen.data !== "") {
            let formData = new FormData()
            formData.append('file', imagen.data);
            this.prepararDatosUsuario(formData);
            const response = await fetch('http://localhost:9000/Administrador/crearUsuario', {
                method: 'POST',
                body: formData,
            })
            if (response.status === 200) {
                alert("Usuario Creado");
                this.regresar();
            } else {
                alert("Rayos :(");
            }
        }
        else {
            crearUsuario(this.state).then((response) => {
                alert("Usuario Creado");
                this.regresar();
            }).catch(err => {
                alert("Error :(");
            });
        }

    }

    // -------------------------------------------------------------------------- Eliminar un usuario

    entrarEliminar = async () => {
        getUsuarios(this.state.tipo).then((response) => {
            this.setState({ usuarios: response.data })
        });
        this.setState({ opcion: 2 })
    }

    cambiarUsuario = async (e) => {
        this.getOtroUsuario(e.target.value);
    }

    EliminarUsuario = async (e) => {
        eliminarUsuario(this.state.usuario, this.state.tipo).then((response) => {
            alert("Usuario Eliminado");
            this.setState(estadoInicial);
        }).catch(err => {
            alert("Error :(");
        });
    }

    // -------------------------------------------------------------------------- Carga Masiva
    CargaMasiva = async () => {

        var imagen = this.state.imagen;

        if (imagen.data !== "") {
            let formData = new FormData()
            formData.append('file', imagen.data);
            formData.append('tipo', this.state.tipo);
            const response = await fetch('http://localhost:9000/Administrador/cargaMasiva', {
                method: 'POST',
                body: formData,
            })

            if (response.status === 200) {
                alert("Datos cargados");
            } else {
                alert("Error :(");
            }

        }
        else {
            alert("No ha subido nada");
        }

    }

    // -------------------------------------------------------------------------- Editar un usuario

    entrarEditar = async () => {
        getUsuarios(this.state.tipo).then((response) => {
            this.setState({ usuarios: response.data })
        });
        this.setState({ opcion: 4 })
    }

    EditarUsuario = async (e) => {
        var nuevosDatos = this.prepararUsuario();
        editarUsuario(nuevosDatos).then((response) => {
            alert("Usuario Actualizado");
            this.regresar();
        }).catch(err => {
            alert("Error :(");
        });
    }

    // -------------------------------------------------------------------------- Asignacion de Cursos
    CrearCurso = (nuevoCurso) => {
        if (nuevoCurso !== "") {
            crearCurso(nuevoCurso).then((response) => {
                getCursos().then((response) => {
                    this.setState({ cursos: response.data })
                });
                alert("curso creado!");
            });
        }
    }

    EntrarAsignacion = () => {
        getCursos().then((response) => {
            this.setState({ cursos: response.data })
            if (response.data.length > 0) {
                this.setState({
                    nombreCurso: response.data[0].nombre_curso,
                    curso: response.data[0].id_curso,
                })
            }
        });

        getClases().then((response) => {
            this.setState({ clases: response.data })
            if (response.data.length > 0) {
                this.setState({
                    nombreCurso: response.data[0].nombre_curso,
                    clase: response.data[0].id_clase,
                    maestro: response.data[0].nombre + " " + response.data[0].apellido,
                })
            }
        });

        if (this.state.tipo === 'Maestro') {
            getMaestros().then((response) => {
                this.setState({ usuarios: response.data })
                if (response.data.length > 0) {
                    this.getOtroUsuario(response.data[0].id_maestro)
                }
            });
        } else {
            getAlumnos().then((response) => {
                this.setState({ usuarios: response.data })
                if (response.data.length > 0) {
                    this.getOtroUsuario(response.data[0].id_alumno)
                }
            });
        }
        this.setState({ opcion: 5 })
    }

    cambiarCurso = async (e) => {
        this.setState({ curso: e.target.value });
        getCurso(e.target.value).then((response) => {
            if (response.data.length > 0) {
                this.setState({ nombreCurso: response.data[0].nombre_curso })
            }
        });
    }

    cambiarClase = async (e) => {
        this.setState({ clase: e.target.value });
        console.log(e.target.value);
        this.state.clases.forEach(clase => {
            console.log(clase.id_clase);
            if (clase.id_clase.toString() === e.target.value.toString()) {
                this.setState({
                    maestro: clase.nombre + " " + clase.apellido,
                    nombreCurso: clase.nombre_curso
                })
                return undefined;
            }
        });
    }

    asignarCurso = async (e) => {
        // hay que asignar el curso o la clase
        if (this.state.tipo === 'Maestro') {
            asignarCurso(this.state.tipo, this.state.usuario,
                this.state.curso).then((response) => {
                    alert("Curso asignado");
                }).catch(err => {
                    alert("Error :(");
                });
        } else {
            asignarCurso(this.state.tipo, this.state.usuario,
                this.state.clase).then((response) => {
                    alert("Clase asignada");
                }).catch(err => {
                    alert("Error :(");
                });
        }
    }

    renderizarOpcion() {
        var opcion = this.state.opcion;
        var tipo = this.state.tipo;

        var nombre = this.state.nombre;
        var apellido = this.state.apellido;
        var telefono = this.state.telefono;
        var direccion = this.state.direccion;
        var correo = this.state.correo;
        var nacimiento = this.state.nacimiento;
        var dpi_carnet = this.state.dpi_carnet;
        var contrasenia = this.state.contrasenia;
        var curso = this.state.curso;
        var cursos = this.state.cursos;
        var nombreCurso = this.state.nombreCurso;
        var nuevoCurso = this.state.nuevoCurso;
        var usuarios = this.state.usuarios;
        var clases = this.state.clases;
        var maestro = this.state.maestro;

        var imagen = this.state.imagen;
        var estado = this.state.estado;

        const handleFileChange = (e) => {
            const img = {
                preview: URL.createObjectURL(e.target.files[0]),
                data: e.target.files[0],
            }
            this.setState({ imagen: img })
        }


        if (opcion === 1) {
            return (
                <>
                    <Container>
                        <div class="d-flex justify-content-center align-items-center container-publicacion">
                            <Card style={{ width: '100%', height: '95%' }}>
                                <Card.Header as="h5" >
                                    <button className='boton-regreso-publicacion'
                                        onClick={() => this.regresar()}> {"<"} </button>
                                    <label className='label-publicacion'>Crear un usuario </label>
                                    <select style={{ float: 'right' }} onChange={(e) => this.cambiarTipo(e)} >
                                        <option key={'Maestro'} value={'Maestro'}>Maestro</option>
                                        <option key={'Alumno'} value={'Alumno'}>Alumno</option>
                                    </select>
                                </Card.Header>
                                <Card.Body style={{ overflowY: 'auto' }}>

                                    {this.formulario(nombre, apellido, telefono, direccion, correo, nacimiento, dpi_carnet, contrasenia, false, tipo === 'Alumno')}
                                    <br />
                                    <p >Fotografía (Opcional)</p>
                                    <form >
                                        <input type='file' name='file' onChange={handleFileChange}></input>

                                    </form>

                                </Card.Body>
                                <Card.Footer style={{ textAlign: 'right' }}>
                                    <Button onClick={this.CrearUsuario} style={{ float: 'right' }}>Crear Usuario</Button>
                                </Card.Footer>
                            </Card>
                        </div>
                    </Container>
                </>
            );
        } else if (opcion === 2) {
            return (
                <>
                    <Container>
                        <div class="d-flex justify-content-center align-items-center container-publicacion">
                            <Card style={{ width: '100%', height: '90%' }}>
                                <Card.Header as="h5" >
                                    <button className='boton-regreso-publicacion'
                                        onClick={() => this.regresar()}> {"<"} </button>
                                    <label className='label-publicacion'>Eliminar un usuario </label>
                                    <select style={{ float: 'right' }} onChange={(e) => this.cambiarTipo(e)} >
                                        <option key={'Maestro'} value={'Maestro'}>Maestro</option>
                                        <option key={'Alumno'} value={'Alumno'}>Alumno</option>
                                    </select>
                                </Card.Header>
                                <Card.Body style={{ overflowY: 'auto' }}>
                                    Seleccionar el id:
                                    <select style={{ marginLeft: '2%' }} onChange={(e) => this.cambiarUsuario(e)} >
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
                                    {this.formulario(nombre, apellido, telefono, direccion, correo, nacimiento, dpi_carnet, contrasenia, true, tipo === 'Alumno')}

                                </Card.Body>
                                <Card.Footer style={{ textAlign: 'right' }}>
                                    <Button onClick={this.EliminarUsuario} style={{ float: 'right' }}>Eliminar Usuario</Button>
                                </Card.Footer>
                            </Card>
                        </div>
                    </Container>
                </>
            );

        } else if (opcion === 3) {
            return (
                <>
                    <Container>
                        <div class="d-flex justify-content-center align-items-center container-publicacion">
                            <Card style={{ width: '90%', height: '50%' }}>
                                <Card.Header as="h5" >
                                    <button className='boton-regreso-publicacion'
                                        onClick={() => this.regresar()}> {"<"} </button>
                                    <label className='label-publicacion'>Cargar CSV </label>

                                </Card.Header>
                                <Card.Body style={{ overflowY: 'auto' }}>
                                    Tipo de CSV:  <select style={{ marginLeft: '2%' }} onChange={(e) => this.cambiarTipo(e)} >
                                        <option key={'Maestro'} value={'Maestro'}>Maestro</option>
                                        <option key={'Alumno'} value={'Alumno'}>Alumno</option>
                                    </select>

                                    <br /><br /><br /><br /><br />
                                    <form>
                                        <input type='file' name='file' onChange={handleFileChange}></input>
                                    </form>

                                </Card.Body>
                                <Card.Footer style={{ textAlign: 'right' }}>
                                    <Button onClick={this.CargaMasiva} style={{ float: 'right' }}>Cargar Información</Button>
                                </Card.Footer>
                            </Card>
                        </div>
                    </Container>

                </>
            );
        } else if (opcion === 4) {
            return (
                <>
                    <Container>
                        <div class="d-flex justify-content-center align-items-center container-publicacion">
                            <Card style={{ width: '100%', height: '90%' }}>
                                <Card.Header as="h5" >
                                    <button className='boton-regreso-publicacion'
                                        onClick={() => this.regresar()}> {"<"} </button>
                                    <label className='label-publicacion'>Editar un usuario </label>
                                    <select style={{ float: 'right' }} onChange={(e) => this.cambiarTipo(e)} >
                                        <option key={'Maestro'} value={'Maestro'}>Maestro</option>
                                        <option key={'Alumno'} value={'Alumno'}>Alumno</option>
                                    </select>
                                </Card.Header>
                                <Card.Body style={{ overflowY: 'auto' }}>
                                    Seleccionar el id:
                                    <select style={{ marginLeft: '2%' }} onChange={(e) => this.cambiarUsuario(e)}>
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
                                    {this.formulario(nombre, apellido, telefono, direccion, correo, nacimiento, dpi_carnet, contrasenia, false, tipo === 'Alumno')}

                                </Card.Body>
                                <Card.Footer style={{ textAlign: 'right' }}>
                                    <Button onClick={() => this.EditarUsuario()} style={{ float: 'right' }}>Guardar Cambios</Button>
                                </Card.Footer>
                            </Card>
                        </div>
                    </Container>
                </>
            );
        } else if (opcion === 5) {
            return (
                <>
                    <Container>
                        <div class="d-flex justify-content-center align-items-center container-publicacion">
                            <Card style={{ width: '100%', height: '63%' }}>
                                <Card.Header as="h5" >
                                    <button className='boton-regreso-publicacion'
                                        onClick={() => this.regresar()}> {"<"} </button>
                                    <label className='label-publicacion'>Asignar Cursos </label>
                                    <select style={{ float: 'right' }} onChange={(e) => this.cambiarTipo(e)} >
                                        <option key={'Maestro'} value={'Maestro'}>Maestro</option>
                                        <option key={'Alumno'} value={'Alumno'}>Alumno</option>
                                    </select>
                                </Card.Header>
                                <Card.Body style={{ overflowY: 'auto' }}>


                                    <div class='row'>
                                        <div class='col' >
                                            Id de {tipo}:
                                            <select style={{ marginLeft: '2%' }} onChange={(e) => this.cambiarUsuario(e)} >
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
                                                onChange={(e) => this.setState({ dpi_carnet: e.target.value })}
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
                                                        <select style={{ marginLeft: '2%' }} onChange={(e) => this.cambiarCurso(e)} >
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
                                                            type="text" onChange={(e) => this.setState({ nuevoCurso: e.target.value })} />
                                                        <Button onClick={() => this.CrearCurso(nuevoCurso)} variant='success' style={{ marginLeft: '3%' }}>Crear</Button>
                                                    </> :
                                                    <>
                                                        Asignar a clase:
                                                        <select style={{ marginLeft: '2%' }} onChange={(e) => this.cambiarClase(e)} >
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
                                        onClick={() => this.asignarCurso()}>Asignar</Button>
                                </Card.Footer>
                            </Card>
                        </div>
                    </Container>
                </>
            );
        } else if (opcion === 6) {
            return (
                <>
                    <Container>
                        <div class="d-flex justify-content-center align-items-center container-publicacion">
                            <Card style={{ width: '100%', height: '60%' }}>
                                <Card.Header as="h5" >
                                    <button className='boton-regreso-publicacion'
                                        onClick={() => this.regresar()}> {"<"} </button>
                                    <label className='label-publicacion'>Ingresar un usuario </label>
                                    <select style={{ float: 'right' }} onChange={(e) => this.cambiarTipo(e)} >
                                        <option key={'Maestro'} value={'Maestro'}>Maestro</option>
                                        <option key={'Alumno'} value={'Alumno'}>Alumno</option>
                                    </select>
                                </Card.Header>
                                <Card.Body style={{ overflowY: 'auto' }}>
                                    Seleccionar el id:
                                    <select style={{ marginLeft: '2%' }} onChange={(e) => this.cambiarTipo(e)} >
                                        <option key={'Maestro'} value={'Maestro'}>Maestro</option>
                                        <option key={'Alumno'} value={'Alumno'}>Alumno</option>
                                    </select>
                                    <br /><br />
                                    <label>{tipo === "Alumno" ? 'Carnet' : 'Registro'} </label><br />
                                    <input style={{ marginBottom: "2%" }} value={nombre} readOnly={true}
                                        onChange={(e) => this.setState({ nombre: e.target.value })}
                                        type="text" />
                                    <br /><br />

                                    <label>Contraseña: </label><br />
                                    <input style={{ marginBottom: "2%" }} value={contrasenia} readOnly={true}
                                        onChange={(e) => this.setState({ contrasenia: e.target.value })}
                                        type="password" />

                                </Card.Body>
                                <Card.Footer style={{ textAlign: 'right' }}>
                                    <Button style={{ float: 'right' }}>Iniciar Sesión</Button>
                                </Card.Footer>
                            </Card>
                        </div>
                    </Container>
                </>
            );
        }

        else {
            return (
                <Container>
                    <h1 style={{ width: '20%' }}>{'Administración de Usuarios'}</h1>
                    <Form>
                        <Link to="/admin/crearusuario">
                            <Button variant='success' style={{ marginBottom: "8%" }}>
                                Crear Usuario
                            </Button>
                        </Link><br />

                        <Link to="/admin/eliminarusuario">
                            <Button style={{ marginBottom: "8%" }}>
                                Eliminar Usuario
                            </Button>
                        </Link><br />

                        <Link to="/admin/cargamasiva">
                            <Button variant='success' style={{ marginBottom: "8%" }}>
                                Cargar CSV
                            </Button>
                        </Link><br />

                        <Link to="/admin/editarusuario">
                            <Button style={{ marginBottom: "8%" }}>
                                Editar Usuario
                            </Button>
                        </Link><br />

                        <Button variant='success' style={{ marginBottom: "8%" }}
                            onClick={() => this.EntrarAsignacion()}>
                            Asignar Cursos
                        </Button><br />
                        <Button style={{ marginBottom: "8%" }}
                        >
                            Ingresar como Usuario
                        </Button><br />
                    </Form>
                </Container>
            );
        }
    }

    render() {
        return (
            <>
                <div style={{ position: 'absolute', marginLeft: '2%', marginTop: '2%' }}>
                    <Link to="/" style={{}}>
                        <FontAwesomeIcon icon={faArrowLeft} color='white' size='2x' />
                    </Link>
                </div>
                {this.renderizarOpcion()}
            </>
        );
    }
}

export default Administrador;