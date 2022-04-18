import React, { useState, useEffect } from 'react'
import { Link, Redirect } from 'react-router-dom';
import { Button } from "react-bootstrap";
import Container from './FondoMaestro';


function AplicanteLogin() {
  const [dpi, setDPI] = useState("")
  const [departamento, setDep] = useState("")
  const [puesto, setPuesto] = useState("")
  const [password, setPassword] = useState("");
  const [primer, setPrimer] = useState(1);
  const [redirect, setRedirect] = useState(false);

  const renderRedirect = () => {
    if (redirect) {
      return <Redirect to={'/maestros/publicacion'} />
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

  return (
    <>
      <Container>
        <br /><br />
        <br /><br />
        <br /><br />
        <form style={{ textAlign: "center", alignItems: "center" }}>
          <h1 >Iniciar Sesión como Maestro</h1>
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
          {renderRedirect()}
          <Button variant='info' onClick={IniciarSesion}>Iniciar Sesión</Button><br /><br />
        </form>
        <br /><br />
        <br /><br />
        <br /><br />
      </Container >
    </>
  );
}

export default AplicanteLogin;