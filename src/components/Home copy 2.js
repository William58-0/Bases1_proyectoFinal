import React from 'react';
import styled from 'styled-components';
import { Link, Redirect } from 'react-router-dom';
import { Button } from "react-bootstrap";


const Form = styled.form`
    margin: auto;  
    margin-right: 8%;
    margin-left: 8%; 
    width: auto;
    padding: 2%; 
`;

const Container = styled.div`
width: 100%;
box-sizing: border-box;
background-size: cover;
display: flex;
justify-content: center;
align-items: center;
color: white;
overflow-y: hidden;
`;


class Home extends React.Component {
    constructor() {
        super();
        this.state = {
            identificacion: "",
            password: "",
            tipo: "Maestro",
            redirect: false
        }
    }

    handleChange = (e) => {
        alert(e.target.value);
        this.setState({
            tipo: e.target.value,
        })
        //setTipo(e.target.value);
    }

    renderRedirect = () => {

        if (this.state.redirect) {
            if (this.state.tipo == "Maestro") {
                return <Redirect to={'/maestros/publicacion/' + this.state.identificacion} />
            } else if (this.state.tipo == "Alumno") {
                return <Redirect to={'/alumnos/publicacion/' + this.state.identificacion} />
            } else {
                if (this.state.identificacion == 'admin' && this.state.password == 'admin') {
                    return <Redirect to={'/administrador'} />
                }else{
                    alert("Credenciales Incorrectas")
                }
            }

        }
    }

    iniciarSesion = () => {
        alert("iniciando sesion");
        this.setState({
            redirect: true,
        })
        //setTipo(e.target.value);
    }

    render() {
        var identificacion = this.state.identificacion;
        var password = this.state.password;
        var tipo = this.state.tipo;

        return (
            <>
                <div style={{ backgroundColor: 'rgb(45, 88, 138)' }}>
                    <br /><br /><br /><br /><br /><br /><br />
                    <Container>
                        <h1>Iniciar Sesión</h1>
                        <Form>
                            <label>{tipo === "Estudiante" ? 'Carnet' : 'Registro'} </label><br />
                            <input style={{ marginBottom: "2%" }} value={identificacion}
                                type="text" />
                            <br />

                            <label>Contraseña: </label><br />
                            <input style={{ marginBottom: "2%" }} value={password}
                                type="password" />
                            <br />

                            <label>Tipo: </label><br />
                            <select onChange={(e) => this.handleChange(e)} >
                                <option key={'Maestro'} value={'Maestro'}>Maestro</option>
                                <option key={'Alumno'} value={'Alumno'}>Alumno</option>
                                <option key={'Administrador'} value={'Administrador'}>Administrador</option>
                            </select>
                        </Form>
                    </Container>
                    <br /><br />
                    <div style={{ textAlign: 'center' }}>
                        {this.renderRedirect()}
                        <Button class="btn btn-primary" onClick={() => this.iniciarSesion()}>
                            Ingresar
                        </Button>
                    </div>
                    <br /><br /><br /><br /><br /><br /><br /><br />
                </div>


            </>
        );
    }
}

export default Home;