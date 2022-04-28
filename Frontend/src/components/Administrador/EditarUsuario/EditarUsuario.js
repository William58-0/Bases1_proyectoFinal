import React from 'react'
import { Link } from 'react-router-dom';
import { Button, Card } from "react-bootstrap";
import { Container, Form } from '../AdminContainer'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'


function EditarUsuario() {

    return (
        <>
            <div style={{ position: 'absolute', marginLeft: '2%', marginTop: '2%' }}>
                <Link to="/admin" style={{}}>
                    <FontAwesomeIcon icon={faArrowLeft} color='white' size='2x' />
                </Link>
            </div>
            <Container>

                <h1>Editar Usuarios</h1>
                <Form>
                    <Link to="/admin/editarusuario/maestros">
                        <Button style={{ marginBottom: "8%" }} variant='success'>
                            Editar Maestros
                        </Button>
                    </Link><br />

                    <Link to="/admin/editarusuario/alumnos">
                        <Button style={{ marginBottom: "8%" }}>
                            Editar Alumnos
                        </Button>
                    </Link><br />
                </Form>
            </Container>
        </>
    );
}

export default EditarUsuario;