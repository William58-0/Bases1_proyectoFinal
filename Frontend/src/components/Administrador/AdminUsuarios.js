import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Button, Card } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'

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

    nombre: "",
    apellido: "",
    telefono: "",
    direccion: "",
    correo: "",
    nacimiento: "",
    dpi: "",
    contrasenia: "",

    imagen: { preview: '', data: '' },
    estado: ""
}


class Administrador extends React.Component {
    constructor(props) {
        super(props);
        this.state = estadoInicial;
    }

    cambiarTipo = (e) => {
        alert(e.target.value);
        this.setState({ tipo: e.target.value });
        //setTipo(e.target.value);
    }

    regresar() {
        this.setState(estadoInicial);
    }

    formulario(nombre, apellido, telefono, direccion, correo, nacimiento, dpi, contrasenia, modo) {
        return (
            <div class='row' >
                <div class='column' style={{ width: '50%' }}>
                    <label>Nombre: </label><br />
                    <input style={{ marginBottom: "2%" }} value={nombre} readOnly={modo}
                        onChange={(e) => this.setState({ nombre: e.target.value })}
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

                    <label>Dirección: </label><br />
                    <input style={{ marginBottom: "2%" }} value={direccion} readOnly={modo}
                        onChange={(e) => this.setState({ direccion: e.target.value })}
                        type="text" />
                    <br /><br />

                    <label>Fecha de Nacimiento: </label><br />
                    <input style={{ marginBottom: "2%" }} value={nacimiento} readOnly={modo}
                        onChange={(e) => this.setState({ nacimiento: e.target.value })}
                        type="date" />
                    <br />
                </div>
            </div>
        );
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
        var dpi = this.state.dpi;
        var contrasenia = this.state.contrasenia;

        var imagen = this.state.imagen;
        var estado = this.state.estado;

        const handleSubmit = async (e) => {
            /*
            e.preventDefault()
            let formData = new FormData()
            formData.append('file', image.data);
            formData.append('nombre', 'william');
            const response = await fetch('http://localhost:5000/image', {
              method: 'POST',
              body: formData,
            })
            if (response) setStatus(response.statusText)
            */
            //setEntregado(true);
        }

        const handleFileChange = (e) => {
            const img = {
                preview: URL.createObjectURL(e.target.files[0]),
                data: e.target.files[0],
            }
            this.setState({ imagen: img })
        }

        if (this.state.opcion === 1) {
            return (
                <>
                    <Container>
                        <div class="d-flex justify-content-center align-items-center container-publicacion">
                            <Card style={{ width: '100%', height: '80%' }}>
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

                                    {this.formulario(nombre, apellido, telefono, direccion, correo, nacimiento, dpi, contrasenia, false)}
                                    <br />
                                    <p >Fotografía (Opcional)</p>
                                    <form onSubmit={handleSubmit}>
                                        <input type='file' name='file' onChange={handleFileChange}></input>

                                    </form>

                                </Card.Body>
                                <Card.Footer style={{ textAlign: 'right' }}>
                                    <Button type='submit' style={{ float: 'right' }}>Crear Usuario</Button>
                                </Card.Footer>
                            </Card>
                        </div>
                    </Container>
                </>
            );
        } else if (this.state.opcion === 2) {
            return (
                <>
                    <Container>
                        <div class="d-flex justify-content-center align-items-center container-publicacion">
                            <Card style={{ width: '100%', height: '80%' }}>
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
                                    <select style={{ marginLeft: '2%' }} onChange={(e) => this.cambiarTipo(e)} >
                                        <option key={'Maestro'} value={'Maestro'}>Maestro</option>
                                        <option key={'Alumno'} value={'Alumno'}>Alumno</option>
                                    </select>
                                    <br /><br />
                                    {this.formulario(nombre, apellido, telefono, direccion, correo, nacimiento, dpi, contrasenia, true)}

                                </Card.Body>
                                <Card.Footer style={{ textAlign: 'right' }}>
                                    <Button variant='danger' style={{ float: 'right' }}>Eliminar Usuario</Button>
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
                            <Card style={{ width: '100%', height: '80%' }}>
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

                                    <br /><br /><br />
                                    <form onSubmit={handleSubmit}>
                                        <input type='file' name='file' onChange={handleFileChange}></input>

                                    </form>

                                </Card.Body>
                                <Card.Footer style={{ textAlign: 'right' }}>
                                    <Button type='submit' style={{ float: 'right' }}>Cargar Información</Button>
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
                            <Card style={{ width: '100%', height: '80%' }}>
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
                                    <select style={{ marginLeft: '2%' }} onChange={(e) => this.cambiarTipo(e)} >
                                        <option key={'Maestro'} value={'Maestro'}>Maestro</option>
                                        <option key={'Alumno'} value={'Alumno'}>Alumno</option>
                                    </select>
                                    <br /><br />
                                    {this.formulario(nombre, apellido, telefono, direccion, correo, nacimiento, dpi, contrasenia, false)}

                                </Card.Body>
                                <Card.Footer style={{ textAlign: 'right' }}>
                                    <Button style={{ float: 'right' }}>Guardar Cambios</Button>
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
                            <Card style={{ width: '100%', height: '80%' }}>
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
                                    <br /><br />

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
                        <Button variant='success' style={{ marginBottom: "8%" }}
                            onClick={() => this.setState({ opcion: 1 })}>
                            Crear Usuario
                        </Button><br />
                        <Button style={{ marginBottom: "8%" }}
                            onClick={() => this.setState({ opcion: 2 })}>
                            Eliminar Usuario
                        </Button><br />
                        <Button variant='success' style={{ marginBottom: "8%" }}
                            onClick={() => this.setState({ opcion: 3 })}>
                            Cargar CSV
                        </Button><br />
                        <Button style={{ marginBottom: "8%" }}
                            onClick={() => this.setState({ opcion: 4 })}>
                            Editar Usuario
                        </Button><br />
                        <Button variant='success' style={{ marginBottom: "8%" }}
                            onClick={() => this.setState({ opcion: 5 })}>
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
                <div style={{position:'absolute', marginLeft: '2%', marginTop:'2%'}}>
                    <Link to="/" style={{  }}>
                        <FontAwesomeIcon icon={faArrowLeft} color='white' size='2x' />
                    </Link>
                </div>
                {this.renderizarOpcion()}
            </>
        );
    }
}

export default Administrador;