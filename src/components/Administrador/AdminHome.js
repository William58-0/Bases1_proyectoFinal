import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import fondo from '../../images/admin.jpg';

const Form = styled.form`
    margin: auto;  
    margin-right: 8%;
    margin-left: 8%; 
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

class Home extends React.Component {
    render() {
        return (
            <Container>
                <h1>Administrador</h1>
                <Form>
                    <Link to="/admin/maestros">
                        <button style={{ marginBottom: "4%" }} class="btn btn-primary">
                            Administrar Maestros
                        </button>
                    </Link><br />
                    <Link to="/admin/alumnos">
                        <button style={{ marginBottom: "4%" }} class="btn btn-success">
                            Administrar Alumnos
                        </button>
                    </Link><br />
                    <Link to="/alumnos/login">
                        <button style={{ marginBottom: "4%" }} class="btn btn-primary">
                            Alumnos
                        </button>
                    </Link><br />
                </Form>
            </Container>
        );
    }
}

export default Home;