import React, { useState } from 'react'
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
`;


function Home() {
    const [identificacion, setId] = useState("")
    const [password, setPass] = useState("");
    const [tipo, setTipo] = useState("Maestro");
    const [redirect, setRedirect] = useState(false);

    const handleChange = (e) => {
        alert(e.target.value);
        setTipo(e.target.value);
        //setTipo(e.target.value);
    }

    const renderRedirect = () => {

        if (redirect) {
            if (tipo == "Maestro") {
                return <Redirect to={'/maestros/publicaciones/' + identificacion} />
            } else if (tipo == "Alumno") {
                return <Redirect to={'/alumnos/publicaciones/' + identificacion} />
            } else {
                return <Redirect to={'/admin'} />
            }

        }
    }

    const iniciarSesion = () => {
        if (identificacion === "" || password === "") {
            alert("Ingrese las credenciales");
            return;
        }
        alert("iniciando sesion");
        setRedirect(true);
        //setTipo(e.target.value);
    }

    return (
            <div style={{ backgroundColor: 'rgb(45, 88, 138)'}}>
                <br /><br /><br /><br /><br /><br /><br />
                <Container>
                    <h1>Iniciar Sesión</h1>
                    <Form>
                        <label>{tipo === "Alumno" ? 'Carnet' : 'Registro'} </label><br />
                        <input style={{ marginBottom: "2%" }} value={identificacion}
                            onChange={(e) => setId(e.target.value)}
                            type="text" />
                        <br />

                        <label>Contraseña: </label><br />
                        <input style={{ marginBottom: "2%" }} value={password}
                            onChange={(e) => setPass(e.target.value)}
                            type="password" />
                        <br />

                        <label>Tipo: </label><br />
                        <select onChange={(e) => handleChange(e)} >
                            <option key={'Maestro'} value={'Maestro'}>Maestro</option>
                            <option key={'Alumno'} value={'Alumno'}>Alumno</option>
                            <option key={'Administrador'} value={'Administrador'}>Administrador</option>
                        </select>
                    </Form>
                </Container>
                <br /><br />
                <div style={{ textAlign: 'center', height: '54px' }}>
                    {renderRedirect()}
                    <Button class="btn btn-primary" onClick={iniciarSesion}>
                        Ingresar
                    </Button>
                </div>
                <br /><br /><br /><br /><br /><br /><br />
            </div>
    );

}

export default Home;