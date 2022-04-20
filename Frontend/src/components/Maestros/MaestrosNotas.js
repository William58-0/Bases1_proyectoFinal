import React, { useState } from 'react';
import jsPDF from "jspdf";
import { Link, Redirect, useParams } from 'react-router-dom';
import "jspdf-autotable";
import { Button, Table } from "react-bootstrap";


import NavBar from './MaestrosNavBar';
import Container from './FondoMaestros';
import './maestro.css';

function MaestrosNotas() {
  const [people, setPeople] = useState([
    { actividad: "Parcial 1", nota: "9" },
    { actividad: "Tarea 1", nota: "2" },
    { actividad: "Tarea 2", nota: "3" },
    { actividad: "Parcial 2", nota: "10" },
    { actividad: "Parcial 2", nota: "10" },
    { actividad: "Parcial 2", nota: "10" },
    { actividad: "Parcial 2", nota: "10" },
    { actividad: "Parcial 2", nota: "10" },
    { actividad: "Parcial 2", nota: "10" },
    { actividad: "Parcial 2", nota: "10" },
    { actividad: "Parcial 2", nota: "10" },
    { actividad: "Parcial 2", nota: "10" },
    { actividad: "Parcial 2", nota: "10" },
    { actividad: "Parcial 2", nota: "10" },
  ]);
  const [maestro, setMaestro] = useState(useParams().identificacion);
  const [indice, setIndice] = useState(0);

  const exportPDF = () => {
    const unit = "pt";
    const size = "A4"; // Use A1, A2, A3 or A4
    const orientation = "portrait"; // portrait or landscape

    const marginLeft = 40;
    const doc = new jsPDF(orientation, unit, size);

    doc.setFontSize(15);

    const title = "Reporte de Notas - Curso";
    const headers = [["Actividad", "Nota"]];

    const data = people.map(elt => [elt.actividad, elt.nota]);

    let content = {
      startY: 50,
      head: headers,
      body: data
    };

    doc.text(title, marginLeft, 40);
    doc.autoTable(content);
    doc.save("report.pdf")
  }

  const handleRowClick = (row) => {
    // borrar esta funcion luego

  }

  const handleChange = (e) => {
    alert(e.target.value);
    //setTipo(e.target.value);
    //setTipo(e.target.value);
  }


  return (
    <Container >
      <NavBar maestro={maestro} />
      <br />
      <div className='principal'>
        <h1 style={{ textAlign: 'center' }}>Control de Notas</h1>
        <div className="d-flex  justify-content-start align-items-center" style={{ marginLeft: '2%' }}>
          Materia:
          <select onChange={(e) => handleChange(e)} style={{ marginLeft: '2%' }}>
            <option key={'Maestro'} value={'Maestro'}>Matemáticas</option>
            <option key={'Maestro'} value={'Maestro'}>Maestro</option>
            <option key={'Administrador'} value={'Administrador'}>Administrador</option>
          </select>

          <div style={{ marginLeft: 'auto', marginRight: '1.5%' }}>
            <Button variant='success' onClick={() => exportPDF()}>Descargar PDF</Button>
          </div>
          
        </div>
        <br />
        <div class='container-tabla-notas'>
          <Table striped bordered hover variant='light' >
            <thead>
              <tr>
                <th>Actividad</th>
                <th>Nota</th>
              </tr>
            </thead>
            <tbody >
              {
                people.map((log) =>
                  <>
                    <tr key={log.id}>
                      <td>
                        {log['actividad']}
                      </td>
                      <td>
                        {log['nota']}
                      </td>
                    </tr>
                  </>
                )}

            </tbody>
          </Table>
        </div>
        <br />
        <label class='bg-primary' style={{
          fontWeight: 'bold', fontSize: 'large',
          float: 'right', marginRight: '2%', 
          width:' 15%', textAlign:'center',
          borderRadius: '5px'
        }}>
          Total: 100
        </label>

        <br />

      </div>

    </Container>
  );

}

export default MaestrosNotas;