import React from 'react'
import { Link } from 'react-router-dom';
import { Button, Card } from "react-bootstrap";
import { Container, Form } from '../AdminContainer'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'

function EliminarUsuario() {
    return (
        <>
            <div style={{ position: 'absolute', marginLeft: '2%', marginTop: '2%' }}>
                <Link to="/admin" style={{}}>
                    <FontAwesomeIcon icon={faArrowLeft} color='white' size='2x' />
                </Link>
            </div>
            <Container>
                <h1 >Eliminar Usuarios</h1>
                <Form>
                    <Link to="/admin/eliminarusuario/maestros">
                        <Button style={{ marginBottom: "8%" }} variant='success'>
                            Eliminar Maestros
                        </Button>
                    </Link><br />

                    <Link to="/admin/eliminarusuario/alumnos">
                        <Button style={{ marginBottom: "8%" }}>
                        Eliminar Alumnos
                        </Button>
                    </Link><br />
                </Form>
            </Container>
        </>
    );
}

export default EliminarUsuario;