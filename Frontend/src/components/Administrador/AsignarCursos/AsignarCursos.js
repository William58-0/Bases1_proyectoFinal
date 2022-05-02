import React from 'react'
import { Link } from 'react-router-dom';
import { Button } from "react-bootstrap";
import { Container, Form } from '../AdminContainer'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'

function AsignarCursos() {

    return (
        <>
            <div style={{ position: 'absolute', marginLeft: '2%', marginTop: '2%' }}>
                <Link to="/admin" style={{}}>
                    <FontAwesomeIcon icon={faArrowLeft} color='white' size='2x' />
                </Link>
            </div>
            <Container>
                <h1>Asignar Cursos</h1>
                <Form>
                    <Link to="/admin/asignarcursos/maestros">
                        <Button style={{ marginBottom: "8%" }} variant='success'>
                            Asignar Maestros
                        </Button>
                    </Link><br />

                    <Link to="/admin/asignarcursos/alumnos">
                        <Button style={{ marginBottom: "8%" }}>
                            Asignar Alumnos
                        </Button>
                    </Link><br />
                </Form>
            </Container>
        </>
    );
}

export default AsignarCursos;