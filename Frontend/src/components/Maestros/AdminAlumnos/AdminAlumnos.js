import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import { Redirect, Link, useParams } from 'react-router-dom';
import { Button } from "react-bootstrap";

import fondo from '../../../images/maestro.jpg';
import NavBar from '../MaestrosNavBar';

import {
    getMaestro
} from '../../../endpoints/endpoints';

const Form = styled.form`
    margin: auto;  
    margin-right: 5%;
    margin-left: 5%; 
    width: auto;
    padding: 2%; 
`;

const Container = styled.div`
width: 100%;
height: 607px;
box-sizing: border-box;
background: linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(${fondo}), no-repeat center top;
background-size: cover;
display: flex;
justify-content: center;
align-items: center;
color: white;
overflow-y: hidden;
`;

function CargaMasiva() {
    const [id_maestro, setMaestro] = useState(useParams().identificacion);
    const [nombre_maestro, setNombreMaestro] = useState("");

    const [tipo, setTipo] = useState("Alumno");
    const [imagen, setImagen] = useState({ preview: '', data: '' });
    const [redirect, setRedirect] = useState(false);

    useEffect(() => {
        // obtener los datos del maestro
        getMaestro(id_maestro).then((response) => {
            if (response.data.length > 0) {
                setNombreMaestro(response.data[0].nombre + " " + response.data[0].apellido)
            }
        });
    }, [])

    const renderRedirect = () => {
        if (redirect) {
            return <Redirect to='/maestros/adminalumnos' />
        }
    }


    const cambiarTipo = (e) => {
        setTipo(e.target.value);
    }

    const handleFileChange = (e) => {
        const img = {
            preview: URL.createObjectURL(e.target.files[0]),
            data: e.target.files[0],
        }
        setImagen(img);
    }

    // -------------------------------------------------------------------------- Carga Masiva
    CargaMasiva = async () => {
        if (imagen.data !== "") {
            let formData = new FormData()
            formData.append('file', imagen.data);
            formData.append('tipo', tipo);
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

    return (
        <div style={{overflow:'hidden',  height:'90%'}}>
            <NavBar maestro={nombre_maestro} id_maestro={id_maestro} />
            <Container>
                <h1 style={{ width: '20%' }}>{'Administración de Alumnos'}</h1>
                <Form>
                    <Link to={"/maestros/adminalumnos/crearalumno/"+id_maestro}>
                        <Button variant='success' style={{ marginBottom: "8%" }}>
                            Crear Alumno
                        </Button>
                    </Link><br />

                    <Link to={"/maestros/adminalumnos/eliminaralumno/"+id_maestro}>
                        <Button style={{ marginBottom: "8%" }}>
                            Eliminar Alumno
                        </Button>
                    </Link><br />

                    <Link to={"/maestros/adminalumnos/cargamasiva/"+id_maestro}>
                        <Button variant='success' style={{ marginBottom: "8%" }}>
                            Cargar CSV
                        </Button>
                    </Link><br />

                    <Link to={"/maestros/adminalumnos/editaralumno/"+id_maestro}>
                        <Button style={{ marginBottom: "8%" }}>
                            Editar Alumno
                        </Button>
                    </Link><br />

                    <Link to={"/maestros/adminalumnos/notas/"+id_maestro}>
                        <Button variant='success' style={{ marginBottom: "8%" }}>
                            Ver Notas
                        </Button>
                    </Link>
                </Form>
            </Container>
        </div>
    );
}

export default CargaMasiva;