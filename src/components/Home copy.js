import React, { useState, useEffect } from 'react'
import { Link, Redirect } from 'react-router-dom';
import { Button } from "react-bootstrap";

function AplicanteLogin() {
    const [dpi, setDPI] = useState("")
    const [departamento, setDep] = useState("")
    const [puesto, setPuesto] = useState("")
    const [password, setPassword] = useState("");
    const [tipo, setTipo] = useState("Maestro");
    const [redirect, setRedirect] = useState(false);

    const renderRedirect = () => {
        if (redirect) {
            return <Redirect to={'/alumnos/publicacion'} />
            /*
              if (primer == 1) {
                return <Redirect to={'/aplicante/verificacion/' + dpi + "/" + departamento + "/" + puesto} />
              } else {
                return <Redirect to={'/aplicante/revision/' + dpi + "/" + departamento + "/" + puesto} />
              }
              */
        }
    }

    const IniciarSesion = () => {
        alert("iniciando sesion");
        setRedirect(true);
    }

    const handleChange = (e) => {
        setTipo(e.target.value);
    }



    return (
        <div style={{ color: 'white', backgroundColor: 'rgb(45, 88, 138)', height: 657 }}>
            <br /><br />
            <br /><br />
            <br /><br />
            <form style={{ textAlign: "center", alignItems: "center", color: 'white', width: '20%', margin: '0 auto' }}>
                <h1>Iniciar Sesión</h1>
                <br /><br />
                <label>
                    DPI/CUI: <input style={{ marginLeft: "2%", marginBottom: "2%" }}
                        type="text" value={dpi} onChange={(e) => setDPI(e.target.value)} />
                </label><br />
                <label>
                    Contraseña: <input style={{ marginLeft: "2%", marginBottom: "2%" }}
                        type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </label><br />
                <br />
                <div style={{marginLeft:'auto', marginRight:'15%', textAlign: 'right'}}>
                    tipo
                    <select onChange={(e) => handleChange(e)} style={{ marginLeft: '3%' }}>
                        <option key={'Maestro'} value={'Maestro'}>Maestro</option>

                    </select>
                </div>
                <br />

                {renderRedirect()}
                <Button variant='primary' onClick={IniciarSesion}>Iniciar Sesión</Button><br /><br />
            </form>
            <br /><br />
            <br /><br />
            <br /><br />
        </div>
    );
}

export default AplicanteLogin;