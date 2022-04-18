import React from 'react';
import jsPDF from "jspdf";
import "jspdf-autotable";

import Container from './FondoAlumnos';

class App extends React.Component {

  constructor() {
    super();
    this.state = {
      people: [
        { name: "Keanu Reeves", profession: "Actor" },
        { name: "Lionel Messi", profession: "Football Player" },
        { name: "Cristiano Ronaldo", profession: "Football Player" },
        { name: "Jack Nicklaus", profession: "Golf Player" },
      ],

      indiceR: 0,
    }
  }

  exportPDF = () => {
    const unit = "pt";
    const size = "A4"; // Use A1, A2, A3 or A4
    const orientation = "portrait"; // portrait or landscape

    const marginLeft = 40;
    const doc = new jsPDF(orientation, unit, size);

    doc.setFontSize(15);

    const title = "My Awesome Report";
    const headers = [["NAME", "PROFESSION"]];

    const data = this.state.people.map(elt => [elt.name, elt.profession]);

    let content = {
      startY: 50,
      head: headers,
      body: data
    };

    doc.text(title, marginLeft, 40);
    doc.autoTable(content);
    doc.save("report.pdf")
  }

  render() {
    var indiceR = this.state.indiceR;
    return (
      <Container >
        <table responsive variant="light" style={{ margin: '0 auto', width: '90%' }}>
          <thead>
            <tr>
              <th>Asunto</th>
              <th>Fecha</th>
            </tr>
          </thead>
          <tbody>
            {
              this.state.people.slice(indiceR, indiceR + 10).map((log) =>
                <>
                  <tr key={log.id}>
                    <td>
                      {log['name']}
                    </td>
                    <td>
                      {log['profession']}
                    </td>
                  </tr>
                </>
              )}
          </tbody>
        </table>

        <button onClick={() => this.exportPDF()}>Generate Report</button>
      </Container>
    );
  }
}

export default App;