import React, { useState, useEffect } from 'react'

import { Redirect } from 'react-router-dom';
import { Button, Card } from "react-bootstrap";
import { Container } from './AdminContainer'

function CargaMasiva() {
    const [tipo, setTipo] = useState("Maestro");

    const [imagen, setImagen] = useState({ preview: '', data: '' });

    const [redirect, setRedirect] = useState(false);

    const renderRedirect = () => {
        if (redirect) {
            return <Redirect to='/admin' />
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
        <>
            <Container>
                <div class="d-flex justify-content-center align-items-center container-publicacion">
                    <Card style={{ width: '90%', height: '50%' }}>
                        <Card.Header as="h5" >
                            {renderRedirect()}
                            <button className='boton-regreso-publicacion'
                                onClick={() => setRedirect(true)}> {"<"} </button>
                            <label className='label-publicacion'>Cargar CSV </label>
                        </Card.Header>
                        <Card.Body style={{ overflowY: 'auto' }}>
                            Tipo de CSV:  <select style={{ marginLeft: '2%' }} onChange={(e) => cambiarTipo(e)} >
                                <option key={'Maestro'} value={'Maestro'}>Maestro</option>
                                <option key={'Alumno'} value={'Alumno'}>Alumno</option>
                            </select>
                            <br /><br /><br /><br /><br />
                            <form>
                                <input type='file' name='file' onChange={handleFileChange}></input>
                            </form>
                        </Card.Body>
                        <Card.Footer style={{ textAlign: 'right' }}>
                            <Button onClick={() => CargaMasiva()} style={{ float: 'right' }}>Cargar Información</Button>
                        </Card.Footer>
                    </Card>
                </div>
            </Container>
        </>
    );
}

export default CargaMasiva;