import React, { useState, useEffect } from 'react'
import { useParams, Redirect } from 'react-router-dom';
import { Button } from "react-bootstrap";
import Table from 'react-bootstrap/Table';
import Card from 'react-bootstrap/Card';


import NavBar from './MaestrosNavBar';
import Container from './FondoMaestros';
import './maestro.css';

var respuestaas = [
  {
    'id': 1,
    'valor': '2',
    'checked': true
  },
  {
    'id': 2,
    'valor': '2',
    'checked': false
  }
]

const checkList = ["Apple", "Banana", "Tea", "Coffee"];

function MaestrosEntregarActividad() {
  const [maestro, setMaestro] = useState(useParams().identificacion)
  const [examen, setActividad] = useState(useParams().examen);
  const [pregunta, setPregunta] = useState(1);
  const [redirect, setRedirect] = useState(false);
  const [respuestas, setRespuestas] = useState(respuestaas);

  const [checked, setChecked] = useState([]);


  //
  const [image, setImage] = useState({ preview: '', data: '' })
  const [status, setStatus] = useState('')
  const siguiente = async () => {
    // jalar las respuestas para la pregunta
    setPregunta(pregunta + 1);
  }

  const anterior = async () => {
    // jalar las respuestas para la pregunta
    setPregunta(pregunta - 1);
  }


  useEffect(() => {
    // obtener los datos del estudiante
    // obtener datos de actividad para el estudiante
  }, [])

  const renderRedirect = () => {

    if (redirect) {
      return <Redirect to={'/maestros/examenes/' + maestro} />
    }
  }

  const probar = () => {

    alert(checked);
    console.log(checked);
  }

  const handleCheck = (event) => {
    var updatedList = [...checked];
    if (event.target.checked) {
      updatedList = [...checked, event.target.value];
    } else {
      updatedList.splice(checked.indexOf(event.target.value), 1);
    }
    setChecked(updatedList);
  };


  var isChecked = (item) =>
    checked.includes(item) ? "checked-item" : "not-checked-item";

  // Generate string of checked items
  const checkedItems = checked.length
    ? checked.reduce((total, item) => {
      return total + ", " + item;
    })
    : "";

  const Checkbox = ({ label, value, onChange }) => {
    return (
      <label>
        <input type="checkbox" checked={value} onChange={onChange} />
        {label}
      </label>
    );
  };

  return (
    <>
      <Container>
        <NavBar estudiante={maestro} />
        <div class="d-flex justify-content-center align-items-center container-publicacion">
          <Card style={{ width: '100%', height: '80%' }}>
            <Card.Header as="h5" >
              {renderRedirect()}
              <button className='boton-regreso-publicacion'
                onClick={() => setRedirect(true)}> {"<"} </button>
              Pregunta {pregunta}
            </Card.Header>
            <Card.Body style={{ overflowY: 'auto' }}>
              <Card.Text>
                hacer la tarea
              </Card.Text>
              {checkList.map((item, index) => (
                <div key={index}>
                  <input value={item} type="checkbox" onChange={handleCheck} />
                  <span style={{marginLeft:'2%'}}>{item}</span>
                </div>
              ))}

              <div>
                {`Items checked are: ${checkedItems}`}
              </div>

            </Card.Body>

            <Card.Footer>
              {pregunta === 1 ?
                <>
                  <Button onClick={() => siguiente()} style={{ float: 'right' }}> Siguiente</Button>
                </>
                :
                <>
                  <Button onClick={() => anterior()} style={{ marginLeft: '70%', marginRight: '2%' }}>Anterior</Button>
                  <Button onClick={() => siguiente()} style={{ float: 'right' }}>Siguiente</Button>
                </>
              }
            </Card.Footer>
          </Card>
        </div>
      </Container>
    </>
  );
}

export default MaestrosEntregarActividad;